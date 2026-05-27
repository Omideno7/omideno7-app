importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

const CACHE_NAME = 'omideno7-pwa-onesignal-v3';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './daily-messages.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './logo-en.jpeg',
  './logo-fa.jpeg',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).then(response => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
    return response;
  }).catch(() => caches.match(event.request)));
});