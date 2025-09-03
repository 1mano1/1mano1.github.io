// service-worker.js
const CACHE_VERSION = 'v5'; 
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
        .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// App shell para navegaciones
async function offlineShell() {
  return (await caches.match('/index.html', { ignoreSearch: true })) ||
         (await caches.match('/', { ignoreSearch: true })) ||
         new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Navegación
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith((async () => {
      try {
        return await fetch(request);
      } catch {
        return await offlineShell();
      }
    })());
    return;
  }

  // api
  if (url.pathname.startsWith('/api/')) {
    if (request.method === 'GET') {
      event.respondWith((async () => {
        try {
          const fresh = await fetch(request);
        } catch {
          return new Response('OFFLINE', { status: 503, headers: { 'X-Offline': '1' } });
        }
      })());
    }
    return;
  }

  if (request.method === 'GET' && url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(request, { ignoreSearch: true });
      const net = fetch(request).then(async (res) => {
        if (res && res.status === 200) {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, res.clone());
        }
        return res;
      }).catch(() => null);
      return cached || net || new Response('', { status: 504 });
    })());
  }
});
