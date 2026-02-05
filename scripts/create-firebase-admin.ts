
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

if (!email || !password) {
    console.error("Usage: npx tsx scripts/create-firebase-admin.ts <email> <password>");
    process.exit(1);
}

async function createAdmin() {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Success! Created admin user:", userCredential.user.uid);
        console.log("You can now log in at /admin/login");
        process.exit(0);
    } catch (error: any) {
        console.error("Error creating user:", error.message);
        process.exit(1);
    }
}

createAdmin();
