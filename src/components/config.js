import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, remove, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYy2QwMKllMeywy3cGS0nBuvIs8kKHq54",
  authDomain: "todo-firebase-4ffc5.firebaseapp.com",
  projectId: "todo-firebase-4ffc5",
  storageBucket: "todo-firebase-4ffc5.appspot.com",
  messagingSenderId: "477744282064",
  appId: "1:477744282064:web:48e5cdf99824083a9d21d5",
  measurementId: "G-84988ZJEX3",
  databaseURL: "https://todo-firebase-4ffc5-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { auth, provider, db };
