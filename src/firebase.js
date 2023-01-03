import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9pYxOLU8D3F3EnW_2EMyeNDcARQUygfA",
    authDomain: "clone-76b76.firebaseapp.com",
    projectId: "clone-76b76",
    storageBucket: "clone-76b76.appspot.com",
    messagingSenderId: "1025337605736",
    appId: "1:1025337605736:web:6687ef90fda8f7d515c5dd",
    measurementId: "G-8F528RYW3Y",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
