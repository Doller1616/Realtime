//Event that shows a notification when is received by push
self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
    //   body: "Push notification from section.io", //the body of the push notification
      image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
      icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/"
    });
});

//Event on notification click (have problems almost in Chrome)
self.addEventListener('notificationclick', () => {
    console.log('Notificación pulsada!');
});