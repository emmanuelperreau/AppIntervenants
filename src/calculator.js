// src/calculator.js — Moteur de calcul du simulateur (fonctions pures, testables)
// Annoté JSDoc pour tsc --checkJs

// Coefficients de paie (source : bulletin de paie type O2)
/** @type {number} Cotisations salariales : ~11,31% du brut */
export const TAUX_COTISATIONS_SALARIALES = 0.1131;
/** @type {number} 98,25% du brut = assiette CSG/CRDS (abattement 1,75%) */
export const ASSIETTE_CSG_CRDS = 0.9825;
/** @type {number} CSG 9,2% + CRDS 0,5% = 9,7% */
export const TAUX_CSG_CRDS = 0.097;

// Coefficient heures complementaires
/** @type {number} Estimation annuelle basee sur 60h comp. pour 24h/semaine */
export const HEURES_COMP_COEFF = 60;

// Estimation charges patronales
/** @type {number} Coeff approximatif pour SMIC + reductions */
export const CHARGES_PATRONALES_COEFF = 1.1;

/**
 * Applique le bonus d'ancienneté au taux horaire.
 * @param {number} tauxHoraire
 * @param {number} bonusAnciennete
 * @returns {number}
 */
export function calculateTauxAvecAnciennete(tauxHoraire, bonusAnciennete) {
    return tauxHoraire + bonusAnciennete;
}

/**
 * Calcule les heures mensualisées à partir des heures hebdomadaires.
 * Formule : heuresHebdo * 52 / 12
 * @param {number} hoursWeekly
 * @returns {number}
 */
export function calculateHoursMonthly(hoursWeekly) {
    return hoursWeekly * 52 / 12;
}

/**
 * Calcule le salaire brut mensuel.
 * Formule : heuresMensuelles * tauxHoraire
 * @param {number} tauxHoraire
 * @param {number} hoursWeekly
 * @returns {number}
 */
export function calculateBrutMensuel(tauxHoraire, hoursWeekly) {
    const hoursMonthly = calculateHoursMonthly(hoursWeekly);
    return hoursMonthly * tauxHoraire;
}

/**
 * Calcule le net de base à partir du brut et du coût mutuelle.
 * Formule : brut - (brut * cotisations) - ((brut * assiette + mutuelle) * CSG/CRDS)
 * @param {number} brutMensuel
 * @param {number} mutuelleCost
 * @returns {number}
 */
export function calculateNetBase(brutMensuel, mutuelleCost) {
    return brutMensuel
        - (brutMensuel * TAUX_COTISATIONS_SALARIALES)
        - (((brutMensuel * ASSIETTE_CSG_CRDS) + mutuelleCost) * TAUX_CSG_CRDS);
}

/**
 * Calcule l'indemnité kilométrique mensuelle.
 * @param {number} kms
 * @param {number} kmRate
 * @returns {number}
 */
export function calculateGainKms(kms, kmRate) {
    return kms * kmRate;
}

/**
 * Calcule la part salariée des tickets restaurant.
 * @param {number} tickets
 * @param {number} ticketEmployeeShare
 * @returns {number}
 */
export function calculateCostTickets(tickets, ticketEmployeeShare) {
    return tickets * ticketEmployeeShare;
}

/**
 * Calcule le net mensuel à payer.
 * Formule : netBase + gainKms + costTickets - mutuelleCost
 * @param {number} netBase
 * @param {number} gainKms
 * @param {number} costTickets
 * @param {number} mutuelleCost
 * @returns {number}
 */
export function calculateNetMensuel(netBase, gainKms, costTickets, mutuelleCost) {
    return netBase + gainKms + costTickets - mutuelleCost;
}

/**
 * Calcule le net horaire.
 * @param {number} netMensuel
 * @param {number} hoursMonthly
 * @returns {number}
 */
export function calculateNetHoraire(netMensuel, hoursMonthly) {
    return hoursMonthly > 0 ? netMensuel / hoursMonthly : 0;
}

/**
 * Calcule la prime carburant annuelle (proratisée selon heures hebdo / 35h).
 * @param {number} hoursWeekly
 * @param {number} primeCarburantMax
 * @returns {number}
 */
export function calculatePrimeCarburant(hoursWeekly, primeCarburantMax) {
    return (hoursWeekly * primeCarburantMax) / 35;
}

/**
 * Calcule le montant annuel des heures complémentaires (en EUR).
 * Prorata : heuresHebdo / 24h de référence * coefficient = heures annuelles.
 * Montant = heures * tauxHoraire * majoration 10%.
 * @param {number} hoursWeekly
 * @param {number} tauxHoraire
 * @returns {number}
 */
export function calculateHeuresComp(hoursWeekly, tauxHoraire) {
    const heures = (hoursWeekly * HEURES_COMP_COEFF) / 24;
    return heures * tauxHoraire * 1.10;
}

/**
 * Calcule le total moyen mensuel (net + primes annuelles lissées sur 12 mois).
 * @param {number} netMensuel
 * @param {number} chequesCadeaux
 * @param {number} chequesVacancesEmployeur
 * @param {number} heuresComp
 * @param {number} primeCarburant
 * @returns {number}
 */
export function calculateTotalMoyen(netMensuel, chequesCadeaux, chequesVacancesEmployeur, heuresComp, primeCarburant) {
    const primesAnnuelles = chequesCadeaux + chequesVacancesEmployeur + heuresComp + primeCarburant;
    const primeMensuelleLissee = primesAnnuelles / 12;
    return netMensuel + primeMensuelleLissee;
}

/**
 * Calcule le coût global employeur (estimation).
 * Formule : (brut * charges patronales) + gainKms + partPatronaleTickets + partPatronaleMutuelle
 * @param {number} salaireBrut
 * @param {number} gainKms
 * @param {number} tickets
 * @param {number} mutuelleCost
 * @returns {number}
 */
export function calculateCoutEmployeur(salaireBrut, gainKms, tickets, mutuelleCost) {
    const partPatronaleTickets = tickets * 3.00;
    const partPatronaleMutuelle = mutuelleCost;
    return (salaireBrut * CHARGES_PATRONALES_COEFF) + gainKms + partPatronaleTickets + partPatronaleMutuelle;
}
