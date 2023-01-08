import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOlhC-p7WM0owWhjs1BDQ16gO_V6RRAbc",
    authDomain: "global-896bb.firebaseapp.com",
    projectId: "global-896bb",
    storageBucket: "global-896bb.appspot.com",
    messagingSenderId: "783235427441",
    appId: "1:783235427441:web:05e4177bd834c385e9bfd0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);