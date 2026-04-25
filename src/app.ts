// Styles (traites par Vite + Tailwind)
import './styles.css';

// Templates HTML (injectes synchronement avant tout)
import { injectTemplates } from './templates/inject';

// Modules d'initialisation
import { renderObligations, renderDocuments } from './render-content';
import { initIcons } from './icons';
import { applyConfig } from './agency-config';
import { initTabs } from './tabs';
import { initInstallBanner } from './install-banner';
import { initSalaryFilter } from './salary-filter';
import { initAutoReload } from './auto-reload';
import { registerServiceWorker } from './sw-register';

// Declarations globales sur window
declare global {
    interface Window {
        switchTab: (tabName: string) => void;
        installPWA: () => void;
        dismissInstall: () => void;
    }
}

// Sequence d'initialisation (ordre critique)
injectTemplates();
renderObligations();
renderDocuments();
initIcons();
applyConfig();
initTabs();
initInstallBanner();
initSalaryFilter();
initAutoReload();
registerServiceWorker();
