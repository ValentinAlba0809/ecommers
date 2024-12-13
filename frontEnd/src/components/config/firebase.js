import { initializeApp, getApps } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjmskVnZRhKpwUm3_dPvfiYuXw5RpOt7I",
  authDomain: "ecommerce-c2fbe.firebaseapp.com",
  projectId: "ecommerce-c2fbe",
  storageBucket: "ecommerce-c2fbe.firebasestorage.app",
  messagingSenderId: "44987637196",
  appId: "1:44987637196:web:81b2c783aed890b362d169",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
