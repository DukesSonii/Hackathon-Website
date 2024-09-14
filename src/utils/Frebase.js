// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2wA97_BDMAieTFO6EEcYd8CBvvsCGN1o",
  authDomain: "netflixgpt-98d9c.firebaseapp.com",
  projectId: "netflixgpt-98d9c",
  storageBucket: "netflixgpt-98d9c.appspot.com",
  messagingSenderId: "20936546044",
  appId: "1:20936546044:web:c85a7775623d691628e979",
  measurementId: "G-XQ2VEYB12D",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
