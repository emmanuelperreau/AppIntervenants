const CACHE_NAME = 'o2-guide-v4';
const ASSETS = [
  './',
  './index.html',
  './config.js',
  './simulateur.html',
  './offline.html',
  // LES NOUVEAUX MANIFESTS (Crucial)
  './manifest-loches.json',
  './manifest-nord.json',
  // LES IMAGES LOCALES (Crucial pour PWA)
  './icon.svg',
  './icon-512.png',
  // RESSOURCES EXTERNES
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap'
];

// Install Event
self.addEventListener('install', event => {
  self.skipWaiting(); // Force l'activation immédiate
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // On essaie de tout mettre en cache
        return cache.addAll(ASSETS);
      })
      .catch(err => {
        console.error('Erreur installation SW:', err);
      })
  );
});

// Activate Event (Nettoyage des vieux caches)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  // Important : prendre le contrôle des clients immédiatement
  return self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', event => {
  // Stratégie pour les pages HTML (Navigation) : Network First, puis Cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Si on est hors ligne, tenter le cache puis la page offline
          return caches.match(event.request)
            .then(cached => cached || caches.match('./offline.html'));
        })
    );
  } else {
    // Stratégie pour les images/scripts/css : Cache First, puis Network
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});