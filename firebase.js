import "firebase/auth";
// Import the functions you need from the SDKs you need
import firebase from 'firebase'


const firebaseConfig = {

  apiKey: "AIzaSyBL-kNc-CMKkom6sZG2kTmQQBhUNILw-GQ",

  authDomain: "docsclone-d394c.firebaseapp.com",

  projectId: "docsclone-d394c",

  storageBucket: "docsclone-d394c.appspot.com",

  messagingSenderId: "158546121823",

  appId: "1:158546121823:web:04b852b4ba1ac7759eb7ea",

  measurementId: "G-9KFD1LTB61"

};



const app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()

const auth = firebase.auth()
export { db, auth };

export default app;


