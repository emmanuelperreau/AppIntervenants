// tabs.js — Navigation par onglets (logique identique au .ts original)

/** @param {string[]} tabNames */
function initKeyboardNav(tabNames) {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;
    tabList.addEventListener('keydown', function (e) {
        const ke = /** @type {KeyboardEvent} */ (e);
        const current = tabNames.findIndex(function (name) {
            const btn = document.getElementById('btn-' + name);
            return btn && btn.getAttribute('aria-selected') === 'true';
        });
        if (current === -1) return;
        let next = current;
        if (ke.key === 'ArrowRight' || ke.key === 'ArrowDown') next = (current + 1) % tabNames.length;
        if (ke.key === 'ArrowLeft'  || ke.key === 'ArrowUp')   next = (current - 1 + tabNames.length) % tabNames.length;
        if (next !== current) {
            ke.preventDefault();
            /** @type {any} */ (window).switchTab(tabNames[next]);
            const btn = document.getElementById('btn-' + tabNames[next]);
            if (btn) btn.focus();
        }
    });
}

export function initTabs() {
    const tabNames = ['home', 'daily', 'money', 'docs', 'keys'];

    /** @type {any} */ (window).switchTab = /** @param {string} tabName */ function (tabName) {
        // Masquer tous les onglets
        document.querySelectorAll('.tab-content').forEach(el => {
            el.classList.remove('active', 'fade-in');
        });
        const target = document.getElementById('tab-' + tabName);
        if (target) {
            target.classList.add('active');
            void target.offsetWidth; // force reflow
            target.classList.add('fade-in');
        } else {
            console.error('Onglet introuvable :', tabName);
        }

        // ARIA tabs
        document.querySelectorAll('[role="tab"]').forEach(el => {
            el.setAttribute('aria-selected', 'false');
            el.setAttribute('tabindex', '-1');
        });
        const activeTab = document.getElementById('btn-' + tabName);
        if (activeTab) {
            activeTab.setAttribute('aria-selected', 'true');
            activeTab.setAttribute('tabindex', '0');
        }

        // Styles nav-btn
        document.querySelectorAll('.nav-btn').forEach(el => {
            const htmlEl = /** @type {HTMLElement} */ (el);
            htmlEl.classList.remove('active');
            // Remettre la couleur neutre (gérée par CSS, on retire juste active)
        });
        const btn = /** @type {HTMLElement|null} */ (document.getElementById('btn-' + tabName));
        if (btn) {
            btn.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        try { sessionStorage.setItem('active_tab', tabName); } catch { /* quota */ }
    };

    // Attacher les listeners
    const tabButtons = {
        'btn-home':  'home',
        'btn-daily': 'daily',
        'btn-money': 'money',
        'btn-docs':  'docs',
        'btn-keys':  'keys',
    };
    for (const [id, tab] of Object.entries(tabButtons)) {
        document.getElementById(id)?.addEventListener('click', () => /** @type {any} */ (window).switchTab(tab));
    }

    initKeyboardNav(tabNames);

    // Restaurer l'onglet actif après auto-reload
    try {
        const savedTab = sessionStorage.getItem('active_tab');
        if (savedTab && tabNames.includes(savedTab)) {
            /** @type {any} */ (window).switchTab(savedTab);
        }
    } catch { /* ignore */ }
}
