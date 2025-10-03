// Enhanced Service Worker for Tip Calculator PWA with iOS optimization
const CACHE_NAME = 'tip-calculator-v1';
const STATIC_CACHE = 'tip-static-v1';
const DYNAMIC_CACHE = 'tip-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png'
];

// Install event - cache static resources
self.addEventListener('install', function(event) {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker installation complete');
        return self.skipWaiting(); // Force activation
      })
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activation complete');
    })
  );
});

// Fetch event - enhanced caching strategy
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Cache-first strategy for static assets
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request).then(fetchResponse => {
            return caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
        .catch(() => {
          // Fallback for offline
          if (request.destination === 'document') {
            return caches.match('./index.html');
          }
        })
    );
  }
  // Network-first strategy for other resources
  else {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try to serve from cache
          return caches.match(request);
        })
    );
  }
});

// Background sync for iOS (limited support)
self.addEventListener('sync', function(event) {
  console.log('Background sync triggered:', event.tag);
});

// Push notifications handler (for future enhancement)
self.addEventListener('push', function(event) {
  console.log('Push message received');
  // Future implementation for notifications
});

// Handle app updates
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker script loaded successfully');