import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5nSjrK51UXztzx5W2xyoKLWzO9iSOvNE",
    authDomain: "tasklist-cc6c3.firebaseapp.com",
    projectId: "tasklist-cc6c3",
    storageBucket: "tasklist-cc6c3.appspot.com",
    messagingSenderId: "243662834937",
    appId: "1:243662834937:web:0f657e932e1e8d66a06628",
    measurementId: "G-6KPV8JLZ4L"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };