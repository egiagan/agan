  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
    authDomain: "login-egi-agan.firebaseapp.com",
    projectId: "login-egi-agan",
    storageBucket: "login-egi-agan.firebasestorage.app",
    messagingSenderId: "395059466114",
    appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
// Initialized Firebase

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    // alert("LoggedIn");
    window.location.replace('https://www.egiagan.com/');
  } else {
    // User is signed out
    // alert("not logged In");
  }
});

function login(){
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      document.getElementById('msgid').innerText="Incorrect UserID or Password.";
      document.getElementById('msgid').style.opacity='1';
      setTimeout(function () {
        document.getElementById('msgid').style.opacity='0';
      }, 5000);
    });

}

function reset(){
  var email = document.querySelector("#email").value;
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    document.getElementById('msgid').innerText="Password reset email sent!.";
    document.getElementById('msgid').style.opacity='1';
    document.getElementById('msgid').style.color='green';
    setTimeout(function () {
      document.getElementById('msgid').style.opacity='0';
      document.getElementById('msgid').style.color='red';
    }, 5000);
  })
  .catch((error) => {
    // var errorCode = error.code;
    // var errorMessage = error.message;
    document.getElementById('msgid').innerText="Invalid UserID.";
    document.getElementById('msgid').style.opacity='1';
    setTimeout(function () {
      document.getElementById('msgid').style.opacity='0';
    }, 5000);
  });
}

function reset_page(){
  document.getElementById('password').style.display="none";
  document.getElementById('forgot').style.display="none";
  document.getElementById('login').style.display="none";
  document.getElementById('reset').style.display="block";
  document.getElementById('login_page').style.display="block";
}
function login_page(){
  document.getElementById('password').style.display="block";
  document.getElementById('forgot').style.display="block";
  document.getElementById('login').style.display="block";
  document.getElementById('reset').style.display="none";
  document.getElementById('login_page').style.display="none";
}
