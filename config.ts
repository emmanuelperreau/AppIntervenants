// Interfaces pour la configuration

interface GrilleSalariale {
    smicHoraire: number;
    tauxGE3: number;
    tauxAV3: number;
    bonusConfirme: number;
    bonusExpert: number;
    bonusReferent: number;
    kmRate: number;
    primeCarburantMax: number;
    ticketValue: number;
    ticketEmployeeShare: number;
    chequesCadeaux: number;
    chequesVacances: number;
    chequesVacancesEmployeur: number;
    tauxKm: number;
    chequeCadeaux: number;
    chequeVacances: number;
    parrainageClient: number;
    parrainageIntervenant: number;
}

interface TelephoneConfig {
    display: string;
    link: string;
    label: string;
}

interface HomeConfig {
    gestionClesUrl: string;
    declarationKmsUrl: string;
}

interface RemunerationConfig {
    mutuelleName: string;
    mutuellePrice: string;
}

interface MedecineTravailConfig {
    address: string;
    phoneDisplay: string;
    phoneLink: string;
}

interface DocsLinksConfig {
    avantages: string;
    conges: string;
    dueSante: string;
    garantieSante: string;
    dueInteressement: string;
    accordTemps: string;
}

interface DocsConfig {
    medecineTravail: MedecineTravailConfig;
    links: DocsLinksConfig;
}

interface AgenceContactConfig {
    phoneDisplay: string;
    phoneLink: string;
    address: string;
    addressLink: string;
    email: string;
}

interface ContactsConfig {
    agence: AgenceContactConfig;
}

export interface AgencyConfig {
    name: string;
    telephone: TelephoneConfig;
    home: HomeConfig;
    remuneration: RemunerationConfig;
    docs: DocsConfig;
    contacts: ContactsConfig;
}

// GRILLE SALARIALE COMMUNE (modifiable ici, appliquee partout)
export const GRILLE_SALARIALE: GrilleSalariale = {
    smicHoraire: 12.02,          // SMIC horaire brut (base AM2/GE2/AV2)
    tauxGE3: 12.12,              // Taux horaire GE3
    tauxAV3: 12.17,              // Taux horaire AV3
    bonusConfirme: 0.10,         // Supplement Confirme
    bonusExpert: 0.20,           // Supplement Expert
    bonusReferent: 0.30,         // Supplement Referent
    kmRate: 0.45,                // Indemnite kilometrique (EUR/km)
    primeCarburantMax: 300,      // Prime carburant annuelle max (EUR)
    ticketValue: 6.00,           // Valeur faciale titre restaurant
    ticketEmployeeShare: 3.00,   // Part salariale titre restaurant
    chequesCadeaux: 50,          // Cheques cadeaux Noel (EUR/an)
    chequesVacances: 100,        // Cheques vacances (EUR/an, dont 80EUR employeur)
    chequesVacancesEmployeur: 80, // Part employeur cheques vacances
    tauxKm: 0.45,                // Alias kmRate pour injection DOM
    chequeCadeaux: 50,           // Alias chequesCadeaux (singulier) pour injection DOM
    chequeVacances: 100,         // Alias chequesVacances (singulier) pour injection DOM
    parrainageClient: 40,        // Prime parrainage client (EUR)
    parrainageIntervenant: 200   // Prime parrainage intervenant (EUR)
} as const;

export const AGENCY_CONFIGS: Record<string, AgencyConfig> = {
    // CONFIGURATION NORD TOURAINE (Par defaut)
    "nord-touraine": {
        name: "O2 Nord Touraine",
        telephone: {
            display: "02 43 72 43 45",
            link: "tel:0243724345",
            label: "Ligne Salaries"
        },
        home: {
            gestionClesUrl: "https://docs.google.com/forms/d/e/1FAIpQLScYpiJS_KAWRl3h_dJCY2-cX9gYJr-Uh9qNQK2qVZ8xFNY14w/viewform?usp=sf_link",
            declarationKmsUrl: "https://docs.google.com/forms/d/e/1FAIpQLScIt7TJMrf9qr-h3xf9Ryut_PdVmSm1LRxp6_-xh4tqIqR1Tg/viewform?usp=sf_link"
        },
        remuneration: {
            mutuelleName: "Mutuelle Sante (CPMS)",
            mutuellePrice: "17,22 \u20ac"
        },
        docs: {
            medecineTravail: {
                address: "25 Rue de la Milletiere, 37100 Tours",
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

    // CONFIGURATION LOCHES
    "loches": {
        name: "O2 Loches",
        telephone: {
            display: "02 43 72 43 45",
            link: "tel:0243724345",
            label: "Ligne Salaries"
        },
        home: {
            gestionClesUrl: "https://docs.google.com/forms/d/e/1FAIpQLSczzwX9PjMXBJHHAq6TnlUQSfCSk2yLkoP1BtbVyePPAAluGQ/viewform?usp=sf_link",
            declarationKmsUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeLIa2CutbQn7QVCdDbJJfr8KjCeHAj7PpAG1qhTYl1bkF9Lw/viewform?usp=sf_link"
        },
        remuneration: {
            mutuelleName: "Mutuelle Sante (ALLIANZ)",
            mutuellePrice: "21,13 \u20ac"
        },
        docs: {
            medecineTravail: {
                address: "1 Pl. du Marechal Leclerc, 37600 Beaulieu-les-Loches",
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
