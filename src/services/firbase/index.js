
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "jira-c10d1.firebaseapp.com",
  projectId: "jira-c10d1",
  storageBucket: "jira-c10d1.appspot.com",
  messagingSenderId: "871275944964",
  appId: "1:871275944964:web:c4271e64aeb48c701e2951",
  measurementId: "G-YS5P2MPLTK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) // createing a firebase databasa

const auth = getAuth(app);
const storage = getStorage(app)


export {
  db,
  auth,
  storage
}


