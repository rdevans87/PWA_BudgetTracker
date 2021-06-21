const { response } = require("express");

const PRECACHE = 'budget-precache-v1';
const CACHE_NAME = "static-cache-v1"
const DATA_CACHE_NAME = "data-cache-v1"
const RUNTIME = 'runtime';

const FILES_TO_CACHE = [
  "/",
  "assets"/
  "/indexedDb.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
   console.log("Your files were pre-cached successfully!");
   return cache.addAll(FILES_TO_CACHE);
  
})
  
  );

  self.skipWaiting();

});

self.addEventListener('activate', function(event) {
    const currentCaches = [PRECACHE, RUNTIME, CACHE_NAME, DATA_CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
          return cacheNames.filter((cacheName) => !currentCaches.includes(cacheNames));
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

    self.addEventListener('active', function(event) {
      if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.open(RUNTIME).then((cache) => {
              return fetch(event.request).then((cachedResponse) => {
                return cache.put(event.request, cachedResponse.clone()).then(() => {
                  return cachedResponse;
                });
              });
            });
          })
        );
      }
    });
    

    self.addEventListener('fetch', function(event) {
        if (event.request.url.includes('/api/')) {
          event.respondWith(
             caches.open(DATA_CACHE_NAME).then(cache => {
                  return fetch(event.request)
                  .then(cachedResponse => {
                  if (cachedResponse.status === 200) {
                      cache.put(event.request.url, cachedResponse.clone());
                    }
                    return cachedResponse;
                })
                .catch(err => {
                  return cache.match(event.request);
                });
            }).catch(err => console.log(err))
          );
      
          return;
        }

        // event.respondWith(
        //      
        //         return cachedResponse || fetch(event.request);
        //       })
        // );
    
                event.respondwith(
                  fetch(event.request).catch(function() {
                  return caches.match(event.request).then(function(cachedResponse) {
                if (cachedResponse) {
                  return cachedResponse;
                } else if (event.request.headers.get("accept").includes("text/html" )) {
                  return caches.match("/")
                }
               
               
                });
            })
        );
    });