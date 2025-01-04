(function () {
    
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
        authDomain: "login-egi-agan.firebaseapp.com",
        databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
        projectId: "login-egi-agan",
        storageBucket: "login-egi-agan.firebasestorage.app",
        messagingSenderId: "395059466114",
        appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //Get Elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignup = document.getElementById("btnSignup");

    //Add Login Event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        //sign in with firebase auth
        auth.signInWithEmailAndPassword(email, password).then(user =>{
            alert("Login Successful :)");
        }).catch(err => {
            alert(err.message);
        });
        
    });

    //Add Signup Event
    btnSignup.addEventListener('click', e => {

        //get email and password
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();

        //sign in with firebase auth
        const promise = auth.createUserWithEmailAndPassword(email, password).then(user => {
            alert("Signup Successful :)")
        }).catch(err => {
            alert(err.message);
        });

    });


}());
