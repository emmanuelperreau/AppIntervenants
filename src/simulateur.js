// simulateur.js — Logique du simulateur de salaire (Vanilla JS)
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config.js';
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
} from './calculator.js';

// CONSTANTES depuis GRILLE_SALARIALE
const SMIC_HORAIRE         = GRILLE_SALARIALE.smicHoraire;
const KM_RATE              = GRILLE_SALARIALE.kmRate;
const TICKET_EMPLOYEE_SHARE = GRILLE_SALARIALE.ticketEmployeeShare;
const PRIME_CARBURANT_MAX  = GRILLE_SALARIALE.primeCarburantMax;
const CHEQUES_CADEAUX      = GRILLE_SALARIALE.chequesCadeaux;
const CHEQUES_VACANCES     = GRILLE_SALARIALE.chequesVacancesEmployeur;
const PRIME_ANCIENNETE     = GRILLE_SALARIALE.primeAnciennete;

// POSTES
const POSTES = [
    { label: 'AM2',          rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'AM2 Confirmé', rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusConfirme },
    { label: 'AM2 Expert',   rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusExpert },
    { label: 'AM2 Référent', rate: GRILLE_SALARIALE.smicHoraire + GRILLE_SALARIALE.bonusReferent },
    { label: 'GE2',          rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'GE3',          rate: GRILLE_SALARIALE.tauxGE3 },
    { label: 'GE3 Confirmé', rate: GRILLE_SALARIALE.tauxGE3 + GRILLE_SALARIALE.bonusConfirme },
    { label: 'GE3 Expert',   rate: GRILLE_SALARIALE.tauxGE3 + GRILLE_SALARIALE.bonusExpert },
    { label: 'AV2',          rate: GRILLE_SALARIALE.smicHoraire },
    { label: 'AV3',          rate: GRILLE_SALARIALE.tauxAV3 },
    { label: 'AV3 Confirmé', rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusConfirme },
    { label: 'AV3 Expert',   rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusExpert },
    { label: 'AV3 Référent', rate: GRILLE_SALARIALE.tauxAV3 + GRILLE_SALARIALE.bonusReferent },
];

// ÉLÉMENTS
const inputs = {
    poste:        /** @type {HTMLSelectElement|null} */ (document.getElementById('input-poste')),
    rate:         /** @type {HTMLInputElement|null}  */ (document.getElementById('input-rate')),
    hours:        /** @type {HTMLInputElement|null}  */ (document.getElementById('input-hours')),
    anciennete:   /** @type {HTMLSelectElement|null} */ (document.getElementById('input-anciennete')),
    kms:          /** @type {HTMLInputElement|null}  */ (document.getElementById('input-kms')),
    tickets:      /** @type {HTMLInputElement|null}  */ (document.getElementById('input-tickets')),
    mutuelleCheck: /** @type {HTMLInputElement|null} */ (document.getElementById('check-mutuelle')),
    mutuelleCost: /** @type {HTMLInputElement|null}  */ (document.getElementById('input-mutuelle-cost')),
};

const outputs = {
    primeCarburant: document.getElementById('res-prime-carburant'),
    heuresComp:     document.getElementById('res-heures-comp'),
    smicMensuel:    document.getElementById('res-smic-mensuel'),
    smicHoraire:    document.getElementById('res-smic-horaire'),
    totalMoyen:     document.getElementById('res-total-moyen'),
    totalHoraire:   document.getElementById('res-total-horaire'),
    coutEmployeur:  document.getElementById('res-cout-employeur'),
};

/** @param {number} val */
function formatCurrency(val) {
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function loadAgencyConfig() {
    const params    = new URLSearchParams(window.location.search);
    const agencyId  = window.__AGENCE__ || params.get('agence') || 'nord-touraine';

    const linkRetour = /** @type {HTMLAnchorElement|null} */ (document.getElementById('link-retour'));
    if (linkRetour) linkRetour.href = './index.html?agence=' + agencyId;

    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];
    if (!config) return;

    if (config.remuneration?.mutuellePrice) {
        const priceStr = config.remuneration.mutuellePrice.replace(',', '.');
        const price    = parseFloat(priceStr);
        const inputMutuelle = inputs.mutuelleCost;
        if (inputMutuelle && !isNaN(price)) {
            inputMutuelle.value    = price.toFixed(2);
            inputMutuelle.disabled = true;
            inputMutuelle.classList.add('disabled');
        }
    }
}

function calculate() {
    const rateBase       = parseFloat(inputs.rate?.value ?? '0') || 0;
    const hoursWeekly    = parseFloat(inputs.hours?.value ?? '0') || 0;
    const ancienneteKey  = parseInt(inputs.anciennete?.value ?? '0', 10);
    const bonusAnciennete = PRIME_ANCIENNETE[/** @type {keyof typeof PRIME_ANCIENNETE} */ (ancienneteKey)] ?? 0;
    const rate           = calculateTauxAvecAnciennete(rateBase, bonusAnciennete);
    const kms            = parseFloat(inputs.kms?.value ?? '0') || 0;
    const tickets        = parseFloat(inputs.tickets?.value ?? '0') || 0;
    const mutuelleCost   = inputs.mutuelleCheck?.checked
        ? (parseFloat(inputs.mutuelleCost?.value ?? '0') || 0)
        : 0;

    const hoursMonthly = calculateHoursMonthly(hoursWeekly);
    const salaireBrut  = calculateBrutMensuel(rate, hoursWeekly);
    const netBase      = calculateNetBase(salaireBrut, mutuelleCost);

    const smicBrut         = calculateBrutMensuel(SMIC_HORAIRE, hoursWeekly);
    const smicNetBase      = calculateNetBase(smicBrut, mutuelleCost);

    const gainKms    = calculateGainKms(kms, KM_RATE);
    const costTickets = calculateCostTickets(tickets, TICKET_EMPLOYEE_SHARE);

    const netMensuel       = calculateNetMensuel(netBase, gainKms, costTickets, mutuelleCost);
    const smicMensuelFinal = smicNetBase;
    const smicHoraireFinal = calculateNetHoraire(smicMensuelFinal, hoursMonthly);

    const primeCarburantAnnuelle = calculatePrimeCarburant(hoursWeekly, PRIME_CARBURANT_MAX);
    const heuresComp             = calculateHeuresComp(hoursWeekly, rate);
    const totalMoyen             = calculateTotalMoyen(netMensuel, CHEQUES_CADEAUX, CHEQUES_VACANCES, heuresComp, primeCarburantAnnuelle);
    const totalHoraire           = calculateNetHoraire(totalMoyen, hoursMonthly);
    const coutGlobal             = calculateCoutEmployeur(salaireBrut, gainKms, tickets, mutuelleCost);

    if (outputs.smicMensuel)    outputs.smicMensuel.textContent    = formatCurrency(smicMensuelFinal);
    if (outputs.smicHoraire)    outputs.smicHoraire.textContent    = formatCurrency(smicHoraireFinal);
    if (outputs.primeCarburant) outputs.primeCarburant.textContent = formatCurrency(primeCarburantAnnuelle);
    if (outputs.heuresComp)     outputs.heuresComp.textContent     = formatCurrency(heuresComp);
    if (outputs.totalMoyen)     outputs.totalMoyen.textContent     = formatCurrency(totalMoyen);
    if (outputs.totalHoraire)   outputs.totalHoraire.textContent   = formatCurrency(totalHoraire);
    if (outputs.coutEmployeur)  outputs.coutEmployeur.textContent  = formatCurrency(coutGlobal);
}

// Remplir le sélecteur de postes
if (inputs.poste) {
    const posteEl = inputs.poste;
    POSTES.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value       = String(i);
        opt.textContent = `${p.label} (${p.rate.toFixed(2)} €)`;
        posteEl.appendChild(opt);
    });
    posteEl.addEventListener('change', () => {
        const idx   = parseInt(posteEl.value, 10);
        const poste = POSTES[idx];
        if (poste && inputs.rate) {
            inputs.rate.value = poste.rate.toFixed(2);
            calculate();
        }
    });
}

// Attacher les listeners
Object.values(inputs).forEach(input => {
    if (!input || input === inputs.poste) return; // poste géré séparément
    const evtName = (input.type === 'checkbox' || input.tagName === 'SELECT') ? 'change' : 'input';
    input.addEventListener(evtName, calculate);
});

// Valeurs statiques
const simStaticValues = {
    'val-sim-cheques-cadeaux':  formatCurrency(CHEQUES_CADEAUX),
    'val-sim-cheques-vacances': formatCurrency(CHEQUES_VACANCES),
};
for (const [id, text] of Object.entries(simStaticValues)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// Valeur par défaut taux horaire
if (inputs.rate) inputs.rate.value = SMIC_HORAIRE.toFixed(2);

loadAgencyConfig();
calculate();
