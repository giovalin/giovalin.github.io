//service worker for Offline camping simulator

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  self.skipWaiting(); // run even an older version is running
});

self.addEventListener('activate', event => {
  console.log('Service worker active!');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
});
