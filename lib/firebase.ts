
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton instances cached in module scope
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getApp_(): FirebaseApp {
    if (!_app) {
        _app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    }
    return _app;
}

function getDb(): Firestore {
    if (!_db) {
        _db = getFirestore(getApp_());
    }
    return _db;
}

function getAuth_(): Auth {
    if (!_auth) {
        _auth = getAuth(getApp_());
    }
    return _auth;
}

function getStorage_(): FirebaseStorage {
    if (!_storage) {
        _storage = getStorage(getApp_());
    }
    return _storage;
}

// Export getter functions - call these to get the real Firebase instances
export { getApp_ as getFirebaseApp, getDb, getAuth_ as getFirebaseAuth, getStorage_ as getFirebaseStorage };

// For backward compatibility, export eagerly initialized instances
export const app = getApp_();
export const auth = getAuth_();
export const db = getDb();
export const storage = getStorage_();
