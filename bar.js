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
const analytics = getAnalytics(app);
const auth = getAuth();

const provider = new FacebookAuthProvider();

// Facebook login button click event listener
document.getElementById("facebookBtn").addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            alert("Welcome " + user.displayName);
            console.log(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);

            // Specific handling for different error codes
            switch (errorCode) {
                case 'auth/account-exists-with-different-credential':
                    alert('An account already exists with the same email address but different sign-in credentials.');
                    break;
                case 'auth/auth-domain-config-required':
                    alert('Your authentication domain is not configured.');
                    break;
                case 'auth/cancelled-popup-request':
                    // User cancelled the login popup
                    break;
                case 'auth/popup-blocked':
                    alert('Popup blocked. Please enable popups in your browser settings.');
                    break;
                default:
                    alert(errorMessage);
            }
        });
});
