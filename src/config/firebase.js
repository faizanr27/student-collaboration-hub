// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBq6U3PvcfwOfqvAfQLzdVf3bP-wCX-a38",
    authDomain: "campus-connect-ce351.firebaseapp.com",
    projectId: "campus-connect-ce351",
    storageBucket: "campus-connect-ce351.appspot.com",
    messagingSenderId: "372561606478",
    appId: "1:372561606478:web:bfed896a5473167cdb501f",
    measurementId: "G-6J95V1YBWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);
const storage=getStorage(app)
const googleProvider = new GoogleAuthProvider()
export { auth, db, googleProvider,storage, onAuthStateChanged }
export default firebaseConfig
