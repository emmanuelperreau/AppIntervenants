// render-content.js — Génération dynamique des obligations et documents
import { OBLIGATIONS, DOCUMENTS } from './content.js';
import { icon } from './icons.js';

/**
 * Traduit une classe CSS Tailwind dark: / couleur en classe sémantique
 * pour les cards obligation (border, icon, text).
 * On passe les classes telles quelles dans l'attribut style inline
 * via des variables CSS ou on mappe vers nos classes sémantiques.
 * Ici on utilise directement style inline + currentColor via les classes
 * portées dans content.js (qui sont des classes Tailwind) -> mappage vers
 * des propriétés CSS inline simples.
 *
 * Mapping : les classes iconClass / textClass / borderClass de content.js
 * contiennent des noms de couleur Tailwind. On les traduit en valeurs hex.
 */

/** @type {Record<string, string>} */
const COLOR_MAP = {
    // text-*
    'text-pink-600': '#db2777',       'text-pink-400': '#f472b6',
    'text-blue-600': '#2563eb',       'text-blue-400': '#60a5fa',
    'text-blue-700': '#1d4ed8',
    'text-sky-500':  '#0ea5e9',       'text-sky-400': '#38bdf8',
    'text-orange-600': '#ea580c',     'text-orange-400': '#fb923c',
    'text-indigo-500': '#6366f1',
    'text-amber-500': '#f59e0b',
    'text-fuchsia-500': '#d946ef',
    'text-emerald-500': '#10b981',
    'text-rose-500': '#f43f5e',
    'text-violet-600': '#7c3aed',
    'text-green-600': '#16a34a',
    'text-cyan-500': '#06b6d4',
    'text-red-500': '#ef4444',
    'text-red-600': '#dc2626',
    'text-slate-500': '#64748b',
    'text-headset': '#7c3aed',
    // border-*
    'border-pink-100': '#fce7f3',     'border-blue-100': '#dbeafe',
    'border-sky-100': '#e0f2fe',      'border-orange-100': '#ffedd5',
    'border-indigo-100': '#e0e7ff',   'border-amber-100': '#fef3c7',
    'border-fuchsia-100': '#fdf4ff',  'border-emerald-100': '#d1fae5',
    'border-rose-100': '#ffe4e6',     'border-violet-100': '#ede9fe',
    'border-green-100': '#dcfce7',    'border-cyan-100': '#cffafe',
    'border-red-100': '#fee2e2',      'border-slate-100': '#f1f5f9',
    'border-slate-600': '#475569',
};

/**
 * Extrait la première classe d'un ensemble de classes (la couleur principale).
 * Renvoie la valeur hex si connue.
 * @param {string} classes
 * @returns {string}
 */
function resolveColor(classes) {
    const first = classes.split(' ')[0];
    return COLOR_MAP[first] || 'currentColor';
}

/**
 * Extrait la couleur de bordure principale (hex).
 * @param {string} borderClass
 * @returns {string}
 */
function resolveBorderColor(borderClass) {
    const first = borderClass.split(' ')[0];
    return COLOR_MAP[first] || '#e2e8f0';
}

/**
 * Génère les cartes obligation dans #obligations-grid.
 */
export function renderObligations() {
    const container = document.getElementById('obligations-grid');
    if (!container) return;

    container.innerHTML = OBLIGATIONS.map(ob => {
        const iconColor = resolveColor(ob.iconClass);
        const borderColor = resolveBorderColor(ob.borderClass);
        const textColor = resolveColor(ob.textClass);

        const iconHtml = ob.overlayIcon
            ? `<div style="position:relative;display:inline-flex">
                 ${icon(ob.icon, '', '32', '32')}
                 <span style="position:absolute;top:-4px;right:-4px;background:white;border-radius:50%;display:flex">
                   ${icon(ob.overlayIcon, '', '16', '16')}
                 </span>
               </div>`
            : icon(ob.icon, '', '32', '32');

        const textContent = ob.html
            ? `<div style="font-size:.75rem;font-weight:500;line-height:1.4;color:${textColor}">${ob.html}</div>`
            : `<p style="font-size:.75rem;font-weight:500;line-height:1.4;color:${textColor};margin:0">${ob.text}</p>`;

        return `<div style="border:2px solid ${borderColor};color:${iconColor}" class="obligation-card">
                  ${iconHtml}
                  ${textContent}
                </div>`;
    }).join('');
}

/**
 * Génère les tuiles document dans #documents-grid.
 */
export function renderDocuments() {
    const container = document.getElementById('documents-grid');
    if (!container) return;

    container.innerHTML = DOCUMENTS.map(doc => {
        const idAttr = doc.id ? ` id="${doc.id}"` : '';
        return `<a href="${doc.url}"${idAttr} target="_blank" rel="noopener noreferrer" class="doc-tile ${doc.colorClass}">
                  <div class="doc-tile-icon">${icon(doc.icon, '', '24', '24')}</div>
                  <span class="doc-tile-label">${doc.title}</span>
                  <span class="sr-only">(nouvelle fenêtre)</span>
                </a>`;
    }).join('');
}
