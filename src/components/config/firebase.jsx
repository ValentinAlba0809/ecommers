import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByMb5GwMMb1_T40lx-V5bWx1Y4pfOAw7Q",
  authDomain: "ecommerce-6d9e2.firebaseapp.com",
  projectId: "ecommerce-6d9e2",
  storageBucket: "ecommerce-6d9e2.firebasestorage.app",
  messagingSenderId: "462392931099",
  appId: "1:462392931099:web:5894291dec9a8576df59be"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


export const db = getFirestore(app); 
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
