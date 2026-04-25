import { OBLIGATIONS, DOCUMENTS } from './content';

// Generation dynamique des obligations
export function renderObligations(): void {
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
export function renderDocuments(): void {
    const container = document.getElementById('documents-grid');
    if (!container) return;

    container.innerHTML = DOCUMENTS.map(doc => {
        const idAttr = doc.id ? ` id="${doc.id}"` : '';

        return `<a href="${doc.url}"${idAttr} target="_blank" rel="noopener noreferrer" class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 ${doc.hoverClass} transition-all group h-32 active:scale-95">
                     <div class="${doc.iconBgClass} p-3 rounded-full ${doc.iconTextClass} group-hover:scale-110 transition-transform">
                         <i data-lucide="${doc.icon}" class="w-6 h-6"></i>
                     </div>
                     <h3 class="font-bold text-xs text-slate-800 dark:text-white leading-tight ${doc.hoverTextClass}">${doc.title}</h3>
                     <span class="sr-only">(nouvelle fenêtre)</span>
                 </a>`;
    }).join('');
}
