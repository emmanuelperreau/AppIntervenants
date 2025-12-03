const AGENCY_CONFIG = {
    // Le nom de l'agence
    name: "O2 Nord Touraine",

    // Dans l'onglet accueil les deux liens gestion de clés et km
    home: {
        gestionClesUrl: "#", 
        declarationKmsUrl: "#"
    },

    // Rémunération : le nom de la mutuelle et le prix
    remuneration: {
        mutuelleName: "Mutuelle Santé (CPMS)",
        mutuellePrice: "13,55 €"
    },

    // Docs : tous les liens, l'adresse et le numéro de la médecine du travail
    docs: {
        medecineTravail: {
            address: "25 Rue de la Milletière, 37100 Tours",
            phoneDisplay: "02 47 62 88 88",
            phoneLink: "tel:0247628888"
        },
        links: {
            avantages: "#", // Avantages et Rémunération
            conges: "#", // Pose des congés payés
            dueSante: "#", // DUE Santé
            garantieSante: "#", // Garantie Frais de Santé
            dueInteressement: "#", // DUE Intéressement
            accordTemps: "https://drive.google.com/file/d/1Akowb6VYpWDSeCs28psDmaRdqjhWnHYl/view?usp=sharing" // Accord d'aménagement
        }
    },

    // Contacts et urgences : juste le tel, l'adresse et le mail de l'agence O2
    contacts: {
        agence: {
            phoneDisplay: "02 46 65 68 80",
            phoneLink: "tel:0246656880",
            address: "134 Bd Charles de Gaulle, 37540 Saint-Cyr-Sur-Loire",
            addressLink: "https://maps.google.com/?q=134+Bd+Charles+de+Gaulle+37540+Saint-Cyr-Sur-Loire",
            email: "nordtouraine@o2.fr"
        }
    }
};