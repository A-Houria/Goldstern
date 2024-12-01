// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Qm8h7rehLiUPU2ga10mmBd5p9_6uNVI",
  authDomain: "goldstern-99b27.firebaseapp.com",
  projectId: "goldstern-99b27",
  storageBucket: "goldstern-99b27.firebasestorage.app",
  messagingSenderId: "754868940403",
  appId: "1:754868940403:web:107370b50121cdc5c88406",
  measurementId: "G-BM963E7WTD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
