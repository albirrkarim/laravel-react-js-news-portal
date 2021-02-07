var CACHE_NAME = 'pameran-bersama-virtual-v1.0';
var urlsToCache = [
  'favicon.ico',
  'manifest.json',
  '/',

];

self.addEventListener('install', function(event) {
  /*Perform install steps*/
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/* modify */
self.addEventListener('activate', function(event) {

    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName){
              return cacheName != CACHE_NAME;
          }).map(function(cacheName){
              console.log("Service Worker : Deleting unwanted cache ");
              return caches.delete(cacheName);
          })
        );
      })
    );
  });

/* event fetch */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

