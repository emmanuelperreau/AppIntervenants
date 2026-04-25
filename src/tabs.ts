// Navigation par onglets

// Navigation clavier onglets (ARIA tabs pattern)
function initKeyboardNav(): void {
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
}

export function initTabs(): void {
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

        document.querySelectorAll('[role="tab"]').forEach(el => {
            el.setAttribute('aria-selected', 'false');
            el.setAttribute('tabindex', '-1');
        });
        const activeTab = document.getElementById('btn-' + tabName);
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
            activeTab.setAttribute('tabindex', '0');
        }

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

        // Persist active tab for restore after auto-reload
        // QUICK-WIN #5 : catch sans parametre
        try { sessionStorage.setItem('active_tab', tabName); } catch { /* quota */ }
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

    // Navigation clavier ARIA
    initKeyboardNav();

    // Restore active tab apres auto-reload
    // QUICK-WIN #5 : catch sans parametre
    try {
        const savedTab = sessionStorage.getItem('active_tab');
        if (savedTab && ['home', 'daily', 'money', 'docs', 'keys'].includes(savedTab)) {
            window.switchTab(savedTab);
        }
    } catch { /* ignore */ }
}
