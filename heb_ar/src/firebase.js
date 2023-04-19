import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCn2-JqF64DbFbjPkqNU8_jcDx2FrJLkfM",
    authDomain: "hebar-e5.firebaseapp.com",
    projectId: "hebar-e5",
    storageBucket: "hebar-e5.appspot.com",
    messagingSenderId: "951134076116",
    appId: "1:951134076116:web:e069b8c6b7766adfbe0f41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export constants
export const auth = getAuth(app);
export const firestore = getFirestore(app);