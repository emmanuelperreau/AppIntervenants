// auto-reload.js — Rechargement automatique après 10 min d'inactivité
export function initAutoReload() {
    let lastVisibilityChange = Date.now();
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            const now = Date.now();
            if (now - lastVisibilityChange > 600000) {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(reg => reg.update());
                }
                window.location.reload();
            }
            lastVisibilityChange = now;
        } else {
            lastVisibilityChange = Date.now();
        }
    });
}
