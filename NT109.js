import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);
const analytics = getAnalytics(firebase);

// end firebase config

// DOM

const loginBtn = document.getElementById("login_btn").addEventListener("click", function(event){
  login();
  event.preventDefault();
});
const signupBtn = document.getElementById("signup_btn").addEventListener("click", function(event){
  register();
  event.preventDefault();
});
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const USER_COLLECTION = "Users";

// loginBtn.onclick = function () {
//   login();
// };

// signupBtn.onclick = function () {
//   register();
// };

async function register() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password Invalid");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        const user = userCredential.user;
        const user_data = {
          email: email,
          last_login: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        set(userRef, user_data)
          .then(() => {
            return alert("Account Has Been Created");            
          })
          .catch((error) => {
            return alert(error.message);
          });
      })
      .catch(function (error) {
        const error_code = error.code;
        const error_message = error.message;
        return alert(error_message);
      });
  }
}
async function login() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password Invalid");
  } else {
    await signInWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        console.log(userCredential);
        const user = userCredential.user;
        const user_data = {
          last_login: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        update(userRef, user_data)
          .then(() => {
            window.location.href ="dashboard.html"
            return alert("User Has Logged In");
          })
          .catch((error) => {
            return alert(error.message);
          });
      })
      .catch(function (error) {
        const error_code = error.code;
        const error_message = error.message;
        return alert(error_message);
      });
  }
}
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}
function validate_password(password) {
  if (password < 8) {
    return false;
  } else {
    return true;
  }
}
