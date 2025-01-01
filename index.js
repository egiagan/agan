var _0xa0fc=["\x41\x49\x7A\x61\x53\x79\x41\x33\x67\x6B\x50\x75\x55\x6E\x51\x42\x63\x6F\x4D\x59\x6A\x4E\x61\x6C\x74\x4A\x2D\x72\x4C\x6B\x71\x65\x65\x34\x61\x50\x51\x67\x77","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65","\x73\x68\x6F\x70\x2D\x70\x61\x79\x2D\x6D\x61\x6E\x61\x67\x65\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x31\x30\x36\x30\x36\x31\x36\x30\x39\x33\x34\x31\x37","\x31\x3A\x31\x30\x36\x30\x36\x31\x36\x30\x39\x33\x34\x31\x37\x3A\x77\x65\x62\x3A\x61\x61\x62\x38\x36\x32\x36\x66\x36\x30\x34\x39\x63\x34\x37\x35\x35\x36\x66\x61\x37\x38","\x47\x2D\x31\x47\x38\x43\x50\x54\x33\x58\x47\x54"];const firebaseConfig={apiKey:_0xa0fc[0],authDomain:_0xa0fc[1],projectId:_0xa0fc[2],storageBucket:_0xa0fc[3],messagingSenderId:_0xa0fc[4],appId:_0xa0fc[5],measurementId:_0xa0fc[6]}
var _0xc4ee=["\x69\x6E\x69\x74\x69\x61\x6C\x69\x7A\x65\x41\x70\x70"];firebase[_0xc4ee[0]](firebaseConfig)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    var fb_user = firebase.auth().currentUser.uid;
    // alert("LoggedIn");
    document.getElementById("loadingtext").style.display="none";
  } else {
    // User is signed out
    // alert("not logged In");
    window.location.replace('/login.html');
  }
});
var db = firebase.firestore();
// Initialized Firebase

function logout(){
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
  fb_user = null;
  }).catch((error) => {
    // An error happened.
  });
}
//testloads

function loaddata(){
window.location.assign("/user.html");
  var fb_user = firebase.auth().currentUser.uid;

  console.log(fb_user);
    // Add a new document in collection "cities"
  db.collection(fb_user).doc("user121").set({
      name: "customers unknown persion",
      state: "canada",
      country: "USA2",
      bill: "500rs",
      phone: "9292019401",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });

var start = document.getElementById('date').value;
var newstr = start.replace(/-/g,',');
var date = new Date(newstr);
var end = document.getElementById('date2').value;
var newstr2 = end.replace(/-/g,',');
var date2 = new Date(newstr2);
  db.collection(fb_user).where('timestamp','>',date).where('timestamp','<',date2).get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
      console.log(doc.data().name);
    })
  });
}

var timestamp = firebase.firestore.Timestamp.now().seconds;
console.log("serial num: ",timestamp-1630000000);
