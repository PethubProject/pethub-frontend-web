importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyB6x7lhTmMu7Hu1T8ohS6YNmooU7_Ldsys",
  authDomain: "fir-test-9fe38.firebaseapp.com",
  projectId: "fir-test-9fe38",
  storageBucket: "fir-test-9fe38.appspot.com",
  messagingSenderId: "1061045071639",
  appId: "1:1061045071639:web:8fee234f7e69b8cdaa9152",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
