// Service Worker for Akbenli Website
const CACHE_NAME = 'akbenli-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/about.html',
    '/contact.html',
    '/styles.css',
    '/script.js',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Inter:wght@400;500&display=swap',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});