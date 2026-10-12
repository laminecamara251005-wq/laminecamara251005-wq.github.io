importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD67E8efC3xhu2Uavp3htKhDnOjZDkRz94",
  authDomain: "baraka-gp.firebaseapp.com",
  projectId: "baraka-gp",
  storageBucket: "baraka-gp.firebasestorage.app",
  messagingSenderId: "708826047607",
  appId: "1:708826047607:web:0b1c85defdc1a157f5d272"
});

const messaging = firebase.messaging();

// Copie à la racine du domaine de /baraka-gp/firebase-messaging-sw.js —
// nécessaire uniquement parce que le SDK Firebase (Cloud Functions comme
// Messaging) tente par défaut d'enregistrer/trouver un service worker à ce
// chemin racine, même pour un site hébergé dans un sous-dossier. La vraie
// gestion des notifications de Baraka GP reste assurée par la copie dans
// /baraka-gp/, enregistrée explicitement par l'appli avec le bon scope.
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'Baraka GP';
  const body = data.body || '';
  self.registration.showNotification(title, {
    body,
    icon: 'https://laminecamara251005-wq.github.io/baraka-gp/icons/icon-192.png',
    badge: 'https://laminecamara251005-wq.github.io/baraka-gp/icons/icon-192.png',
    tag: data.tag || undefined,
    data: { url: data.url || 'https://laminecamara251005-wq.github.io/baraka-gp/index.html' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || 'https://laminecamara251005-wq.github.io/baraka-gp/index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
