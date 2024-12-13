// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDefLJj9TuQqpbu1j9fxjVpmniVv-op2o",
  authDomain: "movie-app-307dc.firebaseapp.com",
  projectId: "movie-app-307dc",
  storageBucket: "movie-app-307dc.appspot.com", 
  messagingSenderId: "241984526606",
  appId: "1:241984526606:web:6215bc35c5088a061c5f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);