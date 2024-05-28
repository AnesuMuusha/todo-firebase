import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { GoogleAuthProvider } from 'firebase/auth/cordova';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCYy2QwMKllMeywy3cGS0nBuvIs8kKHq54",
  authDomain: "todo-firebase-4ffc5.firebaseapp.com",
  projectId: "todo-firebase-4ffc5",
  storageBucket: "todo-firebase-4ffc5.appspot.com",
  messagingSenderId: "477744282064",
  appId: "1:477744282064:web:48e5cdf99824083a9d21d5",
  measurementId: "G-84988ZJEX3"
})

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
// Detect auth state

auth.onAuthStateChanged(user =>{

});


onAuthStateChanged(auth, user=>{
  if(user !== null){
    console.log('logged in!')
  }else{
    console.log('No user!')
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <App />
   
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

