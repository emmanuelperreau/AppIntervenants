// Styles (traites par Vite + Tailwind)
import './styles.css';

// Lucide Icons (auto-hebergees via npm)
import { createIcons, Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical } from 'lucide';

// Config agence (module ES)
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config';

// Contenu RH externalise
import { OBLIGATIONS, DOCUMENTS } from './content';

// Declaration des fonctions globales sur window
declare global {
    interface Window {
        switchTab: (tabName: string) => void;
        installPWA: () => void;
        dismissInstall: () => void;
    }
}

// Extend Navigator for iOS standalone detection
interface NavigatorStandalone extends Navigator {
    standalone?: boolean;
}

// Map des icones pour createIcons()
const icons = { Phone, Smartphone, Download, X, Key, Car, Palmtree, Lock, Quote, HeartHandshake, Target, Award, Users, Sun, CalendarClock, Calculator, ChevronRight, Euro, Sparkles, Crown, TrendingUp, Utensils, CheckCircle, Gift, CalendarDays, Info, PhoneCall, QrCode, HardHat, BookOpen, Footprints, Shirt, ShieldCheck, Ban, XCircle, AlignStartVertical, Weight, Briefcase, Clock, ClipboardList, MessageCircle, EyeOff, Heart, Ear, Headset, AlertOctagon, ArrowLeftRight, FileEdit, CigaretteOff, Baby, Scale, Gem, Stethoscope, Coins, Timer, Shield, ShieldAlert, Building2, MapPin, Mail, DoorClosed, AlertTriangle, Ambulance, HeartPulse, Home, CalendarCheck, FileText, Share, PlusSquare, EllipsisVertical };

// Generation dynamique des obligations
function renderObligations(): void {
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

// Generation dynamique des liens documents
function renderDocuments(): void {
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
function applyConfig(): void {
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
        'doc-link-accord-temps': config.docs.links.accordTemps
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
    const fmt = (v: number): string => v.toFixed(2).replace('.', ',') + ' \u20ac';
    const fmtBonus = (v: number): string => '+ ' + v.toFixed(2).replace('.', ',') + ' \u20ac';

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
        'val-taux-km': g.kmRate + ' \u20ac',
        'val-prime-carburant': g.primeCarburantMax + ' \u20ac',
        'val-ticket': g.ticketValue + ' \u20ac',
        'val-cheques-cadeaux': g.chequesCadeaux + ' \u20ac',
        'val-cheques-vacances': g.chequesVacancesTotal + ' \u20ac',
        'val-parrainage-client': g.parrainageClient + ' \u20ac',
        'val-parrainage-intervenant': g.parrainageIntervenant + ' \u20ac',
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

// Appliquer la config
applyConfig();


// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/AppIntervenants/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
                registration.update();
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// Install Banner Logic
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const installBanner = document.getElementById('install-banner');
const installBtnNative = document.getElementById('install-btn-native');
const installSteps = document.getElementById('install-steps');

// BeforeInstallPromptEvent interface (not in lib.dom.d.ts)
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Verification si deja installe
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as NavigatorStandalone).standalone === true;

// Verification si le banner a ete ferme recemment (7 jours)
const DISMISS_KEY = 'install_banner_dismissed' as const;
const DISMISS_DAYS = 7 as const;
function wasDismissedRecently(): boolean {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) return false;
    const days = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
}

// Capture beforeinstallprompt (Android Chrome)
window.addEventListener('beforeinstallprompt', ((e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    if (!isStandalone && !wasDismissedRecently()) {
        if (installBtnNative) installBtnNative.classList.remove('hidden');
        if (installBanner) installBanner.classList.remove('hidden');
        createIcons({ icons });
    }
}) as EventListener);

// Bouton installer natif (Android)
window.installPWA = function(): void {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            if (installBanner) installBanner.classList.add('hidden');
        }
        deferredPrompt = null;
    });
};

// Fallback : instructions manuelles si pas de beforeinstallprompt apres 3s
if (!isStandalone && !wasDismissedRecently()) {
    setTimeout(() => {
        if (installBanner && installBanner.classList.contains('hidden')) {
            const userAgent = navigator.userAgent || (navigator as NavigatorStandalone & { vendor?: string }).vendor || '';
            const step1 = document.getElementById('install-step1');
            const step2 = document.getElementById('install-step2');

            if (/iPad|iPhone|iPod/.test(userAgent)) {
                if (step1) step1.innerHTML = "Appuyez sur <strong>Partager</strong> <i data-lucide='share' class='inline w-3.5 h-3.5'></i> (en bas de l'ecran)";
                if (step2) step2.innerHTML = "Puis <strong>Sur l'ecran d'accueil</strong> <i data-lucide='plus-square' class='inline w-3.5 h-3.5'></i>";
                if (installSteps) installSteps.classList.remove('hidden');
                installBanner.classList.remove('hidden');
                createIcons({ icons });
            } else if (/android/i.test(userAgent)) {
                if (step1) step1.innerHTML = "Appuyez sur <strong>Menu</strong> <i data-lucide='ellipsis-vertical' class='inline w-3.5 h-3.5'></i> (les 3 points en haut)";
                if (step2) step2.innerHTML = "Puis <strong>Ajouter a l'ecran d'accueil</strong>";
                if (installSteps) installSteps.classList.remove('hidden');
                installBanner.classList.remove('hidden');
                createIcons({ icons });
            }
        }
    }, 3000);
}

// Fermer le banner d'installation
window.dismissInstall = function(): void {
    if (installBanner) installBanner.classList.add('hidden');
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
};

// Navigation par onglets
window.switchTab = function(tabName: string): void {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('fade-in');
    });
    const target = document.getElementById('tab-' + tabName);
    if (target) {
        target.classList.add('active');
        void target.offsetWidth; // Force reflow
        target.classList.add('fade-in');
    } else {
        console.error('Tab not found:', tabName);
    }

    document.querySelectorAll('[role="tab"]').forEach(el => el.setAttribute('aria-selected', 'false'));
    const activeTab = document.getElementById('btn-' + tabName);
    if (activeTab) activeTab.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.nav-btn').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.classList.remove('active', 'text-[#11183b]');
        if (!htmlEl.dataset.color) {
            htmlEl.classList.add('text-slate-500');
        } else {
            htmlEl.classList.add('text-' + htmlEl.dataset.color + '-500');
        }
    });
    const btn = document.getElementById('btn-' + tabName) as HTMLElement | null;
    if (btn) {
        btn.classList.add('active');
        if (btn.dataset.color) {
            btn.classList.remove('text-' + btn.dataset.color + '-500');
        } else {
            btn.classList.add('text-[#11183b]');
            btn.classList.remove('text-slate-500');
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Attacher les event listeners (remplace les onclick inline pour compatibilité CSP)
const tabButtons: Record<string, string> = {
    'btn-home': 'home',
    'btn-daily': 'daily',
    'btn-money': 'money',
    'btn-docs': 'docs',
    'btn-keys': 'keys',
};
for (const [id, tab] of Object.entries(tabButtons)) {
    document.getElementById(id)?.addEventListener('click', () => window.switchTab(tab));
}

// Install banner buttons
installBtnNative?.addEventListener('click', () => window.installPWA());
document.getElementById('dismiss-install-text')?.addEventListener('click', () => window.dismissInstall());
document.getElementById('dismiss-install-x')?.addEventListener('click', () => window.dismissInstall());

// Navigation clavier onglets (ARIA tabs pattern)
(function(): void {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;
    const tabNames = ['home', 'daily', 'money', 'docs', 'keys'] as const;
    tabList.addEventListener('keydown', function(e: Event) {
        const keyEvent = e as KeyboardEvent;
        const current = tabNames.findIndex(function(name) {
            const btn = document.getElementById('btn-' + name);
            return btn && btn.getAttribute('aria-selected') === 'true';
        });
        if (current === -1) return;
        let next = current;
        if (keyEvent.key === 'ArrowRight' || keyEvent.key === 'ArrowDown') next = (current + 1) % tabNames.length;
        if (keyEvent.key === 'ArrowLeft' || keyEvent.key === 'ArrowUp') next = (current - 1 + tabNames.length) % tabNames.length;
        if (next !== current) {
            keyEvent.preventDefault();
            window.switchTab(tabNames[next]);
            const btn = document.getElementById('btn-' + tabNames[next]);
            if (btn) btn.focus();
        }
    });
})();

// AUTO-RELOAD POUR WEBAPP
let lastVisibilityChange = Date.now();
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        const now = Date.now();
        if (now - lastVisibilityChange > 600000) {
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
