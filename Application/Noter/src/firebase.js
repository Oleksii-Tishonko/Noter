//This is a test app, test project from the console

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCJWGEEUHu_p275dNrN-7HIUer2VjiEzac",
   authDomain: "test-firebase-aef.firebaseapp.com",
   projectId: "test-firebase-aef",
   storageBucket: "test-firebase-aef.appspot.com",
   messagingSenderId: "487867075930",
   appId: "1:487867075930:web:2b9a0fa0f7ba30b2d2b763",
   measurementId: "G-1H7HMN34ML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
