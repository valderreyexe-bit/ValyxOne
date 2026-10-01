const CACHE_NAME = 'santavape-live-v1';

// Fuerza la instalación inmediata del nuevo sistema
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Borra cualquier memoria caché vieja que haya quedado en los celulares
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Estrategia "Network First" (Busca el stock nuevo primero)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Si hay internet, actualiza la memoria con el stock real
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
            .catch(() => {
                // Si el cliente no tiene señal, muestra la última versión guardada
                return caches.match(event.request);
            })
    );
});
