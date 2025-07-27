import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAY6GPuBQ2TddggvYf6cQniIz6J41h0muU",
  authDomain: "lci-dashboard.firebaseapp.com",
  databaseURL: "https://lci-dashboard-default-rtdb.firebaseio.com",
  projectId: "lci-dashboard",
  storageBucket: "lci-dashboard.firebasestorage.app",
  messagingSenderId: "271318674008",
  appId: "1:271318674008:web:4c2e04266537f5312bf82d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);