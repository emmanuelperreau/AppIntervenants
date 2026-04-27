import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config';

// Application de la configuration agence
export function applyConfig(): void {
    // 1. Detecter l'agence via l'URL (ex: ?agence=loches)
    const params = new URLSearchParams(window.location.search);
    const agencyId = params.get('agence') || 'nord-touraine';

    // 2. Selectionner la config
    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];

    if (!config) return;

    // Header
    const headerName = document.getElementById('header-agency-name');
    if (headerName) headerName.textContent = config.name;

    // Header - Telephone rapide (depuis config.telephone)
    if (config.telephone) {
        const headerPhoneLink = document.getElementById('header-phone-link') as HTMLAnchorElement | null;
        if (headerPhoneLink) headerPhoneLink.href = config.telephone.link;

        const headerPhoneLabel = document.getElementById('header-phone-label');
        if (headerPhoneLabel) headerPhoneLabel.textContent = config.telephone.label;

        const headerPhoneLabelMobile = document.getElementById('header-phone-label-mobile');
        if (headerPhoneLabelMobile) headerPhoneLabelMobile.textContent = config.telephone.label;
    }

    // Home
    const linkKeys = document.getElementById('link-gestion-cles') as HTMLAnchorElement | null;
    if (linkKeys) linkKeys.href = config.home.gestionClesUrl;

    const linkKms = document.getElementById('link-declaration-kms') as HTMLAnchorElement | null;
    if (linkKms) linkKms.href = config.home.declarationKmsUrl;

    // Remuneration
    const mutuelleName = document.getElementById('remun-mutuelle-name');
    if (mutuelleName) mutuelleName.textContent = config.remuneration.mutuelleName;

    const mutuellePrice = document.getElementById('remun-mutuelle-price');
    if (mutuellePrice) mutuellePrice.textContent = config.remuneration.mutuellePrice;

    const mutuellePortail = document.getElementById('link-portail-mutuelle') as HTMLAnchorElement | null;
    if (mutuellePortail) mutuellePortail.href = config.remuneration.mutuellePortailUrl;

    // Update Simulator Link with agency param
    const btnSimulator = document.getElementById('btn-simulator') as HTMLAnchorElement | null;
    if (btnSimulator) btnSimulator.href = 'simulateur.html?agence=' + agencyId;

    // Docs - Medecine
    const medAddress = document.getElementById('doc-medecine-address');
    if (medAddress) medAddress.textContent = config.docs.medecineTravail.address;

    const medPhone = document.getElementById('doc-medecine-phone') as HTMLAnchorElement | null;
    if (medPhone) {
        medPhone.href = config.docs.medecineTravail.phoneLink;
        medPhone.textContent = config.docs.medecineTravail.phoneDisplay;
    }

    // Docs - Links
    const docIds: Record<string, string> = {
        'doc-link-avantages': config.docs.links.avantages,
        'doc-link-conges': config.docs.links.conges,
        'doc-link-due-sante': config.docs.links.dueSante,
        'doc-link-garantie-sante': config.docs.links.garantieSante,
        'doc-link-due-interessement': config.docs.links.dueInteressement,
        'doc-link-accord-temps': config.docs.links.accordTemps,
        'doc-link-prevoyance': config.docs.links.prevoyance
    };

    for (const [id, url] of Object.entries(docIds)) {
        const el = document.getElementById(id) as HTMLAnchorElement | null;
        if (el) el.href = url;
    }

    // Contacts
    const agPhone = document.getElementById('contact-agency-phone') as HTMLAnchorElement | null;
    const agPhoneText = document.getElementById('contact-agency-phone-text');

    if (agPhone) {
        agPhone.href = config.contacts.agence.phoneLink;
        if (!agPhoneText) {
            agPhone.textContent = config.contacts.agence.phoneDisplay;
        }
    }
    if (agPhoneText) {
        agPhoneText.textContent = config.contacts.agence.phoneDisplay;
    }

    const agAddrLink = document.getElementById('contact-agency-address-link') as HTMLAnchorElement | null;
    if (agAddrLink) agAddrLink.href = config.contacts.agence.addressLink;

    const agAddrText = document.getElementById('contact-agency-address-text');
    if (agAddrText) agAddrText.textContent = config.contacts.agence.address;

    const agEmailLink = document.getElementById('contact-agency-email-link') as HTMLAnchorElement | null;
    if (agEmailLink) agEmailLink.href = "mailto:" + config.contacts.agence.email;

    const agEmailText = document.getElementById('contact-agency-email-text');
    if (agEmailText) agEmailText.textContent = config.contacts.agence.email;

    // Grille salariale (depuis GRILLE_SALARIALE)
    const g = GRILLE_SALARIALE;
    const fmt = (v: number): string => v.toFixed(2).replace('.', ',') + ' €';
    const fmtBonus = (v: number): string => '+ ' + v.toFixed(2).replace('.', ',') + ' €';

    const prices: Record<string, string> = {
        'price-am2': fmt(g.smicHoraire),
        'price-am2-confirme': fmtBonus(g.bonusConfirme),
        'price-am2-expert': fmtBonus(g.bonusExpert),
        'price-am2-referent': fmtBonus(g.bonusReferent),
        'price-ge2': fmt(g.smicHoraire),
        'price-ge3': fmt(g.tauxGE3),
        'price-ge3-confirme': fmtBonus(g.bonusConfirme),
        'price-ge3-expert': fmtBonus(g.bonusExpert),
        'price-av2': fmt(g.smicHoraire),
        'price-av3': fmt(g.tauxAV3),
        'price-av3-confirme': fmtBonus(g.bonusConfirme),
        'price-av3-expert': fmtBonus(g.bonusExpert),
        'price-av3-referent': fmtBonus(g.bonusReferent)
    };

    for (const [id, text] of Object.entries(prices)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // Injection des valeurs dynamiques depuis GRILLE_SALARIALE
    const dynamicValues: Record<string, string> = {
        'val-taux-km': g.kmRate + ' €',
        'val-prime-carburant': g.primeCarburantMax + ' €',
        'val-ticket': g.ticketValue + ' €',
        'val-cheques-cadeaux': g.chequesCadeaux + ' €',
        'val-cheques-vacances': g.chequesVacancesTotal + ' €',
        'val-parrainage-client': g.parrainageClient + ' €',
        'val-parrainage-intervenant': g.parrainageIntervenant + ' €',
        'val-ticket-employer': String(g.ticketValue - g.ticketEmployeeShare),
        'val-ticket-employee': String(g.ticketEmployeeShare),
        'val-prime-carburant-30h': String(Math.round((30 * g.primeCarburantMax) / 35)),
        'val-prime-carburant-25h': String(Math.round((25 * g.primeCarburantMax) / 35)),
    };
    for (const [id, text] of Object.entries(dynamicValues)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}
