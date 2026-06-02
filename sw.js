// sw.js — Service Worker écrit main (remplace vite-plugin-pwa)
// Bumper CACHE_VERSION à chaque déploiement pour invalider le cache.
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'appintervenants-' + CACHE_VERSION;

// App shell : tous les fichiers à précacher au install
const PRECACHE_URLS = [
    './',
    './index.html',
    './simulateur.html',
    './offline.html',
    './styles/base.css',
    './styles/components.css',
    './styles/contacts.css',
    './styles/simulateur.css',
    './agence-init.js',
    './manifest-nord.json',
    './manifest-loches.json',
    './icon.svg',
    './icon-192.png',
    './icon-384.png',
    './icon-512.png',
    './apple-touch-icon.png',
    './fonts/inter-400.woff2',
    './fonts/inter-600.woff2',
    './fonts/inter-700.woff2',
    './src/app.js',
    './src/tabs.js',
    './src/render-content.js',
    './src/salary-filter.js',
    './src/install-banner.js',
    './src/auto-reload.js',
    './src/sw-register.js',
    './src/agency-config.js',
    './src/icons.js',
    './src/content.js',
    './src/calculator.js',
    './src/simulateur.js',
    './src/templates/inject.js',
    './src/templates/tab-home.html',
    './src/templates/tab-daily.html',
    './src/templates/tab-docs.html',
    './src/templates/tab-keys.html',
    './src/templates/tab-money/grille.html',
    './src/templates/tab-money/carriere.html',
    './src/templates/tab-money/primes.html',
    './config.js',
];

// Install : précacher l'app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

// Activate : purger les anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch : cache-first, fallback offline.html pour les navigations
self.addEventListener('fetch', event => {
    // Ignorer les requêtes non-GET et les requêtes cross-origin
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                // Mettre en cache les nouvelles ressources valides
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => {
                // Fallback offline pour les navigations HTML
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
        })
    );
});
