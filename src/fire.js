import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBG-cjw1rMM7s2D3yW9hR7emtovXXGmYR0",
    authDomain: "internship-assignment-c65f3.firebaseapp.com",
    projectId: "internship-assignment-c65f3",
    storageBucket: "internship-assignment-c65f3.appspot.com",
    messagingSenderId: "743280026312",
    appId: "1:743280026312:web:b2bdea1ffeb17ad6227bfd"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const firestore = getFirestore();
export const auth = getAuth();
export default app;