import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAIc14vLU2aCeq2qYhwBdUCG1OAAGzE0bI",
    authDomain: "spmi-health-declaration.firebaseapp.com",
    databaseURL: "https://spmi-health-declaration.firebaseio.com",
    projectId: "spmi-health-declaration",
    storageBucket: "spmi-health-declaration.appspot.com",
    messagingSenderId: "799466451744",
    appId: "1:799466451744:web:cf78291ef6d61d13e9dd45",
    measurementId: "G-VF2R9GJB3N"
}

// firebase utils
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = fb.auth()
const currentUser = fb.auth().currentUser
const messaging = fb.messaging()

export {
  fb,
  db,
  auth,
  messaging,
  currentUser
}