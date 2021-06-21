
const PRECACHE = 'budget-precache-v1';
const CACHE_NAME = "static-cache-v1"
const DATA_CACHE_NAMe = "data-cache-v1"
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
   .open(CACHE_NAME).then(cache => {
    console.log("Your files were pre-cached successfully!");
   return cache.addAll(FILES_TO_CACHE);
  
})
  
  );
self.skipWaiting();

});

self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches.keys()
        .then((cacheNames) => {
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

    self.addEventListener('fetch', (event) => {
        if (event.request.url.startsWith(self.location.origin)) {
          event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(event.request)
                  .then(response => {
                    if (response.status === 200) {
                      cache.put(event.request.url, response.clone());
                    }
                    return response;
                })
                .catch(err => {
                  return cache.match(event.request);
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