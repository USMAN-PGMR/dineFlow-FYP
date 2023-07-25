// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFGuXrXOwpibTi0DFz84BdhJVq3AvdxLA",
  authDomain: "professional-pizza-restaurant.firebaseapp.com",
  projectId: "professional-pizza-restaurant",
  storageBucket: "professional-pizza-restaurant.appspot.com",
  messagingSenderId: "612286822449",
  appId: "1:612286822449:web:dba2733b0293ce1664fd10",
  measurementId: "G-MWEL041PHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);




// for use in the other files
export {app,analytics,auth,firestore,storage}