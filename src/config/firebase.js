// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb8HAuoDaIVuou2xCugwLDSxyhWSwhWYQ",
    authDomain: "jokitugaskoding.firebaseapp.com",
    projectId: "jokitugaskoding",
    storageBucket: "jokitugaskoding.appspot.com",
    messagingSenderId: "350512187496",
    appId: "1:350512187496:web:7143c0d50634144a2a93dd"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
}

const db = getFirestore(app);

export {auth, db, signInWithGoogle}