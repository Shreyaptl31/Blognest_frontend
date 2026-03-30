import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_ldAVFokMfHKiz5yDLdf5VQ64pYkl6Wk",
    authDomain: "blognest-bb5b7.firebaseapp.com",
    projectId: "blognest-bb5b7",
    storageBucket: "blognest-bb5b7.firebasestorage.app",
    messagingSenderId: "669946379587",
    appId: "1:669946379587:web:e55deda4438e4c61a943f6",
    measurementId: "G-MWMPC0QGV0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();