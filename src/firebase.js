// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBre_DojbpD3ohY0QZksvjpOzsSBEbLzhM",
    authDomain: "buddy-chat-app-93484.firebaseapp.com",
    projectId: "buddy-chat-app-93484",
    storageBucket: "buddy-chat-app-93484.appspot.com",
    messagingSenderId: "428611896559",
    appId: "1:428611896559:web:5e10adf2f3f5397543471a"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
