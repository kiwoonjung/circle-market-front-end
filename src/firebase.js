import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZthxcqVeB8kabA3IdmTGL0kScOeI77Po",
  authDomain: "circle-market.firebaseapp.com",
  projectId: "circle-market",
  storageBucket: "circle-market.appspot.com",
  messagingSenderId: "981705490539",
  appId: "1:981705490539:web:66aca5d2388c8878f4312e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
