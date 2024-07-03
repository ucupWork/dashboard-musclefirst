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
  apiKey: process.env.DASBOARD_M1_APIKEY,
  authDomain: "musclefirst-development.firebaseapp.com",
  projectId: "musclefirst-development",
  storageBucket: "musclefirst-development.appspot.com",
  messagingSenderId: process.env.DASBOARD_M1_MESSAGING_SENDER_ID,
  appId: process.env.DASBOARD_M1_APP_ID,
  measurementId: process.env.DASBOARD_M1_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);