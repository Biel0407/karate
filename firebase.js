import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCNZyWN4m8QSk3ZFxEQVHX8l11QakZHcBU",
    authDomain: "site-karate-8fcd9.firebaseapp.com",
    projectId: "site-karate-8fcd9",
    storageBucket: "site-karate-8fcd9.firebasestorage.app",
    messagingSenderId: "326786957027",
    appId: "1:326786957027:web:309ccf796594b6b1cb0fd6",
    measurementId: "G-TSN2ZPTDNW"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);