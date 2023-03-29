// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoYJ9zRXRq8kgIwypSXlRwtbSc1H9NSI0",
  authDomain: "note-app-578ae.firebaseapp.com",
  projectId: "note-app-578ae",
  storageBucket: "note-app-578ae.appspot.com",
  messagingSenderId: "143875424237",
  appId: "1:143875424237:web:809331eed584f6c5e331e4",
  measurementId: "G-L5GD0YPYF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
