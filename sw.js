const CACHE_NAME = 'o2-guide-v6';
const LOCAL_ASSETS = [
  './',
  './index.html',
  './simulateur.html',
  './offline.html',
  './manifest-loches.json',
  './manifest-nord.json',
  './icon.svg',
  './icon-192.png',
  './icon-384.png',
  './icon-512.png',
  './apple-touch-icon.png'
];
const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Assets locaux : obligatoires
      await cache.addAll(LOCAL_ASSETS);
      // CDN : optionnels (best effort)
      for (const url of CDN_ASSETS) {
        try { await cache.add(url); } catch (e) { console.warn('CDN cache fail:', url); }
      }
    })
    .then(() => self.skipWaiting())
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
    .then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  // Stratégie pour les pages HTML (Navigation) : Network First, puis Cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        // Mettre en cache la réponse fraîche
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
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