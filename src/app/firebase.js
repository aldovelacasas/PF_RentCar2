// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI2QP2Ke9XdfaSL-wG2hPdTSrvVOESaRY",
  authDomain: "autoconnect-dad4a.firebaseapp.com",
  projectId: "autoconnect-dad4a",
  storageBucket: "autoconnect-dad4a.appspot.com",
  messagingSenderId: "56132340135",
  appId: "1:56132340135:web:d3b3f2b711aa3c3526ce82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
