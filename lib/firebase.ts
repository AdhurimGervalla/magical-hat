// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { doc, getDoc, Timestamp, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
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
export const fromMillis = Timestamp.fromMillis;

export const getUsernameWithUid = async (user: User) => {
  const docRef = doc(firestore, 'users', user.uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return {...data};
}

/**
 *
 * @param doc
 * @return {*&{createdAt, updatedAt}}
 */
 export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }

}

