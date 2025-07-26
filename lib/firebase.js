// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIsjpNXJQLxcoMKHKTvnjDY2bzFrj69m8",
  authDomain: "rastreo-monkys.firebaseapp.com",
  projectId: "rastreo-monkys",
  storageBucket: "rastreo-monkys.firebasestorage.app",
  messagingSenderId: "71804883506",
  appId: "1:71804883506:web:a38815cbbcbbe958e6622b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };