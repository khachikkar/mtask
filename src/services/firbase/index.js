// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBPnYhV6IdEHhkSiiPbPnZTTYcbS0T-lic",
//   authDomain: "jira-b4785.firebaseapp.com",
//   projectId: "jira-b4785",
//   storageBucket: "jira-b4785.appspot.com",
//   messagingSenderId: "769883137200",
//   appId: "1:769883137200:web:9fdc4bbba19e842e90c775",
//   measurementId: "G-8V0Y234JY3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAStpy5lPXkAj8AdTq95XBumRZOFEG4L0o",
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

export {
  db,
  auth
}


