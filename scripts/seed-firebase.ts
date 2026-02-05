
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import dotenv from 'dotenv';
import path from 'path';
import { MENU_CATEGORIES } from '../lib/menu-data';

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

console.log("Initializing Firebase with project ID:", firebaseConfig.projectId);

// Initialize Firebase for script usage
// Note: In a real script usage we might need to use firebase-admin if client SDK prohibits local script execution without valid browser env,
// but often it works if we just use Firestore REST or if the environment allows.
// However, the Firebase Client SDK often assumes a browser environment (window/fetch).
// Providing 'fetch' to global might be needed in older Node environment, but new Node has fetch.
// Let's try simple Client SDK. If it fails, I'll switch to Admin SDK or just write a small helper.
// Actually, for seeding, Admin SDK is way better because it bypasses rules.
// But keeping it simple for user who might not want to download service account key.
// We will assume the user has set Firestore rules to allowing writes temporarily or we will login anonymously if enabled.
// OR we just use Admin SDK if we can.
// Let's stick to Client SDK and see if it works. If not, I'll guide the user.

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
    console.log('Starting Firestore seed...');

    try {
        // 1. Categories
        console.log('Seeding categories...');
        for (const cat of Object.values(MENU_CATEGORIES)) {
            await setDoc(doc(db, "categories", cat.id), {
                id: cat.id,
                title: cat.title,
                description: cat.description,
                image: cat.image,
                display_order: 0
            });
        }
        console.log('Categories seeded.');

        // 2. Menu Items
        console.log('Seeding menu items...');
        for (const cat of Object.values(MENU_CATEGORIES)) {
            for (const item of cat.items) {
                const itemRef = doc(db, "menu_items", item.id);
                await setDoc(itemRef, {
                    id: item.id,
                    category_id: cat.id,
                    name: item.name,
                    description: item.description || '',
                    price: item.price,
                    image: item.image || '',
                    is_available: true,
                    // Storing variants directly on the item document for simpler Firestore retrieval (No joins needed!)
                    variants: item.variants ? item.variants.map(v => ({
                        id: v.id,
                        name: v.name,
                        price: v.price,
                        description: v.description || '',
                        image: v.image || '',
                        is_available: true
                    })) : []
                });
            }
        }
        console.log('Menu items seeded.');

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
