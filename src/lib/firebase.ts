import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import firebaseConfigJson from '../../firebase-applet-config.json';

// Fallback configuration if json fields are empty
const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey || "AIzaSyAhPCQ7HYAFlhXLzGrnm_wZZ2zIdCseLDw",
  authDomain: firebaseConfigJson.authDomain || "gen-lang-client-0144282803.firebaseapp.com",
  projectId: firebaseConfigJson.projectId || "gen-lang-client-0144282803",
  storageBucket: firebaseConfigJson.storageBucket || "gen-lang-client-0144282803.firebasestorage.app",
  messagingSenderId: firebaseConfigJson.messagingSenderId || "360307001093",
  appId: firebaseConfigJson.appId || "1:360307001093:web:556201effd64d73639d96c"
};

// Initialize App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId from config if provided
export const db = initializeFirestore(app, {}, firebaseConfigJson.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
