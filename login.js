var _0xa0fc=["\x41\x49\x7A\x61\x53\x79\x41\x33\x67\x6B\x50\x75\x55\x6E\x51\x42\x63\x6F\x4D\x59\x6A\x4E\x61\x6C\x74\x4A\x2D\x72\x4C\x6B\x71\x65\x65\x34\x61\x50\x51\x67\x77","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x31\x30\x36\x30\x36\x31\x36\x30\x39\x33\x34\x31\x37","\x31\x3A\x31\x30\x36\x30\x36\x31\x36\x30\x39\x33\x34\x31\x37\x3A\x77\x65\x62\x3A\x61\x61\x62\x38\x36\x32\x36\x66\x36\x30\x34\x39\x63\x34\x37\x35\x35\x36\x66\x61\x37\x38","\x47\x2D\x31\x47\x38\x43\x50\x54\x33\x58\x47\x54"];        const firebaseConfig = {
            apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
            authDomain: "login-egi-agan.firebaseapp.com",
            databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
            projectId: "login-egi-agan",
            storageBucket: "login-egi-agan.firebasestorage.app",
            messagingSenderId: "395059466114",
            appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
     };   
        const app = initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    // alert("LoggedIn");
    window.location.replace('/Shop-payment-io');
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
