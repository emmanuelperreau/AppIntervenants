import home from './tab-home.html?raw';
import money from './tab-money/index';
import daily from './tab-daily.html?raw';
import docs from './tab-docs.html?raw';
import keys from './tab-keys.html?raw';

const TEMPLATES: Record<string, string> = { home, money, daily, docs, keys };

export function injectTemplates(): void {
    for (const [name, html] of Object.entries(TEMPLATES)) {
        const slot = document.getElementById('tab-' + name);
        if (slot) slot.innerHTML = html;
    }
}
