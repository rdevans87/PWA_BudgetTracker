const CACHE_NAME = "budget-tracker-cache-v1";
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



self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were cached successfully!");
      return cache.addAll(FILES_TO_CACHE);

    })
  )
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.open(DATA_CACHE_NAME).then(cache => {
      return fetch(event.request)
      .then((response => {
        if (response.status === 200) {
          cache.put(event.request.url, response.clone());
        }
        return response;
      })
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
   
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('active', function (event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
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


self.addEventListener('fetch', function (event) {
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
          .catch(error => {
            return cache.match(event.request);
          });
      }).catch(error => console.log(error))
    );

    return;
  }


  event.respondwith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/")
        }


      });
    })
  );
});