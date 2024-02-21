// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,                                   // Coloque su apikey de firebase
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,                           // Coloque su dominio
  projectId: import.meta.env.VITE_PROJECT_ID,                             // Coloque el id de su proyecto de fireBase
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,                     // Coloque su STORAGE_BUCKET
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,            // Coloque su SenderId
  appId: import.meta.env.VITE_APP_ID                                      // Coloque su appId
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FireBaseAuth = getAuth(FirebaseApp);

export const FireBaseDB =  getFirestore(FirebaseApp); 