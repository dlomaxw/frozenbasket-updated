
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
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Lazy initialization to avoid build-time errors when env vars are not yet available
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

function getFirebaseApp(): FirebaseApp {
    if (!_app) {
        _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    }
    return _app;
}

export const app = new Proxy({} as FirebaseApp, {
    get(_, prop) {
        return (getFirebaseApp() as any)[prop];
    },
});

export const auth = new Proxy({} as Auth, {
    get(_, prop) {
        if (!_auth) _auth = getAuth(getFirebaseApp());
        return (_auth as any)[prop];
    },
});

export const db = new Proxy({} as Firestore, {
    get(_, prop) {
        if (!_db) _db = getFirestore(getFirebaseApp());
        return (_db as any)[prop];
    },
});

export const storage = new Proxy({} as FirebaseStorage, {
    get(_, prop) {
        if (!_storage) _storage = getStorage(getFirebaseApp());
        return (_storage as any)[prop];
    },
});
