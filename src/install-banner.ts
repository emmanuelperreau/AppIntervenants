import { createIcons, APP_ICONS } from './icons';

// Interface BeforeInstallPromptEvent (absente de lib.dom.d.ts)
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Extension Navigator pour la detection standalone iOS
interface NavigatorStandalone extends Navigator {
    standalone?: boolean;
}

// Cles et durees de suppression du banner
const DISMISS_KEY = 'install_banner_dismissed' as const;
const DISMISS_DAYS = 7 as const;

// Verification si deja installe
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as NavigatorStandalone).standalone === true;

// Detection mobile (iOS ou Android uniquement)
const isMobile = /iPad|iPhone|iPod|android/i.test(navigator.userAgent);

// Verification si le banner a ete ferme recemment (7 jours)
function wasDismissedRecently(): boolean {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) return false;
    // QUICK-WIN #1 : parseInt avec radix explicite
    const days = (Date.now() - parseInt(dismissed, 10)) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
}

export function initInstallBanner(): void {
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    const installBanner = document.getElementById('install-banner');
    const installBtnNative = document.getElementById('install-btn-native');
    const installSteps = document.getElementById('install-steps');

    // Capture beforeinstallprompt (mobile uniquement)
    window.addEventListener('beforeinstallprompt', ((e: Event) => {
        e.preventDefault();
        deferredPrompt = e as BeforeInstallPromptEvent;
        if (isMobile && !isStandalone && !wasDismissedRecently()) {
            if (installBtnNative) installBtnNative.classList.remove('hidden');
            if (installBanner) installBanner.classList.remove('hidden');
            createIcons({ icons: APP_ICONS, attrs: { 'aria-hidden': 'true' } });
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
    if (isMobile && !isStandalone && !wasDismissedRecently()) {
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
                    createIcons({ icons: APP_ICONS, attrs: { 'aria-hidden': 'true' } });
                } else if (/android/i.test(userAgent)) {
                    if (step1) step1.innerHTML = "Appuyez sur <strong>Menu</strong> <i data-lucide='ellipsis-vertical' class='inline w-3.5 h-3.5'></i> (les 3 points en haut)";
                    if (step2) step2.innerHTML = "Puis <strong>Ajouter a l'ecran d'accueil</strong>";
                    if (installSteps) installSteps.classList.remove('hidden');
                    installBanner.classList.remove('hidden');
                    createIcons({ icons: APP_ICONS, attrs: { 'aria-hidden': 'true' } });
                }
            }
        }, 3000);
    }

    // Fermer le banner d'installation
    window.dismissInstall = function(): void {
        if (installBanner) installBanner.classList.add('hidden');
        // QUICK-WIN #2 : try-catch pour quota/incognito
        try {
            localStorage.setItem(DISMISS_KEY, Date.now().toString());
        } catch { /* quota/incognito */ }
    };

    // Boutons de la banniere (event listeners non-inline pour CSP)
    installBtnNative?.addEventListener('click', () => window.installPWA());
    document.getElementById('dismiss-install-text')?.addEventListener('click', () => window.dismissInstall());
    document.getElementById('dismiss-install-x')?.addEventListener('click', () => window.dismissInstall());
}
