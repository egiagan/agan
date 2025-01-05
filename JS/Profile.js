import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, deleteDoc, getDocs, collection, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

const onSnapshot = await getDocs(collection(db, "Users"));
    onSnapshot.forEach((doc) => {
        console.log(`Users Collection --> ${doc.id} => ${JSON.stringify(doc.data())}`);
        document.getElementById('showName').innerHTML = doc.data().Name.toUpperCase()
        document.getElementById('showFatherName').innerHTML = doc.data().FatherName.toUpperCase()
        document.getElementById('showNumber').innerHTML = 
        `<i class="fa-solid fa-mobile" id="mobile"></i>${doc.data().Phone}`
    })

// window.del=async(id)=> {
//     console.log(id);
//     await deleteDoc(doc(db, "Users", id));
//     Swal.fire({
//         title: `Delete User`,
//         text: `Delete User Successfully `,
//         icon: 'success',
//         confirmButtonText: 'OK'
//     });     
// }

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User Checking UID: ",uid);
    } 
    else {
        Swal.fire({
            title: `Account`,
            text: `First Create An Account`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        function wrong(){
            window.location.href = "./SignUp.html"
        }
        setInterval(wrong, 3000);
    }
  });

const cut = document.getElementById("cut")
cut.addEventListener('click', () => {
    window.location.href = "./Web.html";
})
