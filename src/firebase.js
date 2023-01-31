import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJQnazYJelPUIHubJZ3SSn5UzXpHv4Wr8",
  authDomain: "auth-react-93cf8.firebaseapp.com",
  projectId: "auth-react-93cf8",
  storageBucket: "auth-react-93cf8.appspot.com",
  messagingSenderId: "598562511594",
  appId: "1:598562511594:web:48edd5dea683b0a225d593",
  measurementId: "G-NWQZS6ZQZP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
