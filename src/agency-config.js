// agency-config.js — Application de la configuration agence au DOM
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config.js';

export function applyConfig() {
    const params = new URLSearchParams(window.location.search);
    const agencyId = params.get('agence') || 'nord-touraine';
    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];
    if (!config) return;

    // Header
    const headerName = document.getElementById('header-agency-name');
    if (headerName) headerName.textContent = config.name;

    if (config.telephone) {
        const headerPhoneLink = /** @type {HTMLAnchorElement|null} */ (document.getElementById('header-phone-link'));
        if (headerPhoneLink) headerPhoneLink.href = config.telephone.link;

        const headerPhoneLabel = document.getElementById('header-phone-label');
        if (headerPhoneLabel) headerPhoneLabel.textContent = config.telephone.label;

        const headerPhoneLabelMobile = document.getElementById('header-phone-label-mobile');
        if (headerPhoneLabelMobile) headerPhoneLabelMobile.textContent = config.telephone.label;
    }

    // Home
    const linkKeys = /** @type {HTMLAnchorElement|null} */ (document.getElementById('link-gestion-cles'));
    if (linkKeys) linkKeys.href = config.home.gestionClesUrl;

    const linkKms = /** @type {HTMLAnchorElement|null} */ (document.getElementById('link-declaration-kms'));
    if (linkKms) linkKms.href = config.home.declarationKmsUrl;

    // Rémunération
    const mutuelleName = document.getElementById('remun-mutuelle-name');
    if (mutuelleName) mutuelleName.textContent = config.remuneration.mutuelleName;

    const mutuellePrice = document.getElementById('remun-mutuelle-price');
    if (mutuellePrice) mutuellePrice.textContent = config.remuneration.mutuellePrice;

    const mutuellePortail = /** @type {HTMLAnchorElement|null} */ (document.getElementById('link-portail-mutuelle'));
    if (mutuellePortail) mutuellePortail.href = config.remuneration.mutuellePortailUrl;

    // Lien simulateur (avec param agence)
    const btnSimulator = /** @type {HTMLAnchorElement|null} */ (document.getElementById('btn-simulator'));
    if (btnSimulator) btnSimulator.href = './simulateur.html?agence=' + agencyId;

    // Docs — médecine du travail
    const medAddress = document.getElementById('doc-medecine-address');
    if (medAddress) medAddress.textContent = config.docs.medecineTravail.address;

    const medPhone = /** @type {HTMLAnchorElement|null} */ (document.getElementById('doc-medecine-phone'));
    if (medPhone) {
        medPhone.href = config.docs.medecineTravail.phoneLink;
        medPhone.textContent = config.docs.medecineTravail.phoneDisplay;
    }

    // Docs — liens dynamiques
    const docIds = {
        'doc-link-avantages':        config.docs.links.avantages,
        'doc-link-conges':           config.docs.links.conges,
        'doc-link-due-sante':        config.docs.links.dueSante,
        'doc-link-garantie-sante':   config.docs.links.garantieSante,
        'doc-link-due-interessement': config.docs.links.dueInteressement,
        'doc-link-accord-temps':     config.docs.links.accordTemps,
        'doc-link-prevoyance':       config.docs.links.prevoyance,
    };
    for (const [id, url] of Object.entries(docIds)) {
        const el = /** @type {HTMLAnchorElement|null} */ (document.getElementById(id));
        if (el) el.href = url;
    }

    // Contacts
    const agPhone = /** @type {HTMLAnchorElement|null} */ (document.getElementById('contact-agency-phone'));
    const agPhoneText = document.getElementById('contact-agency-phone-text');
    if (agPhone) {
        agPhone.href = config.contacts.agence.phoneLink;
        if (!agPhoneText) agPhone.textContent = config.contacts.agence.phoneDisplay;
    }
    if (agPhoneText) agPhoneText.textContent = config.contacts.agence.phoneDisplay;

    const agAddrLink = /** @type {HTMLAnchorElement|null} */ (document.getElementById('contact-agency-address-link'));
    if (agAddrLink) agAddrLink.href = config.contacts.agence.addressLink;

    const agAddrText = document.getElementById('contact-agency-address-text');
    if (agAddrText) agAddrText.textContent = config.contacts.agence.address;

    const agEmailLink = /** @type {HTMLAnchorElement|null} */ (document.getElementById('contact-agency-email-link'));
    if (agEmailLink) agEmailLink.href = 'mailto:' + config.contacts.agence.email;

    const agEmailText = document.getElementById('contact-agency-email-text');
    if (agEmailText) agEmailText.textContent = config.contacts.agence.email;

    // Grille salariale
    const g = GRILLE_SALARIALE;
    /** @param {number} v */
    const fmt = v => v.toFixed(2).replace('.', ',') + ' €';
    /** @param {number} v */
    const fmtBonus = v => '+ ' + v.toFixed(2).replace('.', ',') + ' €';

    const prices = {
        'price-am2':          fmt(g.smicHoraire),
        'price-am2-confirme': fmtBonus(g.bonusConfirme),
        'price-am2-expert':   fmtBonus(g.bonusExpert),
        'price-am2-referent': fmtBonus(g.bonusReferent),
        'price-ge2':          fmt(g.smicHoraire),
        'price-ge3':          fmt(g.tauxGE3),
        'price-ge3-confirme': fmtBonus(g.bonusConfirme),
        'price-ge3-expert':   fmtBonus(g.bonusExpert),
        'price-av2':          fmt(g.smicHoraire),
        'price-av3':          fmt(g.tauxAV3),
        'price-av3-confirme': fmtBonus(g.bonusConfirme),
        'price-av3-expert':   fmtBonus(g.bonusExpert),
        'price-av3-referent': fmtBonus(g.bonusReferent),
    };
    for (const [id, text] of Object.entries(prices)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // Valeurs dynamiques depuis GRILLE_SALARIALE
    const dynamicValues = {
        'val-taux-km':              g.kmRate + ' €',
        'val-prime-carburant':      g.primeCarburantMax + ' €',
        'val-ticket':               g.ticketValue + ' €',
        'val-cheques-cadeaux':      g.chequesCadeaux + ' €',
        'val-cheques-vacances':     g.chequesVacancesTotal + ' €',
        'val-parrainage-client':    g.parrainageClient + ' €',
        'val-parrainage-intervenant': g.parrainageIntervenant + ' €',
        'val-ticket-employer':      String(g.ticketValue - g.ticketEmployeeShare),
        'val-ticket-employee':      String(g.ticketEmployeeShare),
        'val-prime-carburant-30h':  String(Math.round((30 * g.primeCarburantMax) / 35)),
        'val-prime-carburant-25h':  String(Math.round((25 * g.primeCarburantMax) / 35)),
    };
    for (const [id, text] of Object.entries(dynamicValues)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }
}
