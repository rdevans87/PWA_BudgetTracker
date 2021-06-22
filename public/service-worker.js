const CACHE_NAME = "budget-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];



// install
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addALL("/icons/icons/"))

  );
  event.waitUntil(
    caches.open(DATA_CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );

});

  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );

    self.clients.claim();
  });



self.addEventListener('fetch', function(event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(error => {

            return cache.match(event.request);
          })
      }).catch(error => console.log(error))
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request);
      });
    })
  );

});