// Service Worker for Luminous Nix
// Provides offline capability and faster loading with advanced caching strategies

const CACHE_VERSION = 'v3.2.0'; // Updated for Phase 6
const STATIC_CACHE = `luminous-nix-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `luminous-nix-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `luminous-nix-images-${CACHE_VERSION}`;

// Maximum cache sizes
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 30;

// Cache expiration time (7 days in milliseconds)
const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

// Files to cache for offline access
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/404.html',
    '/privacy.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/humans.txt',
    '/og-image.svg',
    '/blog/',
    '/blog/index.html',
    '/blog/feed.xml'
];

// Helper function to limit cache size
async function limitCacheSize(cacheName, maxSize) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > maxSize) {
        const keysToDelete = keys.slice(0, keys.length - maxSize);
        await Promise.all(keysToDelete.map(key => cache.delete(key)));
        console.log(`[SW] Trimmed ${cacheName} from ${keys.length} to ${maxSize} entries`);
    }
}

// Helper function to check cache freshness
function isCacheFresh(cachedResponse) {
    if (!cachedResponse) return false;

    const cachedDate = new Date(cachedResponse.headers.get('date'));
    const now = new Date();
    const age = now - cachedDate;

    return age < CACHE_EXPIRATION_TIME;
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker v3.2.0...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Installation complete, skipping waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker v3.2.0...');

    const expectedCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => !expectedCaches.includes(name))
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activation complete, claiming clients');
                return self.clients.claim();
            })
    );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // Skip external requests (Ko-fi, Formspree, GitHub API, etc.)
    if (url.origin !== location.origin) {
        // But allow GitHub API with network-first strategy
        if (url.hostname === 'api.github.com') {
            event.respondWith(networkFirstStrategy(event.request, DYNAMIC_CACHE));
        }
        return;
    }

    // Route requests to appropriate strategies
    if (STATIC_ASSETS.includes(url.pathname)) {
        // Cache-first for static assets
        event.respondWith(cacheFirstStrategy(event.request, STATIC_CACHE));
    } else if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) {
        // Cache-first for images with size limit
        event.respondWith(cacheFirstStrategy(event.request, IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE));
    } else if (url.pathname.startsWith('/blog/')) {
        // Stale-while-revalidate for blog content
        event.respondWith(staleWhileRevalidateStrategy(event.request, DYNAMIC_CACHE));
    } else {
        // Network-first for other dynamic content
        event.respondWith(networkFirstStrategy(event.request, DYNAMIC_CACHE));
    }
});

// Cache-first strategy: Try cache, fallback to network
async function cacheFirstStrategy(request, cacheName, maxSize) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse && isCacheFresh(cachedResponse)) {
        console.log('[SW] Cache hit (fresh):', request.url);
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, networkResponse.clone());

            if (maxSize) {
                await limitCacheSize(cacheName, maxSize);
            }

            console.log('[SW] Network success, cached:', request.url);
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, using stale cache:', request.url);

        // Return stale cache if network fails
        if (cachedResponse) {
            return cachedResponse;
        }

        // For navigation requests, return 404 page
        if (request.mode === 'navigate') {
            return caches.match('/404.html');
        }

        throw error;
    }
}

// Network-first strategy: Try network, fallback to cache
async function networkFirstStrategy(request, cacheName) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, networkResponse.clone());
            await limitCacheSize(cacheName, MAX_DYNAMIC_CACHE_SIZE);

            console.log('[SW] Network success:', request.url);
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);

        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // For navigation requests, return 404 page
        if (request.mode === 'navigate') {
            return caches.match('/404.html');
        }

        throw error;
    }
}

// Stale-while-revalidate strategy: Return cache immediately, update in background
async function staleWhileRevalidateStrategy(request, cacheName) {
    const cachedResponse = await caches.match(request);

    // Fetch from network in background
    const fetchPromise = fetch(request)
        .then(async (networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                const cache = await caches.open(cacheName);
                await cache.put(request, networkResponse.clone());
                await limitCacheSize(cacheName, MAX_DYNAMIC_CACHE_SIZE);
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[SW] Background fetch failed:', request.url);
        });

    // Return cached version immediately, or wait for network
    return cachedResponse || fetchPromise;
}

// Message event - for manual cache updates and communication
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[SW] Received SKIP_WAITING message');
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        console.log('[SW] Received request to cache URLs:', event.data.urls);
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then((cache) => cache.addAll(event.data.urls))
                .then(() => limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE))
        );
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        console.log('[SW] Received request to clear cache');
        event.waitUntil(
            caches.keys()
                .then((cacheNames) => Promise.all(
                    cacheNames.map((name) => caches.delete(name))
                ))
        );
    }

    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        console.log('[SW] Received request for cache size');
        event.waitUntil(
            caches.keys()
                .then(async (cacheNames) => {
                    let totalSize = 0;
                    for (const name of cacheNames) {
                        const cache = await caches.open(name);
                        const keys = await cache.keys();
                        totalSize += keys.length;
                    }
                    return totalSize;
                })
                .then((size) => {
                    event.ports[0].postMessage({ cacheSize: size });
                })
        );
    }
});

// Periodic cache cleanup (runs when service worker is active)
async function performCacheCleanup() {
    console.log('[SW] Performing periodic cache cleanup');

    // Clean up expired cache entries
    const cacheNames = await caches.keys();

    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();

        for (const request of requests) {
            const response = await cache.match(request);
            if (response && !isCacheFresh(response)) {
                await cache.delete(request);
                console.log('[SW] Deleted expired cache:', request.url);
            }
        }
    }

    // Enforce size limits
    await limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
    await limitCacheSize(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);

    console.log('[SW] Cache cleanup complete');
}

// Run cleanup on activation and periodically
self.addEventListener('activate', (event) => {
    event.waitUntil(performCacheCleanup());
});

console.log('[SW] Service worker v3.2.0 loaded with advanced caching strategies');
