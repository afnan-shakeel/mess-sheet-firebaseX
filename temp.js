// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_40gZMh6Y2_mZMPq4S9jCy0ICIwVtEY4",
  authDomain: "mess-sheet-df9b4.firebaseapp.com",
  projectId: "mess-sheet-df9b4",
  storageBucket: "mess-sheet-df9b4.appspot.com",
  messagingSenderId: "545458539151",
  appId: "1:545458539151:web:7cd5c2e704a30d3ff3fefa",
  measurementId: "G-JBHK05LKRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);