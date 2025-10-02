const CACHE_NAME = 'financas-app-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instalar o service worker e fazer cache dos recursos
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requisições e servir do cache quando possível
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retorna o cache se encontrar, senão faz a requisição
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Atualizar o service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});