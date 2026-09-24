const CACHE_NAME = 'santavape-v1';

// Archivos estáticos principales que queremos guardar en el celular del cliente
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/IMG/perfil3.webp',
    '/manifest.json'
];

// INSTALACIÓN: Guarda los archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caché abierta');
                return cache.addAll(urlsToCache);
            })
    );
});

// INTERCEPTOR: Cuando el cliente navega, busca primero en caché para máxima velocidad
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve instantáneamente
                if (response) {
                    return response;
                }
                // Si no está (ej: fotos nuevas de vapers), lo descarga de internet
                return fetch(event.request);
            })
    );
});

// ACTUALIZACIÓN: Borra cachés viejas si hacés cambios grandes en la web
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
