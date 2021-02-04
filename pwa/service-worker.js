//service worker for Offline camping simulator
const nomeCache = "cache-v1";

const precacheResources = [
  'index.html',
  'worker.js',
  'HeroDatabase.json',
  'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/js-combinatorics@0.5.5/combinatorics.min.js',
  'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.min.css'
];

self.addEventListener('install', event => {
  console.log('Installing service worker!');
  
  event.waitUntil( // delete all old caches
    
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(thisCache) {
          thisCache == nomeCache ? false : true;
        }).map(function(thisCache) {
          return caches.delete(thisCache);
        })
      )
    });
    
    caches.open(nomeCache)
      .then(cache => {
        return cache.addAll(precacheResources);
      });
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
  if (requestURL.origin == location.origin) {
    //console.log("DB STUFF");
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
        console.log("offline");
        return caches.match(event.request);
      };
    }());
    return;
  }
  
  //Assets
  else if (requestURL.hostname === "assets.epicsevendb.com" || requestURL.hostname === "cdn.glitch.com") { // assets try from cache -> on fail -> internet 
    event.respondWith(async function (){
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      
      return await fetch (event.request)
      .then(async response => { // cache response for next time
        await caches.open(nomeCache).then(cache => {
          cache.put(event.request.url, response.clone()); 
        });
        return response;
      });
    }());
    return;
  }

  else if (requestURL.hostname === "cdn.jsdelivr.net") {
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
  
  //Default -> extra stuff that doesn't need cache
  event.respondWith(async function (){
    //const cachedResponse = await chaches.match(event.request);
    //return cachedResponse || fetch(event.request);
    return fetch(event.request);
  });
});
