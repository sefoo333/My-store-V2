// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWCCI7OxYDgzdgp-PhjmQZAwqMdDlbxvQ",
  authDomain: "sefoo-store.firebaseapp.com",
  projectId: "sefoo-store",
  storageBucket: "sefoo-store.firebasestorage.app",
  messagingSenderId: "170816251350",
  appId: "1:170816251350:web:84c870618dd9b5cb28f077",
  measurementId: "G-EL5H83JSR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);


// don't forget => npm install -g firebase-tools