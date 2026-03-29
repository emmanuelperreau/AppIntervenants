// src/calculator.js — Moteur de calcul du simulateur (fonctions pures, testables)

// Coefficients de paie (source : bulletin de paie type O2)
export const TAUX_COTISATIONS_SALARIALES = 0.1131;   // Cotisations salariales : ~11,31% du brut
export const ASSIETTE_CSG_CRDS = 0.9825;             // 98,25% du brut = assiette CSG/CRDS (abattement 1,75%)
export const TAUX_CSG_CRDS = 0.097;                  // CSG 9,2% + CRDS 0,5% = 9,7%

// Coefficient heures complementaires : estimation annuelle basee sur
// un ratio de 60 heures comp. pour un contrat de reference 24h/semaine.
export const HEURES_COMP_COEFF = 60;

// Estimation charges patronales (coeff approximatif pour SMIC + reductions)
export const CHARGES_PATRONALES_COEFF = 1.1;

/**
 * Calcule les heures mensualisees a partir des heures hebdomadaires.
 * Formule : heuresHebdo * 52 / 12
 */
export function calculateHoursMonthly(hoursWeekly) {
  return hoursWeekly * 52 / 12;
}

/**
 * Calcule le salaire brut mensuel.
 * Formule : heuresMensuelles * tauxHoraire
 */
export function calculateBrutMensuel(tauxHoraire, hoursWeekly) {
  const hoursMonthly = calculateHoursMonthly(hoursWeekly);
  return hoursMonthly * tauxHoraire;
}

/**
 * Calcule le net de base a partir du brut et du cout mutuelle.
 * Formule : brut - (brut * cotisations) - ((brut * assiette + mutuelle) * CSG/CRDS)
 */
export function calculateNetBase(brutMensuel, mutuelleCost) {
  return brutMensuel
    - (brutMensuel * TAUX_COTISATIONS_SALARIALES)
    - (((brutMensuel * ASSIETTE_CSG_CRDS) + mutuelleCost) * TAUX_CSG_CRDS);
}

/**
 * Calcule l'indemnite kilometrique mensuelle.
 */
export function calculateGainKms(kms, kmRate) {
  return kms * kmRate;
}

/**
 * Calcule la part salariee des tickets restaurant.
 */
export function calculateCostTickets(tickets, ticketEmployeeShare) {
  return tickets * ticketEmployeeShare;
}

/**
 * Calcule le net mensuel a payer.
 * Formule : netBase + gainKms + costTickets - mutuelleCost
 */
export function calculateNetMensuel(netBase, gainKms, costTickets, mutuelleCost) {
  return netBase + gainKms + costTickets - mutuelleCost;
}

/**
 * Calcule le net horaire.
 */
export function calculateNetHoraire(netMensuel, hoursMonthly) {
  return hoursMonthly > 0 ? netMensuel / hoursMonthly : 0;
}

/**
 * Calcule la prime carburant annuelle (proratisee selon heures hebdo / 35h).
 */
export function calculatePrimeCarburant(hoursWeekly, primeCarburantMax) {
  return (hoursWeekly * primeCarburantMax) / 35;
}

/**
 * Calcule l'estimation des heures complementaires annuelles.
 * Prorata : heuresHebdo / 24h de reference * coefficient.
 */
export function calculateHeuresComp(hoursWeekly) {
  return (hoursWeekly * HEURES_COMP_COEFF) / 24;
}

/**
 * Calcule le total moyen mensuel (net + primes annuelles lissees sur 12 mois).
 */
export function calculateTotalMoyen(netMensuel, chequesCadeaux, chequesVacancesEmployeur, heuresComp, primeCarburant) {
  const primesAnnuelles = chequesCadeaux + chequesVacancesEmployeur + heuresComp + primeCarburant;
  const primeMensuelleLissee = primesAnnuelles / 12;
  return netMensuel + primeMensuelleLissee;
}

/**
 * Calcule le cout global employeur (estimation).
 * Formule : (brut * charges patronales) + gainKms + partPatronaleTickets + partPatronaleMutuelle
 */
export function calculateCoutEmployeur(salaireBrut, gainKms, tickets, mutuelleCost) {
  const partPatronaleTickets = tickets * 3.00;
  const partPatronaleMutuelle = mutuelleCost;
  return (salaireBrut * CHARGES_PATRONALES_COEFF) + gainKms + partPatronaleTickets + partPatronaleMutuelle;
}
