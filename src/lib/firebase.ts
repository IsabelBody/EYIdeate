// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBre_DojbpD3ohY0QZksvjpOzsSBEbLzhM",
    authDomain: "buddy-chat-app-93484.firebaseapp.com",
    projectId: "buddy-chat-app-93484",
    storageBucket: "buddy-chat-app-93484.appspot.com",
    messagingSenderId: "428611896559",
    appId: "1:428611896559:web:5e10adf2f3f5397543471a",
    databaseURL:"https://buddy-chat-app-93484-default-rtdb.firebaseio.com/"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realTimeDb = getDatabase(app);
