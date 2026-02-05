
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Sanitize a value that should be a plain ID but might have been set as a URL
function sanitizeId(value: string | undefined): string | undefined {
    if (!value) return value;
    const trimmed = value.trim();
    // If someone pasted a URL like "https://project-name.firebaseio.com"
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        try {
            const url = new URL(trimmed);
            return url.hostname.split(".")[0];
        } catch {
            return trimmed;
        }
    }
    return trimmed;
}

// Sanitize storage bucket - should be "bucket.appspot.com", not a full URL
function sanitizeBucket(value: string | undefined): string | undefined {
    if (!value) return value;
    const trimmed = value.trim();
    if (trimmed.startsWith("gs://")) {
        return trimmed.replace("gs://", "");
    }
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        try {
            const url = new URL(trimmed);
            return url.hostname;
        } catch {
            return trimmed;
        }
    }
    return trimmed;
}

// Log raw env var values before any processing
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "SET (length: " + process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length + ")" : "UNSET");
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("[v0] RAW NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
    projectId: sanitizeId(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: sanitizeBucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim(),
};

console.log("[v0] RESOLVED firebaseConfig:", JSON.stringify(firebaseConfig));

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
