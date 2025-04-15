// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGgH20_3Rikn5epHVDSUH1DRTXYKSrauI",
  authDomain: "todo-37f64.firebaseapp.com",
  projectId: "todo-37f64",
  storageBucket: "todo-37f64.firebasestorage.app",
  messagingSenderId: "113216369542",
  appId: "1:113216369542:web:f3cf2895a91b7f1ee2b207",
  measurementId: "G-Y011PBE2GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };