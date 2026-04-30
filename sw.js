const STATIC_CACHE = 'emlak-crm-static-v3';
const RUNTIME_CACHE = 'emlak-crm-runtime-v3';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Base64 / localStorage içindeki data:image içerikleri SW tarafından işlenmesin
  if (url.protocol === 'data:') return;

  // Desteklenmeyen protokolleri atla
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Sayfa gezintilerinde önce network, olmazsa cache, en son index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || caches.match('./index.html');
        })
    );
    return;
  }

  // Aynı origin dosyalar için cache-first + arkada network güncellemesi
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        const networkFetch = fetch(request)
          .then(response => {
            if (!response || response.status !== 200) return response;

            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });

            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      })
    );
    return;
  }

  // CDN gibi dış kaynaklar için network-first, hata olursa cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(request, responseClone);
        });

        return response;
      })
      .catch(() => caches.match(request))
  );
});
