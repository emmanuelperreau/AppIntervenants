// config.js — Configuration agences et grille salariale (module ES natif)

// GRILLE SALARIALE COMMUNE (modifiable ici, appliquée partout)
export const GRILLE_SALARIALE = {
    smicHoraire: 12.31,             // SMIC horaire brut (base AM2/GE2/AV2)
    tauxGE3: 12.31,                 // Taux horaire GE3 (rattrapé par le SMIC)
    tauxAV3: 12.31,                 // Taux horaire AV3 (rattrapé par le SMIC)
    bonusConfirme: 0.10,            // Supplément Confirmé
    bonusExpert: 0.20,              // Supplément Expert
    bonusReferent: 0.30,            // Supplément Référent
    kmRate: 0.45,                   // Indemnité kilométrique (EUR/km)
    primeCarburantMax: 300,         // Prime carburant annuelle max (EUR)
    ticketValue: 6.00,              // Valeur faciale titre restaurant
    ticketEmployeeShare: 3.00,      // Part salariale titre restaurant
    chequesCadeaux: 50,             // Chèques cadeaux Noël (EUR/an)
    chequesCadeauxEnfant: 15,       // Supplément chèques cadeaux Noël par enfant -16 ans (EUR)
    chequesVacancesTotal: 100,      // Chèques vacances total (EUR/an)
    chequesVacancesEmployeur: 80,   // Part employeur chèques vacances
    parrainageClient: 40,           // Prime parrainage client (EUR)
    parrainageIntervenant: 200,     // Prime parrainage intervenant (EUR)
    primeAnciennete: {
        0: 0,
        1: 0.05,
        2: 0.10,
        3: 0.15,
        5: 0.20,
        10: 0.30
    }
};

/** @type {Record<string, {name:string,telephone:{display:string,link:string,label:string},home:{gestionClesUrl:string,declarationKmsUrl:string},remuneration:{mutuelleName:string,mutuellePrice:string,mutuellePortailUrl:string},docs:{medecineTravail:{address:string,phoneDisplay:string,phoneLink:string},links:{avantages:string,dueSante:string,garantieSante:string,dueInteressement:string,accordTemps:string,prevoyance:string}},contacts:{agence:{phoneDisplay:string,phoneLink:string,address:string,addressLink:string,email:string}}}>} */
export const AGENCY_CONFIGS = {
    // CONFIGURATION NORD TOURAINE (par défaut)
    'nord-touraine': {
        name: 'O2 Nord Touraine',
        telephone: {
            display: '02 43 72 43 45',
            link: 'tel:0243724345',
            label: 'Ligne Salariés'
        },
        home: {
            gestionClesUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScYpiJS_KAWRl3h_dJCY2-cX9gYJr-Uh9qNQK2qVZ8xFNY14w/viewform?usp=sf_link',
            declarationKmsUrl: 'https://sirh.serviam.app/km'
        },
        remuneration: {
            mutuelleName: 'Mutuelle Santé (Swiss Life)',
            mutuellePrice: '16,82 €',
            mutuellePortailUrl: 'https://bia.swisslife.fr/public/contrat/018619953/entreprise/424571b1-073d-4cb7-b93f-923c0bf5b37f'
        },
        docs: {
            medecineTravail: {
                address: '25 Rue de la Milletiere, 37100 Tours',
                phoneDisplay: '02 47 62 88 88',
                phoneLink: 'tel:0247628888'
            },
            links: {
                avantages: 'https://drive.google.com/file/d/1glFTwKCafdGOQgrANri7IJ5A23sKgeK5/preview',
                dueSante: 'https://drive.google.com/file/d/1emfqsZHfmRlDsQUeCtW1kSeXMoZFFY3h/preview',
                garantieSante: 'https://drive.google.com/file/d/1w2u7iFUTinjA2VZnyUGEdcvJSBflsw8z/preview',
                dueInteressement: 'https://drive.google.com/file/d/1LhM0Jh_mLvTdxdMneaWYMdITyUY1A9JT/preview',
                accordTemps: 'https://drive.google.com/file/d/1Akowb6VYpWDSeCs28psDmaRdqjhWnHYl/preview',
                prevoyance: 'https://drive.google.com/file/d/1ISFsTJGOXZD-t3t01RnjUz9mu0Q6f6Q_/preview'
            }
        },
        contacts: {
            agence: {
                phoneDisplay: '02 46 65 68 80',
                phoneLink: 'tel:0246656880',
                address: '134 Bd Charles de Gaulle, 37540 Saint-Cyr-Sur-Loire',
                addressLink: 'https://maps.google.com/?q=134+Bd+Charles+de+Gaulle+37540+Saint-Cyr-Sur-Loire',
                email: 'nordtouraine@o2.fr'
            }
        }
    },

    // CONFIGURATION LANGEAIS
    'langeais': {
        name: 'O2 Langeais',
        telephone: {
            display: '02 43 72 43 45',
            link: 'tel:0243724345',
            label: 'Ligne Salariés'
        },
        home: {
            gestionClesUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScYpiJS_KAWRl3h_dJCY2-cX9gYJr-Uh9qNQK2qVZ8xFNY14w/viewform?usp=sf_link',
            declarationKmsUrl: 'https://sirh.serviam.app/km'
        },
        remuneration: {
            mutuelleName: 'Mutuelle Santé (Swiss Life)',
            mutuellePrice: '16,82 €',
            mutuellePortailUrl: 'https://bia.swisslife.fr/public/contrat/018619953/entreprise/424571b1-073d-4cb7-b93f-923c0bf5b37f'
        },
        docs: {
            medecineTravail: {
                address: '25 Rue de la Milletiere, 37100 Tours',
                phoneDisplay: '02 47 62 88 88',
                phoneLink: 'tel:0247628888'
            },
            links: {
                avantages: 'https://drive.google.com/file/d/1glFTwKCafdGOQgrANri7IJ5A23sKgeK5/preview',
                dueSante: 'https://drive.google.com/file/d/1emfqsZHfmRlDsQUeCtW1kSeXMoZFFY3h/preview',
                garantieSante: 'https://drive.google.com/file/d/1w2u7iFUTinjA2VZnyUGEdcvJSBflsw8z/preview',
                dueInteressement: 'https://drive.google.com/file/d/1LhM0Jh_mLvTdxdMneaWYMdITyUY1A9JT/preview',
                accordTemps: 'https://drive.google.com/file/d/1Akowb6VYpWDSeCs28psDmaRdqjhWnHYl/preview',
                prevoyance: 'https://drive.google.com/file/d/1ISFsTJGOXZD-t3t01RnjUz9mu0Q6f6Q_/preview'
            }
        },
        contacts: {
            agence: {
                phoneDisplay: '07 61 03 35 02',
                phoneLink: 'tel:0761033502',
                address: '134 Bd Charles de Gaulle, 37540 Saint-Cyr-Sur-Loire',
                addressLink: 'https://maps.google.com/?q=134+Bd+Charles+de+Gaulle+37540+Saint-Cyr-Sur-Loire',
                email: 'langeais@o2.fr'
            }
        }
    },

    // CONFIGURATION LOCHES
    'loches': {
        name: 'O2 Loches',
        telephone: {
            display: '02 43 72 43 45',
            link: 'tel:0243724345',
            label: 'Ligne Salariés'
        },
        home: {
            gestionClesUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSczzwX9PjMXBJHHAq6TnlUQSfCSk2yLkoP1BtbVyePPAAluGQ/viewform?usp=sf_link',
            declarationKmsUrl: 'https://sirh.serviam.app/km'
        },
        remuneration: {
            mutuelleName: 'Mutuelle Santé (Swiss Life)',
            mutuellePrice: '16,82 €',
            mutuellePortailUrl: 'https://bia.swisslife.fr/public/contrat/018619949/entreprise/397c1cad-4c95-4ace-892d-b66724d2fed4'
        },
        docs: {
            medecineTravail: {
                address: '1 Pl. du Marechal Leclerc, 37600 Beaulieu-les-Loches',
                phoneDisplay: '02 47 37 66 76',
                phoneLink: 'tel:0247376676'
            },
            links: {
                avantages: 'https://drive.google.com/file/d/1lZhynwRzlqJE4qyLBuB75mzef1TPaFHI/preview',
                dueSante: 'https://drive.google.com/file/d/1PzYqLGD9OXLcxxN6doMlw3xAlJv3Ib2r/preview',
                garantieSante: 'https://drive.google.com/file/d/1w2u7iFUTinjA2VZnyUGEdcvJSBflsw8z/preview',
                dueInteressement: 'https://drive.google.com/file/d/1JfBIJ7xgqNpoOZN96PKd0homgqhrlXy6/preview',
                accordTemps: 'https://drive.google.com/file/d/1rQAralibJ0CWLL4SRWZVKP3NNW1hsr1P/preview',
                prevoyance: 'https://drive.google.com/file/d/1ISFsTJGOXZD-t3t01RnjUz9mu0Q6f6Q_/preview'
            }
        },
        contacts: {
            agence: {
                phoneDisplay: '02 42 22 00 57',
                phoneLink: 'tel:0242220057',
                address: '31 Grande Rue, 37600 Loches',
                addressLink: 'https://maps.google.com/?q=31+Grande+Rue+37600+Loches',
                email: 'loches@o2.fr'
            }
        }
    }
};
