// AUTO-RELOAD POUR WEBAPP
export function initAutoReload(): void {
    let lastVisibilityChange = Date.now();
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            const now = Date.now();
            if (now - lastVisibilityChange > 600000) {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.update();
                    });
                }
                window.location.reload();
            }
            lastVisibilityChange = now;
        } else {
            lastVisibilityChange = Date.now();
        }
    });
}
