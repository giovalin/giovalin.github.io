//service worker for Offline camping simulator
const nomeCache = "cache-v1";

const precacheResources = [
  '/',
  'index.html',
  'worker.js',
  './HeroDatabase.json',
  'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/js-combinatorics@0.5.5/combinatorics.min.js',
  'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.min.css'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(nomeCache)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
  self.skipWaiting(); // run even an older version is running
});

self.addEventListener('activate', event => {
  console.log('Service worker active!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        caches.open(nomeCache)
          .then(cache => {
            return cache.add(event.request);
          })
        return fetch(event.request);
      })
    );
});


