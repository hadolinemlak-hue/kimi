const CACHE_VERSION = "emlak-crm-v1.0.0";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(async (cache) => {
        for (const asset of APP_SHELL) {
          try {
            await cache.add(asset);
          } catch (err) {
            console.warn("Cache eklenemedi:", asset, err);
          }
        }
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

async function putInDynamicCache(request, response) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response.clone());
  } catch (err) {
    console.warn("Dynamic cache hatası:", err);
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!url.protocol.startsWith("http")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => putInDynamicCache(request, networkResponse))
        .catch(async () => {
          const cachedPage =
            (await caches.match(request)) ||
            (await caches.match("./")) ||
            (await caches.match("./index.html"));

          if (cachedPage) return cachedPage;

          return new Response(
            `
            <!DOCTYPE html>
            <html lang="tr">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Çevrimdışı</title>
              <style>
                body{
                  margin:0;
                  font-family:Arial,sans-serif;
                  background:#1A1A2E;
                  color:#fff;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  min-height:100vh;
                  text-align:center;
                  padding:24px;
                }
                .box{
                  max-width:520px;
                  background:#2A2A3E;
                  border:1px solid #3A3A4E;
                  border-radius:16px;
                  padding:32px;
                }
                h1{color:#FF7A00;margin-bottom:12px;}
                p{color:#E2E8F0;line-height:1.6;}
              </style>
            </head>
            <body>
              <div class="box">
                <h1>Çevrimdışısın</h1>
                <p>İnternet bağlantısı yok. Daha önce açılmış içerikler cache'den gösterilebilir.</p>
              </div>
            </body>
            </html>
            `,
            {
              headers: { "Content-Type": "text/html; charset=UTF-8" }
            }
          );
        })
    );
    return;
  }

  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker" ||
    request.destination === "manifest" ||
    request.destination === "font" ||
    request.destination === "image" ||
    url.origin === self.location.origin
  ) {
    event.respondWith(
      caches.match(request).then(async (cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        try {
          const networkResponse = await fetch(request);
          return putInDynamicCache(request, networkResponse);
        } catch (err) {
          return cachedResponse || Promise.reject(err);
        }
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => putInDynamicCache(request, networkResponse))
      .catch(() => caches.match(request))
  );
});
