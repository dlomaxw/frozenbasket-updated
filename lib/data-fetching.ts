
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { MENU_CATEGORIES } from '@/lib/menu-data'

export async function getMenuData() {
    try {
        // Fetch Categories
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        const categories = categoriesSnapshot.docs.map(doc => doc.data());

        if (categories.length === 0) {
            console.warn("Using static menu data (Database empty or offline)")
            return MENU_CATEGORIES
        }

        // Fetch Items
        const itemsSnapshot = await getDocs(collection(db, 'menu_items'));
        const items = itemsSnapshot.docs.map(doc => doc.data());

        // Reconstruct the nested structure to match MENU_CATEGORIES type
        const constructedData: any = {}

        // Helper to find items for a category
        const getItemsForCategory = (catId: string) => {
            return items?.filter((item: any) => item.category_id === catId).map((item: any) => ({
                ...item,
                variants: item.variants || [] // In Firestore we stored variants directly on the item
            })) || []
        }

        categories.forEach((cat: any) => {
            // Mapping known IDs to keys
            let key = cat.id
            if (cat.id === 'ice-cream') key = 'iceCream'

            constructedData[key] = {
                id: cat.id,
                title: cat.title,
                description: cat.description,
                image: cat.image,
                items: getItemsForCategory(cat.id)
            }
        })

        // Ensure we have at least the keys we expect, fallback if missing
        if (!constructedData.iceCream) constructedData.iceCream = MENU_CATEGORIES.iceCream
        if (!constructedData.drinks) constructedData.drinks = MENU_CATEGORIES.drinks
        if (!constructedData.bakery) constructedData.bakery = MENU_CATEGORIES.bakery

        return constructedData

    } catch (error) {
        console.error("Unexpected error fetching menu data:", error)
        return MENU_CATEGORIES
    }
}

export async function getFeaturedItems() {
    // Happy Bars, Waffle Basket Single Sundae, Jar Sundae, Triple Sundae
    const targetIds = ['happy-bars', 'waffle-basket-sundae', 'jar-sundae', 'triple-sundae']

    try {
        // Firestore 'in' query
        const q = query(collection(db, 'menu_items'), where('id', 'in', targetIds));
        const updateSnapshot = await getDocs(q);
        return updateSnapshot.docs.map(doc => doc.data());
    } catch (e) {
        console.error("Error fetching featured items:", e)
        return []
    }
}
