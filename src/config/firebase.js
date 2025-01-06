import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKFmdF00Fne9ZM9ylGuUEj6zfHcnbHal4",
  authDomain: "task-management-c22fd.firebaseapp.com",
  projectId: "task-management-c22fd",
  storageBucket: "task-management-c22fd.firebasestorage.app",
  messagingSenderId: "645849453996",
  appId: "1:645849453996:web:0eeff3c0d2aeb20e865609",
  measurementId: "G-XGCL11JSW5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



export { app, auth, googleProvider };
