// GRILLE SALARIALE COMMUNE (modifiable ici, appliquee partout)
export const GRILLE_SALARIALE = {
    smicHoraire: 12.02,          // SMIC horaire brut (base AM2/GE2/AV2)
    tauxGE3: 12.12,              // Taux horaire GE3
    tauxAV3: 12.17,              // Taux horaire AV3
    bonusConfirme: 0.10,         // Supplément Confirmé
    bonusExpert: 0.20,           // Supplément Expert
    bonusReferent: 0.30,         // Supplément Référent
    kmRate: 0.45,                // Indemnité kilométrique (€/km)
    primeCarburantMax: 300,      // Prime carburant annuelle max (€)
    ticketValue: 6.00,           // Valeur faciale titre restaurant
    ticketEmployeeShare: 3.00,   // Part salariale titre restaurant
    chequesCadeaux: 50,          // Chèques cadeaux Noël (€/an)
    chequesVacances: 100,        // Chèques vacances (€/an, dont 80€ employeur)
    chequesVacancesEmployeur: 80 // Part employeur chèques vacances
};

export const AGENCY_CONFIGS = {
    // CONFIGURATION NORD TOURAINE (Par défaut)
    "nord-touraine": {
        name: "O2 Nord Touraine",
        telephone: {
            display: "02 43 72 43 45",
            link: "tel:0243724345",
            label: "Ligne Salariés"
        },
        home: {
            gestionClesUrl: "https://docs.google.com/forms/d/e/1FAIpQLScYpiJS_KAWRl3h_dJCY2-cX9gYJr-Uh9qNQK2qVZ8xFNY14w/viewform?usp=sf_link", 
            declarationKmsUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIt7TJMrf9qr-h3xf9Ryut_PdVmSm1LRxp6_-xh4tqIqR1Tg/viewform?usp=sf_link"
        },
        remuneration: {
            mutuelleName: "Mutuelle Santé (CPMS)",
            mutuellePrice: "17,22 €"
        },
        docs: {
            medecineTravail: {
                address: "25 Rue de la Milletière, 37100 Tours",
                phoneDisplay: "02 47 62 88 88",
                phoneLink: "tel:0247628888"
            },
            links: {
                avantages: "https://drive.google.com/file/d/1glFTwKCafdGOQgrANri7IJ5A23sKgeK5/view?usp=sharing",
                conges: "https://drive.google.com/file/d/1jun4oU6QAAOgarSxd9r9HNoDPWYbCpVo/view?usp=share_link",
                dueSante: "https://drive.google.com/file/d/1njY4BCWRpQKSHILpMeRX_LeksLHiJsvs/view?usp=share_link",
                garantieSante: "https://drive.google.com/file/d/1Sr3FTAWsbKMpIX3XOONjna_4A7OkX1E3/view?usp=share_link",
                dueInteressement: "https://drive.google.com/file/d/1LhM0Jh_mLvTdxdMneaWYMdITyUY1A9JT/view?usp=share_link",
                accordTemps: "https://drive.google.com/file/d/1Akowb6VYpWDSeCs28psDmaRdqjhWnHYl/view?usp=sharing"
            }
        },
        contacts: {
            agence: {
                phoneDisplay: "02 46 65 68 80",
                phoneLink: "tel:0246656880",
                address: "134 Bd Charles de Gaulle, 37540 Saint-Cyr-Sur-Loire",
                addressLink: "https://maps.google.com/?q=134+Bd+Charles+de+Gaulle+37540+Saint-Cyr-Sur-Loire",
                email: "nordtouraine@o2.fr"
            }
        }
    },

    // CONFIGURATION LOCHES (À compléter)
    // Url à utiliser : /?agence=loches
    "loches": {
        name: "O2 Loches",
        telephone: {
            display: "02 43 72 43 45",
            link: "tel:0243724345",
            label: "Ligne Salariés"
        },
        home: {
            gestionClesUrl: "https://docs.google.com/forms/d/e/1FAIpQLSczzwX9PjMXBJHHAq6TnlUQSfCSk2yLkoP1BtbVyePPAAluGQ/viewform?usp=sf_link", 
            declarationKmsUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeLIa2CutbQn7QVCdDbJJfr8KjCeHAj7PpAG1qhTYl1bkF9Lw/viewform?usp=sf_link"
        },
        remuneration: {
            mutuelleName: "Mutuelle Santé (ALLIANZ)",
            mutuellePrice: "21,13 €"
        },
        docs: {
            medecineTravail: {
                address: "1 Pl. du Maréchal Leclerc, 37600 Beaulieu-lès-Loches",
                phoneDisplay: "02 47 37 66 76",
                phoneLink: "tel:0247376676"
            },
            links: {
                avantages: "https://drive.google.com/file/d/1lZhynwRzlqJE4qyLBuB75mzef1TPaFHI/view?usp=sharing",
                conges: "https://drive.google.com/file/d/1Sx2UMvGmMRpYw8aQ6Rzi5jDK86RFf6SK/view?usp=sharing",
                dueSante: "https://drive.google.com/file/d/1rejlxMdJqpawpC9B4aO8zxn6SIrfrsjd/view?usp=sharing",
                garantieSante: "https://drive.google.com/file/d/1M1YvJYmCpJ-3JBBZhn6QIBKadj3xOn6v/view?usp=sharing",
                dueInteressement: "https://drive.google.com/file/d/1JfBIJ7xgqNpoOZN96PKd0homgqhrlXy6/view?usp=share_link",
                accordTemps: "https://drive.google.com/file/d/1rQAralibJ0CWLL4SRWZVKP3NNW1hsr1P/view?usp=share_link"
            }
        },
        contacts: {
            agence: {
                phoneDisplay: "02 42 22 00 57",
                phoneLink: "tel:0242220057",
                address: "31 Grande Rue, 37600 Loches",
                addressLink: "https://maps.google.com/?q=31+Grande+Rue+37600+Loches",
                email: "loches@o2.fr"
            }
        }
    }
};
