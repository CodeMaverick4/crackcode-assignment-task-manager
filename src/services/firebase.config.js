// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKXDjf-jrNiVpTX_WQuBgSOw7I8NPSiNw",
  authDomain: "crackcode-taskmanager.firebaseapp.com",
  projectId: "crackcode-taskmanager",
  storageBucket: "crackcode-taskmanager.firebasestorage.app",
  messagingSenderId: "558401525287",
  appId: "1:558401525287:web:5da7bb4a251d50a8de2002",
  measurementId: "G-WT99H4KKWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
