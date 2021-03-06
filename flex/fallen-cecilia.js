//service worker for Offline camping simulator
const nomeCache = "cache-v1";

function shouldCache (fetch) {
  if (fetch.clone().status === 0 || (fetch.clone().status >= 400 && fetch.clone().status <= 500) ) return false;
  return true;
}

const precacheResources = [
  './',
  './index.html',
  './worker.js',
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


self.addEventListener('fetch', function(event) {
  //URL
  const requestURL = new URL (event.request.url);
  
  //Dynamic stuff
  if (requestURL.origin == location.origin || requestURL.hostname === "api.epicsevendb.com") {
    //console.log("DB STUFF");
    event.respondWith (async function (){
      try { // try online
        return await fetch(event.request)
        .then(response => { // cache response
          if (response.clone().status === 200) {
            return caches.open(nomeCache).then(cache => {
              if ( shouldCache(response) ) cache.put(event.request.url, response.clone());
              return response;
            });
          } else throw new Error();
        });
        
      } catch (error) { // offline
        console.log("offline");
        return caches.match(event.request);
      };
    }());
    return;
  }
  
  //Assets
  else if (requestURL.hostname === "assets.epicsevendb.com" || requestURL.hostname === "cdn.glitch.com") { // assets try from cache -> on fail -> internet 
    //console.log("Assets STUFF");
    //return;
    event.respondWith(async function (){
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      
      try {
        return await fetch (event.request)
        .then(response => { // cache response for next time
          if (response.clone()) {
            return caches.open(nomeCache).then(cache => {
              if ( shouldCache(response) ) cache.put(event.request.url, response.clone());
              return response;
            });
          } else throw new Error();
        });
      } catch (error) {
        // Both failed
        return;
      };
    }());
    return;
  }

  else if (requestURL.hostname === "cdn.jsdelivr.net") {
    //console.log("depend. stuff");
    event.respondWith (async function (){
      try { // try online
        return await fetch(event.request)
        .then(response => { // cache response
          if (response.clone().status === 200) {
            return caches.open(nomeCache).then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
          } else throw new Error();
        });
      } catch (error) { // offline
        return caches.match(event.request);
      };
    }());
    return;
  }
  
  //Default
  console.log("Default");
  event.respondWith(async function (){
    const cachedResponse = await chaches.match(event.request);
    return cachedResponse || fetch(event.request);
  });
});
