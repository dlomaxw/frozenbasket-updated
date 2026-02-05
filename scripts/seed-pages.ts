
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
const db = getFirestore(app);

const PAGES_DATA = [
    {
        id: 'home',
        title: 'Home Page',
        content: {
            heroTitle: "Handcrafted Ice Cream",
            heroSubtitle: "Experience the joy of fresh, premium ingredients",
            heroButtonText: "Order Now",
            heroImage: "/images/hero-bg.jpg" // Placeholder or existing
        }
    },
    {
        id: 'about',
        title: 'About Us',
        content: {
            title: "About Frozen Basket",
            subtitle: "Crafting moments of pure joy, one scoop at a time. We believe ice cream should be an experience, not just a dessert.",
            cards: [
                {
                    title: "Handcrafted with Love",
                    icon: "heart",
                    description: "Every batch is made fresh daily using traditional techniques and premium ingredients sourced from local suppliers."
                },
                {
                    title: "Natural Ingredients",
                    icon: "leaf",
                    description: "No artificial flavors or preservatives. We use real fruits, nuts, and premium chocolate in all our creations."
                },
                {
                    title: "Award Winning",
                    icon: "award",
                    description: "Recognized as Kampala's best artisan ice cream, with awards for innovation and quality excellence."
                },
                {
                    title: "Fast Delivery",
                    icon: "truck",
                    description: "We deliver your ice cream frozen solid within 15 minutes, ensuring perfect quality when it arrives."
                }
            ],
            mission_title: "Our Mission",
            mission_text: "To bring people together through exceptional ice cream experiences. We're not just selling dessert - we're creating memories, celebrating moments, and spreading happiness one delicious scoop at a time."
        }
    },
    {
        id: 'contact',
        title: 'Contact Us',
        content: {
            phone: "+256 753 522 992",
            address: "Opp. Lohana Academy, Kisement, Kampala",
            email: "info@frozenbasket.com",
            openingHours: "10 AM - 10 PM"
        }
    }
];

async function seedPages() {
    console.log('Seeding Pages...');
    try {
        for (const page of PAGES_DATA) {
            await setDoc(doc(db, "pages", page.id), {
                id: page.id,
                title: page.title,
                content: page.content,
                updated_at: new Date().toISOString()
            });
            console.log(`Seeded ${page.title}`);
        }
        console.log('Pages seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error("Error seeding pages:", error);
        process.exit(1);
    }
}

seedPages();
