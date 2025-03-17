import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxEztEq-7Umm0yoxOGvXXhjEGzt9S9sbk",
  authDomain: "task-manager-b4f86.firebaseapp.com",
  projectId: "task-manager-b4f86",
  storageBucket: "task-manager-b4f86.firebasestorage.app",
  messagingSenderId: "152121108818",
  appId: "1:152121108818:web:5ec3d4cc0ac15563ad728b",
  measurementId: "G-LKBKMXFTPW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
