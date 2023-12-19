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
   apiKey: "AIzaSyBhjDn0FiX8X-DihIUxJjcfJQ5KlrKPw9Q",
   authDomain: "test-speed-86e11.firebaseapp.com",
   projectId: "test-speed-86e11",
   storageBucket: "test-speed-86e11.appspot.com",
   messagingSenderId: "757109793416",
   appId: "1:757109793416:web:3419cc945746f4ba91353d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
