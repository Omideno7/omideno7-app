/* Omideno7 V64.02 Cloud/Offline Test Service Worker
   Scope: /omideno7-app/v64-cloud/
   Safe: does not replace the main service-worker.js.
*/
const OM7_V64_CACHE = 'omideno7-v64-cloud-cache-6402';
const OM7_V64_RUNTIME = 'omideno7-v64-runtime-6402';
const CORE_ASSETS = [
  './index.html?v=6402',
  './manifest-v64-cloud.webmanifest',
  './v64-cloud-sync.js?v=6402',
  './omideno7-app-qr.png',
  '../styles-v45.css?v=45',
  '../icon-192.png',
  '../icon-512.png',
  '../apple-touch-icon.png',
  '../logo-en.jpeg',
  '../logo-fa.jpeg',
  '../bible-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(OM7_V64_CACHE);
    for (const asset of CORE_ASSETS) {
      try { await cache.add(asset); } catch (e) { /* keep install safe */ }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k.startsWith('omideno7-v64-') && k !== OM7_V64_CACHE && k !== OM7_V64_RUNTIME) return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'OM7_V64_CACHE_ASSETS' && Array.isArray(data.assets)) {
    event.waitUntil((async () => {
      const cache = await caches.open(OM7_V64_CACHE);
      let ok = 0, fail = 0;
      for (const asset of data.assets) {
        try { await cache.add(asset); ok++; }
        catch(e){ fail++; }
      }
      if (event.source) event.source.postMessage({type:'OM7_V64_CACHE_DONE', ok, fail});
    })());
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (/supabase|onesignal/i.test(url.hostname + url.pathname)) return;

  if (req.mode === 'navigate' || /\.html($|\?)/i.test(url.pathname)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(OM7_V64_RUNTIME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch(e) {
        return (await caches.match(req)) || (await caches.match('./index.html?v=6402')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        const cache = await caches.open(OM7_V64_RUNTIME);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch(e) {
      return cached || Response.error();
    }
  })());
});
