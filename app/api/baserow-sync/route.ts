/**
 * Saban OS V86.1 - Robust Service Worker
 * -------------------------------------
 * Fix: Handling CORS issues and Google Apps Script redirects.
 * Resilience: Prevent 'Failed to convert value to Response' errors.
 */

const CACHE_NAME = 'saban-os-v86-stable';
const ASSETS = [
  '/admin_pro/pwa',
  '/ai.png',
  '/manifest.json'
];

// התקנה ושמירת נכסי בסיס
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 1. אל תתערב בבקשות ל-Google Scripts או API חיצוניים
  // גוגל דורש ניהול Redirects שה-SW עלול לשבש
  if (url.includes('google.com') || url.includes('googleusercontent.com') || url.includes('supabase.co')) {
    return; // תן לדפדפן לטפל בזה כרגיל
  }

  // 2. אסטרטגיית Cache first, then Network עבור נכסים סטטיים
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // וודא שהתגובה תקינה לפני שמחזירים
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          return networkResponse;
        })
        .catch((err) => {
          // מניעת קריסת ה-SW במקרה של שגיאת רשת/CORS
          console.warn('Saban SW: Fetch failed for', url, err);
          return new Response('Network error or CORS block', {
            status: 408,
            statusText: 'Network Error'
          });
        });
    })
  );
});
