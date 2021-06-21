
const PRECACHE = 'budget-precache-v1';
const CACHE_NAME = "static-cache-v1"
const DATA_CACHE_NAME = "data-cache-v1"
const RUNTIME = 'runtime';

const FILES_TO_CACHE = [
    '/',
    "/",
    "/db.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
    
  ];

self.addEventListener('install', function(evt) {
  evt.waitUntil(
    caches.open(PRECACHE)
  .open(CACHE_NAME)
  .open(DATA_CACHE_NAME).then(cache => {
  console.log("Your files were pre-cached successfully!");
   return cache.addAll(FILES_TO_CACHE);
  
})
  
  );

  self.skipWaiting();

});

self.addEventListener('activate', function(evt) {
    const currentCaches = [PRECACHE, RUNTIME, CACHE_NAME, DATA_CACHE_NAME];
    evt.waitUntil(
      caches.keys().then((cacheNames) => {
          return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
        })
        .then((cachesToDelete) => {
            return Promise.all(
              cachesToDelete.map((cacheToDelete) => {
                return caches.delete(cacheToDelete);
              })
            );
          })
          .then(() => self.clients.claim())
      );
    });

    self.addEventListener('active', function(evt) {
      if (evt.request.url.startsWith(self.location.origin)) {
        evt.respondWith(
          caches.match(evt.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.open(RUNTIME).then((cache) => {
              return fetch(evt.request).then((cachedResponse) => {
                return cache.put(evt.request, cachedResponse.clone()).then(() => {
                  return cachedResponse;
                });
              });
            });
          })
        );
      }
    });
    

    self.addEventListener('fetch', function(evt) {
        if (evt.request.url.includes('/api/')) {
          evt.respondWith(
             caches.open(DATA_CACHE_NAME).then(cache => {
                  return fetch(evt.request)
                  .then(cachedResponse => {
                  if (cachedResponse.status === 200) {
                      cache.put(evt.request.url, cachedResponse.clone());
                    }
                    return cachedResponse;
                })
                .catch(err => {
                  return cache.match(evt.request);
                });
            }).catch(err => console.log(err))
          );
      
          return;
        }
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request);
                });
            })
        );
    });