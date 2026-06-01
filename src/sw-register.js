// sw-register.js — Enregistrement du Service Worker
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js', { scope: './' })
                .then(reg => {
                    console.log('SW enregistré :', reg.scope);
                    reg.update();
                })
                .catch(err => {
                    console.log('Echec enregistrement SW :', err);
                });
        });
    }
}
