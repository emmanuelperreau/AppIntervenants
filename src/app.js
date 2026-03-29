// Styles (traités par Vite + Tailwind)
import './styles.css';

// Lucide Icons (auto-hébergées via npm)
import { createIcons, Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical } from 'lucide';

// Config agence (module ES)
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config.js';

// Contenu RH externalisé
import { OBLIGATIONS, DOCUMENTS } from './content.js';

// Map des icônes pour createIcons()
const icons = { Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical };

// Génération dynamique des obligations
function renderObligations() {
    const container = document.getElementById('obligations-grid');
    if (!container) return;

    container.innerHTML = OBLIGATIONS.map(ob => {
        const iconHtml = ob.overlayIcon
            ? `<div class="relative"><i data-lucide="${ob.icon}" class="w-8 h-8 ${ob.iconClass}"></i><i data-lucide="${ob.overlayIcon}" class="w-4 h-4 ${ob.overlayClass} absolute -top-1 -right-1 bg-white dark:bg-slate-700 rounded-full"></i></div>`
            : `<i data-lucide="${ob.icon}" class="w-8 h-8 ${ob.iconClass}"></i>`;

        const textContent = ob.html
            ? `<div class="text-xs font-medium ${ob.textClass} leading-snug">${ob.html}</div>`
            : `<p class="text-xs font-medium ${ob.textClass} leading-snug">${ob.text}</p>`;

        return `<div class="p-4 bg-white dark:bg-slate-700 rounded-xl border-2 ${ob.borderClass} flex flex-col items-center text-center gap-3">${iconHtml}${textContent}</div>`;
    }).join('');
}

// Génération dynamique des liens documents
function renderDocuments() {
    const container = document.getElementById('documents-grid');
    if (!container) return;

    container.innerHTML = DOCUMENTS.map(doc => {
        const idAttr = doc.id ? ` id="${doc.id}"` : '';

        return `<a href="${doc.url}"${idAttr} target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 ${doc.hoverClass} transition-all group h-32">
                     <div class="${doc.iconBgClass} p-3 rounded-full ${doc.iconTextClass} group-hover:scale-110 transition-transform">
                         <i data-lucide="${doc.icon}" class="w-6 h-6"></i>
                     </div>
                     <h3 class="font-bold text-xs text-slate-800 dark:text-white leading-tight ${doc.hoverTextClass}">${doc.title}</h3>
                 </a>`;
    }).join('');
}

// Rendre le contenu dynamique
renderObligations();
renderDocuments();

// Initialiser les icones Lucide
createIcons({ icons });

// Application de la configuration agence
function applyConfig() {
    if(typeof AGENCY_CONFIGS === 'undefined' || !AGENCY_CONFIGS) return;

    // 1. Detecter l'agence via l'URL (ex: ?agence=loches)
    const params = new URLSearchParams(window.location.search);
    const agencyId = params.get('agence') || 'nord-touraine'; // 'nord-touraine' par defaut

    // 2. Selectionner la config
    const config = AGENCY_CONFIGS[agencyId] || AGENCY_CONFIGS['nord-touraine'];

    if (!config) return;

    // Header
    const headerName = document.getElementById('header-agency-name');
    if(headerName) headerName.textContent = config.name;

    // Header - Telephone rapide (depuis config.telephone)
    if(config.telephone) {
        const headerPhoneLink = document.getElementById('header-phone-link');
        if(headerPhoneLink) headerPhoneLink.href = config.telephone.link;

        const headerPhoneLabel = document.getElementById('header-phone-label');
        if(headerPhoneLabel) headerPhoneLabel.textContent = config.telephone.label;

        const headerPhoneLabelMobile = document.getElementById('header-phone-label-mobile');
        if(headerPhoneLabelMobile) headerPhoneLabelMobile.textContent = config.telephone.label;
    }

    // Home
    const linkKeys = document.getElementById('link-gestion-cles');
    if(linkKeys) linkKeys.href = config.home.gestionClesUrl;

    const linkKms = document.getElementById('link-declaration-kms');
    if(linkKms) linkKms.href = config.home.declarationKmsUrl;

    // Remuneration
    const mutuelleName = document.getElementById('remun-mutuelle-name');
    if(mutuelleName) mutuelleName.textContent = config.remuneration.mutuelleName;

    const mutuellePrice = document.getElementById('remun-mutuelle-price');
    if(mutuellePrice) mutuellePrice.textContent = config.remuneration.mutuellePrice;

    // Update Simulator Link with agency param
    const btnSimulator = document.getElementById('btn-simulator');
    if(btnSimulator) btnSimulator.href = 'simulateur.html?agence=' + agencyId;

    // Docs - Medecine
    const medAddress = document.getElementById('doc-medecine-address');
    if(medAddress) medAddress.textContent = config.docs.medecineTravail.address;

    const medPhone = document.getElementById('doc-medecine-phone');
    if(medPhone) {
        medPhone.href = config.docs.medecineTravail.phoneLink;
        medPhone.textContent = config.docs.medecineTravail.phoneDisplay;
    }

    // Docs - Links
    const docIds = {
        'doc-link-avantages': config.docs.links.avantages,
        'doc-link-conges': config.docs.links.conges,
        'doc-link-due-sante': config.docs.links.dueSante,
        'doc-link-garantie-sante': config.docs.links.garantieSante,
        'doc-link-due-interessement': config.docs.links.dueInteressement,
        'doc-link-accord-temps': config.docs.links.accordTemps
    };

    for(const [id, url] of Object.entries(docIds)) {
        const el = document.getElementById(id);
        if(el) el.href = url;
    }

    // Contacts
    const agPhone = document.getElementById('contact-agency-phone');
    const agPhoneText = document.getElementById('contact-agency-phone-text');

    if(agPhone) {
        agPhone.href = config.contacts.agence.phoneLink;
        if (!agPhoneText) {
             agPhone.textContent = config.contacts.agence.phoneDisplay;
        }
    }
    if(agPhoneText) {
        agPhoneText.textContent = config.contacts.agence.phoneDisplay;
    }

    const agAddrLink = document.getElementById('contact-agency-address-link');
    if(agAddrLink) agAddrLink.href = config.contacts.agence.addressLink;

    const agAddrText = document.getElementById('contact-agency-address-text');
    if(agAddrText) agAddrText.textContent = config.contacts.agence.address;

    const agEmailLink = document.getElementById('contact-agency-email-link');
    if(agEmailLink) agEmailLink.href = "mailto:" + config.contacts.agence.email;

    const agEmailText = document.getElementById('contact-agency-email-text');
    if(agEmailText) agEmailText.textContent = config.contacts.agence.email;

    // Grille salariale (depuis GRILLE_SALARIALE)
    if(typeof GRILLE_SALARIALE !== 'undefined' && GRILLE_SALARIALE) {
        const g = GRILLE_SALARIALE;
        const fmt = (v) => v.toFixed(2).replace('.', ',') + ' \u20ac';
        const fmtBonus = (v) => '+ ' + v.toFixed(2).replace('.', ',') + ' \u20ac';

        const prices = {
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

        for(const [id, text] of Object.entries(prices)) {
            const el = document.getElementById(id);
            if(el) el.textContent = text;
        }
    }
}

// Appliquer la config
applyConfig();


// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
                // Verification des mises a jour
                registration.update();
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// Install Banner Logic
let deferredPrompt = null;
const installBanner = document.getElementById('install-banner');
const installBtnNative = document.getElementById('install-btn-native');
const installSteps = document.getElementById('install-steps');

// Verification si deja installe
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

// Verification si le banner a ete ferme recemment (7 jours)
const DISMISS_KEY = 'install_banner_dismissed';
const DISMISS_DAYS = 7;
function wasDismissedRecently() {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) return false;
    const days = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
}

// Capture beforeinstallprompt (Android Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Si pas deja installe et pas dismiss recent, montrer le bouton natif
    if (!isStandalone && !wasDismissedRecently()) {
        installBtnNative.classList.remove('hidden');
        installBanner.classList.remove('hidden');
        createIcons({ icons });
    }
});

// Bouton installer natif (Android)
window.installPWA = function() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            installBanner.classList.add('hidden');
        }
        deferredPrompt = null;
    });
};

// Fallback : instructions manuelles si pas de beforeinstallprompt apres 3s
if (!isStandalone && !wasDismissedRecently()) {
    setTimeout(() => {
        // Si le banner natif n'est pas deja affiche
        if (installBanner.classList.contains('hidden')) {
            const userAgent = navigator.userAgent || navigator.vendor;
            const step1 = document.getElementById('install-step1');
            const step2 = document.getElementById('install-step2');

            if (/iPad|iPhone|iPod/.test(userAgent)) {
                step1.innerHTML = "Appuyez sur <strong>Partager</strong> <i data-lucide='share' class='inline w-3.5 h-3.5'></i> (en bas de l'ecran)";
                step2.innerHTML = "Puis <strong>Sur l'ecran d'accueil</strong> <i data-lucide='plus-square' class='inline w-3.5 h-3.5'></i>";
                installSteps.classList.remove('hidden');
                installBanner.classList.remove('hidden');
                createIcons({ icons });
            } else if (/android/i.test(userAgent)) {
                step1.innerHTML = "Appuyez sur <strong>Menu</strong> <i data-lucide='ellipsis-vertical' class='inline w-3.5 h-3.5'></i> (les 3 points en haut)";
                step2.innerHTML = "Puis <strong>Ajouter a l'ecran d'accueil</strong>";
                installSteps.classList.remove('hidden');
                installBanner.classList.remove('hidden');
                createIcons({ icons });
            }
        }
    }, 3000);
}

// Fermer le banner d'installation
window.dismissInstall = function() {
    installBanner.classList.add('hidden');
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
};

// Navigation par onglets
window.switchTab = function(tabName) {
    // Masquer tous les onglets
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('fade-in');
    });
    // Afficher l'onglet cible
    const target = document.getElementById('tab-' + tabName);
    if(target) {
        target.classList.add('active');
        void target.offsetWidth; // Force reflow
        target.classList.add('fade-in');
    } else {
        console.error('Tab not found:', tabName);
    }

    // Mise a jour des etats ARIA
    document.querySelectorAll('[role="tab"]').forEach(el => el.setAttribute('aria-selected', 'false'));
    const activeTab = document.getElementById('btn-' + tabName);
    if(activeTab) activeTab.setAttribute('aria-selected', 'true');

    // Mise a jour de l'etat de navigation
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('active', 'text-[#11183b]');
        if(el.id !== 'btn-keys') {
           el.classList.add('text-slate-400');
        } else {
           // Garder le bleu pour Contacts
           el.classList.add('text-blue-500');
        }
    });
    const btn = document.getElementById('btn-' + tabName);
    if(btn) {
        btn.classList.add('active');
        if(btn.id !== 'btn-keys') {
            btn.classList.add('text-[#11183b]');
            btn.classList.remove('text-slate-400');
        }
    }

    // Remonter en haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Navigation clavier onglets (ARIA tabs pattern)
(function() {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;
    const tabNames = ['home', 'daily', 'money', 'docs', 'keys'];
    tabList.addEventListener('keydown', function(e) {
        const current = tabNames.findIndex(function(name) {
            var btn = document.getElementById('btn-' + name);
            return btn && btn.getAttribute('aria-selected') === 'true';
        });
        if (current === -1) return;
        var next = current;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % tabNames.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + tabNames.length) % tabNames.length;
        if (next !== current) {
            e.preventDefault();
            switchTab(tabNames[next]);
            var btn = document.getElementById('btn-' + tabNames[next]);
            if (btn) btn.focus();
        }
    });
})();

// AUTO-RELOAD POUR WEBAPP
let lastVisibilityChange = Date.now();
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        const now = Date.now();
        // Si l'app est masquee depuis > 10 min (600000ms), forcer le rechargement
        if (now - lastVisibilityChange > 600000) {
            // Forcer la verification de mise a jour du SW
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.update();
                });
            }
            window.location.reload();
        }
        lastVisibilityChange = now;
    } else {
        lastVisibilityChange = Date.now();
    }
});
