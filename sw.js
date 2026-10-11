const CACHE_NAME = 'santavape-live-v5';

self.addEventListener('install', () => self.skipWaiting());

// Borra cachés viejas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))
            .then(() => self.clients.claim())
    );
});

// Network First: siempre busca la versión nueva (stock actualizado).
// Solo guarda en caché pedidos GET del propio sitio que salieron bien.
self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

    event.respondWith(
        fetch(req)
            .then(res => {
                if (res.ok) {
                    const copia = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(req, copia));
                }
                return res;
            })
            .catch(() =>
                caches.match(req).then(cacheada =>
                    cacheada || new Response('Sin conexión. Revisá tu internet y volvé a intentar.', {
                        status: 503,
                        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                    })
                )
            )
    );
});
