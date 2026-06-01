// install-banner.js — Bannière d'installation PWA
import { icon } from './icons.js';

const DISMISS_KEY = 'install_banner_dismissed';
const DISMISS_DAYS = 7;

const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || /** @type {any} */ (navigator).standalone === true;

const isMobile = /iPad|iPhone|iPod|android/i.test(navigator.userAgent);

function wasDismissedRecently() {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) return false;
    const days = (Date.now() - parseInt(dismissed, 10)) / (1000 * 60 * 60 * 24);
    return days < DISMISS_DAYS;
}

export function initInstallBanner() {
    /** @type {any} */
    let deferredPrompt = null;
    const installBanner = document.getElementById('install-banner');
    const installBtnNative = document.getElementById('install-btn-native');
    const installSteps = document.getElementById('install-steps');

    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredPrompt = e;
        if (isMobile && !isStandalone && !wasDismissedRecently()) {
            if (installBtnNative) installBtnNative.classList.remove('hidden');
            if (installBanner)   installBanner.classList.add('visible');
        }
    });

    /** @type {any} */ (window).installPWA = function () {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((/** @type {any} */ choice) => {
            if (choice.outcome === 'accepted') {
                if (installBanner) installBanner.classList.remove('visible');
            }
            deferredPrompt = null;
        });
    };

    // Fallback : instructions manuelles si pas de beforeinstallprompt après 3s
    if (isMobile && !isStandalone && !wasDismissedRecently()) {
        setTimeout(() => {
            if (installBanner && !installBanner.classList.contains('visible')) {
                const ua = navigator.userAgent;
                const step1 = document.getElementById('install-step1');
                const step2 = document.getElementById('install-step2');

                if (/iPad|iPhone|iPod/.test(ua)) {
                    if (step1) step1.innerHTML = `Appuyez sur <strong>Partager</strong> ${icon('share', '', '14', '14')} (en bas de l'écran)`;
                    if (step2) step2.innerHTML = `Puis <strong>Sur l'écran d'accueil</strong> ${icon('plus-square', '', '14', '14')}`;
                    if (installSteps) installSteps.classList.add('visible');
                    installBanner.classList.add('visible');
                } else if (/android/i.test(ua)) {
                    if (step1) step1.innerHTML = `Appuyez sur <strong>Menu</strong> ${icon('ellipsis-vertical', '', '14', '14')} (les 3 points en haut)`;
                    if (step2) step2.innerHTML = `Puis <strong>Ajouter à l'écran d'accueil</strong>`;
                    if (installSteps) installSteps.classList.add('visible');
                    installBanner.classList.add('visible');
                }
            }
        }, 3000);
    }

    /** @type {any} */ (window).dismissInstall = function () {
        if (installBanner) installBanner.classList.remove('visible');
        try { localStorage.setItem(DISMISS_KEY, Date.now().toString()); } catch { /* quota/incognito */ }
    };

    document.getElementById('install-btn-native')?.addEventListener('click', () => /** @type {any} */ (window).installPWA());
    document.getElementById('dismiss-install-text')?.addEventListener('click', () => /** @type {any} */ (window).dismissInstall());
    document.getElementById('dismiss-install-x')?.addEventListener('click', () => /** @type {any} */ (window).dismissInstall());
}
