// Register Service Worker
export function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/AppIntervenants/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                    registration.update();
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        });
    }
}
