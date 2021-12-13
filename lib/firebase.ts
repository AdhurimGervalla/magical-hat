// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithEmailLink } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8QGKnQfx4v-ytCqbPDJgrqdnjty61Xmg",
  authDomain: "magical-hat.firebaseapp.com",
  projectId: "magical-hat",
  storageBucket: "magical-hat.appspot.com",
  messagingSenderId: "948191365167",
  appId: "1:948191365167:web:3bdc5b184a9c3bf8d2deda",
  measurementId: "G-HSNWQBESNJ"
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

export const googleAuthProvider = new GoogleAuthProvider();