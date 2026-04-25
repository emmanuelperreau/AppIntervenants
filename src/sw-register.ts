// Enregistrement du Service Worker
export function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/AppIntervenants/sw.js')
                .then(registration => {
                    console.log('SW enregistre :', registration);
                    registration.update();
                })
                .catch(error => {
                    console.log('Echec enregistrement SW :', error);
                });
        });
    }
}
