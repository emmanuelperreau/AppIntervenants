import { describe, it, expect } from 'vitest';
import {
    TAUX_COTISATIONS_SALARIALES,
    ASSIETTE_CSG_CRDS,
    TAUX_CSG_CRDS,
    CHARGES_PATRONALES_COEFF,
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

// Constantes de référence pour les tests (grille salariale config.js)
const SMIC_HORAIRE = 12.02;
const KM_RATE = 0.45;
const TICKET_EMPLOYEE_SHARE = 3.00;
const PRIME_CARBURANT_MAX = 300;
const CHEQUES_CADEAUX = 50;
const CHEQUES_VACANCES_EMPLOYEUR = 80;

describe('Simulateur de salaire — Fonctions de calcul', () => {

    describe('calculateTauxAvecAnciennete', () => {
        it('retourne le taux inchange sans anciennete', () => {
            expect(calculateTauxAvecAnciennete(12.02, 0)).toBe(12.02);
        });
        it('ajoute le bonus 1 an (+0.05)', () => {
            expect(calculateTauxAvecAnciennete(12.02, 0.05)).toBeCloseTo(12.07, 2);
        });
        it('ajoute le bonus 3 ans (+0.15)', () => {
            expect(calculateTauxAvecAnciennete(12.02, 0.15)).toBeCloseTo(12.17, 2);
        });
        it('ajoute le bonus 10 ans (+0.30)', () => {
            expect(calculateTauxAvecAnciennete(12.02, 0.30)).toBeCloseTo(12.32, 2);
        });
    });

    describe('calculateHoursMonthly', () => {
        it('mensualise 35h/semaine correctement (151.67h)', () => {
            expect(calculateHoursMonthly(35)).toBeCloseTo(151.67, 1);
        });
        it('mensualise 24h/semaine correctement (104h)', () => {
            expect(calculateHoursMonthly(24)).toBeCloseTo(104, 0);
        });
        it('retourne 0 pour 0 heures', () => {
            expect(calculateHoursMonthly(0)).toBe(0);
        });
    });

    describe('calculateBrutMensuel', () => {
        it('calcule le brut mensuel au SMIC pour 35h', () => {
            expect(calculateBrutMensuel(SMIC_HORAIRE, 35)).toBeCloseTo(1823.03, 0);
        });
        it('calcule le brut mensuel pour 24h a 12.02', () => {
            expect(calculateBrutMensuel(12.02, 24)).toBeCloseTo(1250.08, 0);
        });
        it('retourne 0 si le taux horaire est 0', () => {
            expect(calculateBrutMensuel(0, 35)).toBe(0);
        });
        it('retourne 0 si les heures sont 0', () => {
            expect(calculateBrutMensuel(12.02, 0)).toBe(0);
        });
    });

    describe('calculateNetBase', () => {
        it('applique les cotisations correctement sur un brut SMIC 35h', () => {
            const brut = calculateBrutMensuel(SMIC_HORAIRE, 35);
            const net = calculateNetBase(brut, 0);
            expect(net / brut).toBeGreaterThan(0.78);
            expect(net / brut).toBeLessThan(0.82);
        });
        it('le net diminue quand la mutuelle augmente', () => {
            const brut = 1822;
            const netSansMutuelle = calculateNetBase(brut, 0);
            const netAvecMutuelle = calculateNetBase(brut, 20);
            expect(netAvecMutuelle).toBeLessThan(netSansMutuelle);
        });
        it('reproduit la formule exacte du simulateur', () => {
            const brut = 1500;
            const mutuelle = 17.22;
            const expected = brut
                - (brut * TAUX_COTISATIONS_SALARIALES)
                - (((brut * ASSIETTE_CSG_CRDS) + mutuelle) * TAUX_CSG_CRDS);
            expect(calculateNetBase(brut, mutuelle)).toBeCloseTo(expected, 2);
        });
        it('retourne 0 pour un brut de 0', () => {
            expect(calculateNetBase(0, 0)).toBe(0);
        });
    });

    describe('calculateGainKms', () => {
        it('calcule les indemnites km correctement', () => {
            expect(calculateGainKms(100, KM_RATE)).toBeCloseTo(45, 2);
        });
        it('retourne 0 pour 0 kms', () => {
            expect(calculateGainKms(0, KM_RATE)).toBe(0);
        });
        it('gere les petites distances', () => {
            expect(calculateGainKms(1, KM_RATE)).toBeCloseTo(0.45, 2);
        });
    });

    describe('calculateCostTickets', () => {
        it('calcule la part salariee des tickets restaurant', () => {
            expect(calculateCostTickets(20, TICKET_EMPLOYEE_SHARE)).toBeCloseTo(60, 2);
        });
        it('retourne 0 pour 0 tickets', () => {
            expect(calculateCostTickets(0, TICKET_EMPLOYEE_SHARE)).toBe(0);
        });
    });

    describe('calculateNetMensuel', () => {
        it('combine net base, kms, tickets et mutuelle', () => {
            const expected = 1400 + 45 + 60 - 17.22;
            expect(calculateNetMensuel(1400, 45, 60, 17.22)).toBeCloseTo(expected, 2);
        });
        it('sans avantages ni mutuelle, egal au net base', () => {
            expect(calculateNetMensuel(1400, 0, 0, 0)).toBe(1400);
        });
    });

    describe('calculateNetHoraire', () => {
        it('divise le net mensuel par les heures mensuelles', () => {
            expect(calculateNetHoraire(1500, 151.67)).toBeCloseTo(9.89, 1);
        });
        it('retourne 0 si les heures sont 0 (pas de division par zero)', () => {
            expect(calculateNetHoraire(1500, 0)).toBe(0);
        });
    });

    describe('calculatePrimeCarburant', () => {
        it('donne le maximum pour 35h', () => {
            expect(calculatePrimeCarburant(35, PRIME_CARBURANT_MAX)).toBeCloseTo(300, 2);
        });
        it('proratise pour les temps partiels', () => {
            expect(calculatePrimeCarburant(24, PRIME_CARBURANT_MAX)).toBeCloseTo(205.71, 0);
        });
        it('retourne 0 pour 0 heures', () => {
            expect(calculatePrimeCarburant(0, PRIME_CARBURANT_MAX)).toBe(0);
        });
    });

    describe('calculateHeuresComp', () => {
        it('donne le montant EUR pour un contrat 24h au SMIC', () => {
            expect(calculateHeuresComp(24, SMIC_HORAIRE)).toBeCloseTo(60 * SMIC_HORAIRE * 1.10, 2);
        });
        it('proratise pour 35h au SMIC', () => {
            expect(calculateHeuresComp(35, SMIC_HORAIRE)).toBeCloseTo(87.5 * SMIC_HORAIRE * 1.10, 1);
        });
        it('retourne 0 pour 0 heures', () => {
            expect(calculateHeuresComp(0, SMIC_HORAIRE)).toBe(0);
        });
    });

    describe('calculateTotalMoyen', () => {
        it('ajoute les primes annuelles lissees au net mensuel', () => {
            const expected = 1400 + 395.71 / 12;
            expect(calculateTotalMoyen(1400, CHEQUES_CADEAUX, CHEQUES_VACANCES_EMPLOYEUR, 60, 205.71)).toBeCloseTo(expected, 1);
        });
        it('sans primes, egal au net mensuel + (cadeaux+vacances)/12', () => {
            expect(calculateTotalMoyen(1400, CHEQUES_CADEAUX, CHEQUES_VACANCES_EMPLOYEUR, 0, 0)).toBeCloseTo(1400 + (50 + 80) / 12, 1);
        });
    });

    describe('calculateCoutEmployeur', () => {
        it('calcule le cout employeur avec tous les elements', () => {
            const expected = (1822 * CHARGES_PATRONALES_COEFF) + 45 + (20 * 3) + 17.22;
            expect(calculateCoutEmployeur(1822, 45, 20, 17.22)).toBeCloseTo(expected, 2);
        });
        it('sans avantages, uniquement brut * charges patronales', () => {
            expect(calculateCoutEmployeur(1500, 0, 0, 0)).toBeCloseTo(1500 * CHARGES_PATRONALES_COEFF, 2);
        });
        it('retourne 0 si tout est a 0', () => {
            expect(calculateCoutEmployeur(0, 0, 0, 0)).toBe(0);
        });
    });

    describe('Scenario avec anciennete 3 ans', () => {
        it('le net augmente avec le bonus anciennete', () => {
            const rateAvec = calculateTauxAvecAnciennete(SMIC_HORAIRE, 0.15);
            expect(rateAvec).toBeCloseTo(12.17, 2);
            const brutSans = calculateBrutMensuel(SMIC_HORAIRE, 24);
            const brutAvec = calculateBrutMensuel(rateAvec, 24);
            expect(brutAvec).toBeGreaterThan(brutSans);
            const netSans = calculateNetBase(brutSans, 17.22);
            const netAvec = calculateNetBase(brutAvec, 17.22);
            expect(netAvec).toBeGreaterThan(netSans);
        });
    });

    describe('Scenario complet : contrat 24h au SMIC avec mutuelle', () => {
        it('reproduit le calcul complet du simulateur', () => {
            const rate = SMIC_HORAIRE;
            const hoursWeekly = 24;
            const kms = 50;
            const tickets = 15;
            const mutuelle = 17.22;

            const hoursMonthly = calculateHoursMonthly(hoursWeekly);
            expect(hoursMonthly).toBeCloseTo(104, 0);

            const brut = calculateBrutMensuel(rate, hoursWeekly);
            expect(brut).toBeCloseTo(1250.08, 0);

            const netBase = calculateNetBase(brut, mutuelle);
            expect(netBase).toBeGreaterThan(900);
            expect(netBase).toBeLessThan(1100);

            const gainKms = calculateGainKms(kms, KM_RATE);
            expect(gainKms).toBeCloseTo(22.5, 2);

            const costTickets = calculateCostTickets(tickets, TICKET_EMPLOYEE_SHARE);
            expect(costTickets).toBeCloseTo(45, 2);

            const netMensuel = calculateNetMensuel(netBase, gainKms, costTickets, mutuelle);
            expect(netMensuel).toBeGreaterThan(netBase - mutuelle);

            const netHoraire = calculateNetHoraire(netMensuel, hoursMonthly);
            expect(netHoraire).toBeGreaterThan(8);
            expect(netHoraire).toBeLessThan(12);

            const primeCarburant = calculatePrimeCarburant(hoursWeekly, PRIME_CARBURANT_MAX);
            const heuresComp = calculateHeuresComp(hoursWeekly, rate);
            expect(heuresComp).toBeCloseTo(60 * rate * 1.10, 0);

            const totalMoyen = calculateTotalMoyen(netMensuel, CHEQUES_CADEAUX, CHEQUES_VACANCES_EMPLOYEUR, heuresComp, primeCarburant);
            expect(totalMoyen).toBeGreaterThan(netMensuel);

            const coutEmployeur = calculateCoutEmployeur(brut, gainKms, tickets, mutuelle);
            expect(coutEmployeur).toBeGreaterThan(brut);
        });
    });
});
