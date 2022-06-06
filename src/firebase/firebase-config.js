// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'react-app-1b444.firebaseapp.com',
  projectId: 'react-app-1b444',
  storageBucket: 'react-app-1b444.appspot.com',
  messagingSenderId: '965481887734',
  appId: '1:965481887734:web:292e3a7e13a75126d579d7'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  firebase
}
