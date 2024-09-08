const CACHE_VERSION = 'v1.0.1'

addEventListener('install', () => {
  void skipWaiting()
})

addEventListener('activate', event => {
  void clients.claim()

  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key)))),
  )
})

addEventListener('fetch', event => {
  const { request } = event

  if (request.url.includes('/api/')) {
    return
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        const responseClone = response.clone()

        caches.open(CACHE_VERSION).then(cache => {
          void cache.put(request, responseClone)
        })

        return response
      })
      .catch(() => caches.match(request)),
  )
})
