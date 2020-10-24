import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
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