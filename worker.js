const staticCacheName = 's-app-v1';
const assets = [
  '/',
  'index.html',
  'style.css',
  'adaptive.css',
  'main.js',
  'resours/',
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assets);
});
self.addEventListener('activate', async event => {
  const cacheNames = await cache.keys();
  await Promise.all(
    cacheNames
    .filter(name => name !== staticCacheName)
    .map(name => caches.delete(name))
  )
});
self.addEventListener('fetch', event => {
  event.respondWith(cache(event.request));
});

async function cache(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request);
}