// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC94oTIkivlPqTwc3lqowFNI-wD1qchoY",
  authDomain: "ezhuth-a9f96-376ec.firebaseapp.com",
  projectId: "ezhuth-a9f96",
  storageBucket: "ezhuth-a9f96.appspot.com",
  messagingSenderId: "117451217266",
  appId: "1:117451217266:web:c8179dc6d07a7659af25eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);