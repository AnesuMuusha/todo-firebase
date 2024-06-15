import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCYy2QwMKllMeywy3cGS0nBuvIs8kKHq54",
    authDomain: "todo-firebase-4ffc5.firebaseapp.com",
    projectId: "todo-firebase-4ffc5",
    storageBucket: "todo-firebase-4ffc5.appspot.com",
    messagingSenderId: "477744282064",
    appId: "1:477744282064:web:48e5cdf99824083a9d21d5",
    measurementId: "G-84988ZJEX3"
});

const db = firebaseApp.firestore();

export default db;

