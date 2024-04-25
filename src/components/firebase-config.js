// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/database'; 
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD5yL_mLlSasCoY152dv5E2NpdIkiDrur0",
    authDomain: "prueba-36dc0.firebaseapp.com",
    projectId: "prueba-36dc0",
    storageBucket: "prueba-36dc0.appspot.com",
    messagingSenderId: "323265500791",
    appId: "1:323265500791:web:8d7a9bef782c5ac8715872",
    measurementId: "G-EQJY7VV0H0"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;