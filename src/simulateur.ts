// Styles (traites par Vite + Tailwind)
import './styles.css';

// Lucide Icons (auto-hebergees via npm)
import { createIcons, ArrowLeft, Info } from 'lucide';

// Config agence (module ES)
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config';

// Moteur de calcul (fonctions pures)
import {
    calculateTauxAvecAnciennete,
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
} from './calculator';

// Initialiser les icones Lucide
createIcons({ icons: { ArrowLeft, Info }, attrs: { 'aria-hidden': 'true' } });

// CONSTANTES
// Valeurs depuis config.ts (GRILLE_SALARIALE)
const SMIC_HORAIRE = GRILLE_SALARIALE.smicHoraire;
const KM_RATE = GRILLE_SALARIALE.kmRate;
const TICKET_EMPLOYEE_SHARE = GRILLE_SALARIALE.ticketEmployeeShare;
const PRIME_CARBURANT_MAX = GRILLE_SALARIALE.primeCarburantMax;
const CHEQUES_CADEAUX = GRILLE_SALARIALE.chequesCadeaux;
const CHEQUES_VACANCES = GRILLE_SALARIALE.chequesVacancesEmployeur;

// ELEMENTS
const PRIME_ANCIENNETE = GRILLE_SALARIALE.primeAnciennete;

const inputs = {
    poste: document.getElementById('input-poste') as HTMLSelectElement | null,
    rate: document.getElementById('input-rate') as HTMLInputElement | null,
    hours: document.getElementById('input-hours') as HTMLInputElement | null,
    anciennete: document.getElementById('input-anciennete') as HTMLSelectElement | null,
    kms: document.getElementById('input-kms') as HTMLInputElement | null,
    tickets: document.getElementById('input-tickets') as HTMLInputElement | null,
    mutuelleCheck: document.getElementById('check-mutuelle') as HTMLInputElement | null,
    mutuelleCost: document.getElementById('input-mutuelle-cost') as HTMLInputElement | null
};

const outputs = {
    netMensuel: document.getElementById('res-net-mensuel'),
    netHoraire: document.getElementById('res-net-horaire'),
    primeCarburant: document.getElementById('res-prime-carburant'),
    heuresComp: document.getElementById('res-heures-comp'),
    smicMensuel: document.getElementById('res-smic-mensuel'),
    smicHoraire: document.getElementById('res-smic-horaire'),
    totalMoyen: document.getElementById('res-total-moyen'),
    totalHoraire: document.getElementById('res-total-horaire'),
    coutEmployeur: document.getElementById('res-cout-employeur')
};

// Chargement de la config agence
function loadAgencyConfig(): void {
    const params = new URLSearchParams(window.location.search);
    const agencyId = params.get('agence') || 'nord-touraine';

    const linkRetour = document.getElementById('link-retour') as HTMLAnchorElement | null;
    if (linkRetour) linkRetour.href = 'index.html?agence=' + agencyId;

    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];
    if (!config) return;

    if (config.remuneration && config.remuneration.mutuellePrice) {
        const priceStr = config.remuneration.mutuellePrice.replace(',', '.');
        const price = parseFloat(priceStr);

        const inputMutuelle = document.getElementById('input-mutuelle-cost') as HTMLInputElement | null;
        if (inputMutuelle && !isNaN(price)) {
            inputMutuelle.value = price.toFixed(2);
            inputMutuelle.disabled = true;
            inputMutuelle.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-100', 'dark:bg-slate-700');
            inputMutuelle.classList.remove('bg-slate-50', 'dark:bg-slate-900');
        }
    }
}

// POSTES DISPONIBLES (taux horaire brut de base)
const POSTES: { label: string; rate: number }[] = [
    { label: 'AM2', rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'AM2 Confirmé', rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusConfirme },
    { label: 'AM2 Expert', rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusExpert },
    { label: 'AM2 Référent', rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusReferent },
    { label: 'GE2', rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'GE3', rate: GRILLE_SALARIALE.tauxGE3 },
    { label: 'GE3 Confirmé', rate: GRILLE_SALARIALE.tauxGE3 + GRILLE_SALARIALE.bonusConfirme },
    { label: 'GE3 Expert', rate: GRILLE_SALARIALE.tauxGE3 + GRILLE_SALARIALE.bonusExpert },
    { label: 'AV2', rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'AV3', rate: GRILLE_SALARIALE.tauxAV3 },
    { label: 'AV3 Confirmé', rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusConfirme },
    { label: 'AV3 Expert', rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusExpert },
    { label: 'AV3 Référent', rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusReferent },
];

// Populate poste selector
if (inputs.poste) {
    POSTES.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = `${p.label} (${p.rate.toFixed(2)} €)`;
        inputs.poste!.appendChild(opt);
    });
    inputs.poste.addEventListener('change', () => {
        const idx = parseInt(inputs.poste!.value, 10);
        const poste = POSTES[idx];
        if (poste && inputs.rate) {
            inputs.rate.value = poste.rate.toFixed(2);
            calculate();
        }
    });
}

// MOTEUR DE CALCUL
function calculate(): void {
    const rateBase = parseFloat(inputs.rate?.value ?? '0') || 0;
    const hoursWeekly = parseFloat(inputs.hours?.value ?? '0') || 0;
    const ancienneteKey = parseInt(inputs.anciennete?.value ?? '0', 10);
    const bonusAnciennete = PRIME_ANCIENNETE[ancienneteKey as keyof typeof PRIME_ANCIENNETE] ?? 0;
    const rate = calculateTauxAvecAnciennete(rateBase, bonusAnciennete);
    const kms = parseFloat(inputs.kms?.value ?? '0') || 0;
    const tickets = parseFloat(inputs.tickets?.value ?? '0') || 0;
    const mutuelleCost = inputs.mutuelleCheck?.checked ? (parseFloat(inputs.mutuelleCost?.value ?? '0') || 0) : 0;

    const hoursMonthly = calculateHoursMonthly(hoursWeekly);
    const salaireBrut = calculateBrutMensuel(rate, hoursWeekly);

    const netBase = calculateNetBase(salaireBrut, mutuelleCost);

    const smicBrut = calculateBrutMensuel(SMIC_HORAIRE, hoursWeekly);
    const smicNetBase = calculateNetBase(smicBrut, mutuelleCost);

    const gainKms = calculateGainKms(kms, KM_RATE);
    const costTickets = calculateCostTickets(tickets, TICKET_EMPLOYEE_SHARE);

    const netMensuel = calculateNetMensuel(netBase, gainKms, costTickets, mutuelleCost);

    const smicMensuelFinal = smicNetBase;

    const realNetHoraire = calculateNetHoraire(netMensuel, hoursMonthly);
    const smicHoraireFinal = calculateNetHoraire(smicMensuelFinal, hoursMonthly);

    if (outputs.netMensuel) outputs.netMensuel.textContent = formatCurrency(netMensuel);
    if (outputs.netHoraire) outputs.netHoraire.textContent = formatCurrency(realNetHoraire);

    if (outputs.smicMensuel) outputs.smicMensuel.textContent = formatCurrency(smicMensuelFinal);
    if (outputs.smicHoraire) outputs.smicHoraire.textContent = formatCurrency(smicHoraireFinal);

    const primeCarburantAnnuelle = calculatePrimeCarburant(hoursWeekly, PRIME_CARBURANT_MAX);
    if (outputs.primeCarburant) outputs.primeCarburant.textContent = formatCurrency(primeCarburantAnnuelle);

    const heuresComp = calculateHeuresComp(hoursWeekly, rate);
    if (outputs.heuresComp) outputs.heuresComp.textContent = formatCurrency(heuresComp);

    const totalMoyen = calculateTotalMoyen(netMensuel, CHEQUES_CADEAUX, CHEQUES_VACANCES, heuresComp, primeCarburantAnnuelle);
    const totalHoraire = calculateNetHoraire(totalMoyen, hoursMonthly);

    if (outputs.totalMoyen) outputs.totalMoyen.textContent = formatCurrency(totalMoyen);
    if (outputs.totalHoraire) outputs.totalHoraire.textContent = formatCurrency(totalHoraire);

    const coutGlobal = calculateCoutEmployeur(salaireBrut, gainKms, tickets, mutuelleCost);

    if (outputs.coutEmployeur) outputs.coutEmployeur.textContent = formatCurrency(coutGlobal);
}

function formatCurrency(val: number): string {
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// LISTENERS
Object.values(inputs).forEach((input) => {
    if (input) {
        if (input.type === 'checkbox' || input instanceof HTMLSelectElement) {
            input.addEventListener('change', calculate);
        } else {
            input.addEventListener('input', calculate);
        }
    }
});

// INIT
// Injecter les valeurs par defaut depuis config
if (inputs.rate) inputs.rate.value = SMIC_HORAIRE.toFixed(2);

// Injecter les valeurs statiques depuis config
const simStaticValues: Record<string, string> = {
    'val-sim-cheques-cadeaux': formatCurrency(CHEQUES_CADEAUX),
    'val-sim-cheques-vacances': formatCurrency(CHEQUES_VACANCES),
};
for (const [id, text] of Object.entries(simStaticValues)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

loadAgencyConfig();
calculate();
