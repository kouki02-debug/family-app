// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyARvvHwazgHUjbBidZ1wBRIncBToZRFRDc",
  authDomain: "family-app-61993.firebaseapp.com",
  databaseURL: "https://family-app-61993-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "family-app-61993",
  storageBucket: "family-app-61993.firebasestorage.app",
  messagingSenderId: "623751517146",
  appId: "1:623751517146:web:3f125c5c7498e39558e6e3"
});

const messaging = firebase.messaging();

// バックグラウンド通知の受信
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🏠 家族のページ', {
    body: body || '',
    icon: icon || '/family-app/icon.png',
    badge: '/family-app/icon.png',
    tag: payload.data?.tag || 'family-app',
    renotify: true,
    data: payload.data || {}
  });
});

// 通知クリックでアプリを開く
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('family-app') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://kouki02-debug.github.io/family-app/');
    })
  );
});
