// Styles (traites par Vite + Tailwind)
import './simulateur-styles.css';

// Lucide Icons (auto-hebergees via npm)
import { createIcons, ArrowLeft, Info } from 'lucide';

// Config agence (module ES)
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config.js';

// Moteur de calcul (fonctions pures)
import {
    calculateHoursMonthly,
    calculateBrutMensuel,
    calculateNetBase,
    calculateGainKms,
    calculateCostTickets,
    calculateNetMensuel,
    calculateNetHoraire,
    calculatePrimeCarburant,
    calculateHeuresComp,
    calculateTotalMoyen,
    calculateCoutEmployeur
} from './calculator.js';

// Initialiser les icones Lucide
createIcons();

// CONSTANTES
// Valeurs depuis config.js (GRILLE_SALARIALE) avec fallback
const G = GRILLE_SALARIALE || {};
const SMIC_HORAIRE = G.smicHoraire || 12.02;
const KM_RATE = G.kmRate || 0.45;
const TICKET_VALUE = G.ticketValue || 6.00;
const TICKET_EMPLOYEE_SHARE = G.ticketEmployeeShare || 3.00;
const PRIME_CARBURANT_MAX = G.primeCarburantMax || 300;
const CHEQUES_CADEAUX = G.chequesCadeaux || 50;
const CHEQUES_VACANCES = G.chequesVacancesEmployeur || 80;

// ELEMENTS
const inputs = {
    rate: document.getElementById('input-rate'),
    hours: document.getElementById('input-hours'),
    kms: document.getElementById('input-kms'),
    tickets: document.getElementById('input-tickets'),
    mutuelleCheck: document.getElementById('check-mutuelle'),
    mutuelleCost: document.getElementById('input-mutuelle-cost')
};

const outputs = {
    // Elements optionnels (geres en securite si manquants)
    netMensuel: document.getElementById('res-net-mensuel'),
    netHoraire: document.getElementById('res-net-horaire'),
    primeCarburant: document.getElementById('res-prime-carburant'),
    heuresComp: document.getElementById('res-heures-comp'),

    // Elements requis
    smicMensuel: document.getElementById('res-smic-mensuel'),
    smicHoraire: document.getElementById('res-smic-horaire'),
    totalMoyen: document.getElementById('res-total-moyen'),
    totalHoraire: document.getElementById('res-total-horaire'),
    coutEmployeur: document.getElementById('res-cout-employeur')
};

// Chargement de la config agence
function loadAgencyConfig() {
    // Recuperer l'agence depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const agencyId = params.get('agence') || 'nord-touraine';

    // Lien retour dynamique avec parametre agence
    const linkRetour = document.getElementById('link-retour');
    if(linkRetour) linkRetour.href = 'index.html?agence=' + agencyId;

    if(!AGENCY_CONFIGS) return;
    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];

    if(config && config.remuneration && config.remuneration.mutuellePrice) {
         // Convertir "16,88 \u20ac" -> 16.88
         const priceStr = config.remuneration.mutuellePrice.replace(',','.');
         const price = parseFloat(priceStr);

         const inputMutuelle = document.getElementById('input-mutuelle-cost');
         if(inputMutuelle && !isNaN(price)) {
             inputMutuelle.value = price.toFixed(2);
             // Desactiver l'input
             inputMutuelle.disabled = true;
             // Feedback visuel pour l'etat desactive
             inputMutuelle.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-100', 'dark:bg-slate-700');
             inputMutuelle.classList.remove('bg-slate-50', 'dark:bg-slate-900');
         }
    }
}

// MOTEUR DE CALCUL
function calculate() {
    // Lecture dynamique des valeurs
    const rate = parseFloat(inputs.rate.value) || 0;
    const hoursWeekly = parseFloat(inputs.hours.value) || 0;
    const kms = parseFloat(inputs.kms.value) || 0;
    const tickets = parseFloat(inputs.tickets.value) || 0;
    const mutuelleCost = inputs.mutuelleCheck.checked ? (parseFloat(inputs.mutuelleCost.value) || 0) : 0;

    // Calculs de base (fonctions pures importees de calculator.js)
    const hoursMonthly = calculateHoursMonthly(hoursWeekly);
    const salaireBrut = calculateBrutMensuel(rate, hoursWeekly);

    // 1. Calcul du Net de Base
    const netBase = calculateNetBase(salaireBrut, mutuelleCost);

    // 2. Calcul du SMIC de Reference (Mensuel) pour ces heures
    const smicBrut = calculateBrutMensuel(SMIC_HORAIRE, hoursWeekly);
    const smicNetBase = calculateNetBase(smicBrut, mutuelleCost);

    // Calculs Annexes
    const gainKms = calculateGainKms(kms, KM_RATE);
    const costTickets = calculateCostTickets(tickets, TICKET_EMPLOYEE_SHARE);

    // 3. Net Mensuel a Payer
    const netMensuel = calculateNetMensuel(netBase, gainKms, costTickets, mutuelleCost);

    // 4. SMIC Net a Payer (Comparatif equivalent avec meme mutuelle deduite)
    const smicMensuelFinal = smicNetBase - mutuelleCost;

    // Affichage Resultats (avec verification si l'element existe)
    const realNetHoraire = calculateNetHoraire(netMensuel, hoursMonthly);
    const smicHoraireFinal = calculateNetHoraire(smicMensuelFinal, hoursMonthly);

    if(outputs.netMensuel) outputs.netMensuel.textContent = formatCurrency(netMensuel);
    if(outputs.netHoraire) outputs.netHoraire.textContent = formatCurrency(realNetHoraire);

    if(outputs.smicMensuel) outputs.smicMensuel.textContent = formatCurrency(smicMensuelFinal);
    if(outputs.smicHoraire) outputs.smicHoraire.textContent = formatCurrency(smicHoraireFinal);

    // Prime Carburant
    const primeCarburantAnnuelle = calculatePrimeCarburant(hoursWeekly, PRIME_CARBURANT_MAX);
    if(outputs.primeCarburant) outputs.primeCarburant.textContent = formatCurrency(primeCarburantAnnuelle);

    // Calcul Heures Complementaires
    const heuresComp = calculateHeuresComp(hoursWeekly);
    if(outputs.heuresComp) outputs.heuresComp.textContent = formatCurrency(heuresComp);

    // 5. Total Moyen (Avec Primes Annuelles)
    const totalMoyen = calculateTotalMoyen(netMensuel, CHEQUES_CADEAUX, CHEQUES_VACANCES, heuresComp, primeCarburantAnnuelle);
    const totalHoraire = calculateNetHoraire(totalMoyen, hoursMonthly);

    if(outputs.totalMoyen) outputs.totalMoyen.textContent = formatCurrency(totalMoyen);
    if(outputs.totalHoraire) outputs.totalHoraire.textContent = formatCurrency(totalHoraire);

    // 6. Cout Global Employeur (Estimation)
    const coutGlobal = calculateCoutEmployeur(salaireBrut, gainKms, tickets, mutuelleCost);

    if(outputs.coutEmployeur) outputs.coutEmployeur.textContent = formatCurrency(coutGlobal);
}

function formatCurrency(val) {
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// LISTENERS
Object.values(inputs).forEach(input => {
    if(input) {
        if(input.type === 'checkbox') {
            input.addEventListener('change', calculate);
        } else {
            input.addEventListener('input', calculate);
        }
    }
});

// INIT
loadAgencyConfig();
calculate();
