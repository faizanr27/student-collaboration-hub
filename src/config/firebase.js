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
  apiKey: "AIzaSyAfXwApLB1ia1bMl-wz3irdpWJ1h57kbD0",
  authDomain: "student-collab-hub-ddda5.firebaseapp.com",
  databaseURL: "https://student-collab-hub-ddda5-default-rtdb.firebaseio.com",
  projectId: "student-collab-hub-ddda5",
  storageBucket: "student-collab-hub-ddda5.appspot.com",
  messagingSenderId: "222148868627",
  appId: "1:222148868627:web:1fc56b9931eba331ab5de6"
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
