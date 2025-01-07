import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import { getAuth, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
    authDomain: "login-egi-agan.firebaseapp.com",
    databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
    projectId: "login-egi-agan",
    storageBucket: "login-egi-agan.firebasestorage.app",
    messagingSenderId: "395059466114",
    appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const auth = getAuth();
auth.languageCode = 'it';
const analytics = getAnalytics(app);

console.log(provider)


const facebook_login = document.getElementById('facebookBtn');

facebook_login.addEventListener('click', function (event) {
  event.preventDefault();



  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      alert(result);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      alert(errorMessage)
      // ...
    });

})
