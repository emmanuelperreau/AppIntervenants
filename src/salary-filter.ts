// Filtre grille salariale par métier
export function initSalaryFilter(): void {
    const filters = document.getElementById('salary-filters');
    if (!filters) return;
    filters.addEventListener('click', (e: Event) => {
        const btn = (e.target as HTMLElement).closest('[data-filter]') as HTMLElement | null;
        if (!btn) return;
        const filter = btn.dataset.filter;

        // Mise a jour des styles des boutons
        filters.querySelectorAll('.salary-filter').forEach(b => {
            b.classList.remove('bg-[#11183b]', 'text-white', 'border-[#11183b]');
            b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-600');
        });
        btn.classList.add('bg-[#11183b]', 'text-white', 'border-[#11183b]');
        btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-600');

        // Afficher/masquer les colonnes
        document.querySelectorAll('[data-metier]').forEach(col => {
            const el = col as HTMLElement;
            if (filter === 'all' || el.dataset.metier === filter) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    });
}
