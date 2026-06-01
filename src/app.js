// app.js — Point d'entrée principal (Vanilla JS, ordre d'init critique)
import { injectTemplates } from './templates/inject.js';
import { renderObligations, renderDocuments } from './render-content.js';
import { initIcons } from './icons.js';
import { applyConfig } from './agency-config.js';
import { initTabs } from './tabs.js';
import { initInstallBanner } from './install-banner.js';
import { initSalaryFilter } from './salary-filter.js';
import { initAutoReload } from './auto-reload.js';
import { registerServiceWorker } from './sw-register.js';

// Séquence d'initialisation asynchrone (inject est async car fetch)
async function init() {
    // 1. Injecter les partiels HTML (fetch) — doit précéder tout rendu DOM
    await injectTemplates();

    // 2. Générer le contenu dynamique dans les partiels injectés
    renderObligations();
    renderDocuments();

    // 3. Remplacer les éventuels data-lucide résiduels (filet de sécurité)
    initIcons();

    // 4. Configurer l'agence (met à jour textes/liens selon ?agence=)
    applyConfig();

    // 5. Navigation par onglets
    initTabs();

    // 6. Bannière d'installation PWA
    initInstallBanner();

    // 7. Filtre grille salariale
    initSalaryFilter();

    // 8. Auto-reload après inactivité
    initAutoReload();

    // 9. Service Worker
    registerServiceWorker();
}

init().catch(err => console.error('Erreur init app :', err));
