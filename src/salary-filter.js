// salary-filter.js — Filtre grille salariale par métier
export function initSalaryFilter() {
    const filters = document.getElementById('salary-filters');
    if (!filters) return;

    filters.addEventListener('click', e => {
        const btn = /** @type {HTMLElement} */ (e.target).closest('[data-filter]');
        if (!btn) return;
        const filter = /** @type {HTMLElement} */ (btn).dataset.filter;

        // Mise à jour styles des boutons
        filters.querySelectorAll('.salary-filter').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        // Afficher/masquer les colonnes
        document.querySelectorAll('[data-metier]').forEach(col => {
            const el = /** @type {HTMLElement} */ (col);
            if (filter === 'all' || el.dataset.metier === filter) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    });
}
