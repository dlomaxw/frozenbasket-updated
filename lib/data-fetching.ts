
import { MENU_CATEGORIES } from '@/lib/menu-data'

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()

// Firestore REST API base URL
function getFirestoreUrl(collectionPath: string) {
    return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionPath}`
}

// Convert Firestore REST document fields to a plain object
function parseFirestoreDoc(doc: any): any {
    const fields = doc.fields || {}
    const parsed: any = {}

    for (const [key, value] of Object.entries(fields)) {
        parsed[key] = parseFirestoreValue(value as any)
    }

    return parsed
}

function parseFirestoreValue(value: any): any {
    if (value.stringValue !== undefined) return value.stringValue
    if (value.integerValue !== undefined) return Number(value.integerValue)
    if (value.doubleValue !== undefined) return value.doubleValue
    if (value.booleanValue !== undefined) return value.booleanValue
    if (value.nullValue !== undefined) return null
    if (value.mapValue) return parseFirestoreDoc(value.mapValue)
    if (value.arrayValue) {
        return (value.arrayValue.values || []).map((v: any) => parseFirestoreValue(v))
    }
    return null
}

// Fetch all documents from a Firestore collection via REST API
async function fetchCollection(collectionName: string): Promise<any[]> {
    if (!PROJECT_ID) {
        console.warn('NEXT_PUBLIC_FIREBASE_PROJECT_ID not set')
        return []
    }

    const url = getFirestoreUrl(collectionName)
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        console.error(`Firestore REST error for ${collectionName}:`, res.status, await res.text())
        return []
    }

    const data = await res.json()
    if (!data.documents) return []

    return data.documents.map((doc: any) => parseFirestoreDoc(doc))
}

// Fetch documents matching an 'in' filter via Firestore REST API
async function fetchWithFilter(collectionName: string, field: string, values: string[]): Promise<any[]> {
    if (!PROJECT_ID) {
        console.warn('NEXT_PUBLIC_FIREBASE_PROJECT_ID not set')
        return []
    }

    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`

    const body = {
        structuredQuery: {
            from: [{ collectionId: collectionName }],
            where: {
                fieldFilter: {
                    field: { fieldPath: field },
                    op: 'IN',
                    value: {
                        arrayValue: {
                            values: values.map(v => ({ stringValue: v }))
                        }
                    }
                }
            }
        }
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
    })

    if (!res.ok) {
        console.error(`Firestore REST query error:`, res.status, await res.text())
        return []
    }

    const results = await res.json()
    return results
        .filter((r: any) => r.document)
        .map((r: any) => parseFirestoreDoc(r.document))
}

export async function getMenuData() {
    try {
        const categories = await fetchCollection('categories')

        if (categories.length === 0) {
            console.warn("Using static menu data (Database empty or offline)")
            return MENU_CATEGORIES
        }

        const items = await fetchCollection('menu_items')

        // Reconstruct the nested structure to match MENU_CATEGORIES type
        const constructedData: any = {}

        // Helper to find items for a category
        const getItemsForCategory = (catId: string) => {
            return items?.filter((item: any) => item.category_id === catId).map((item: any) => ({
                ...item,
                variants: item.variants || []
            })) || []
        }

        categories.forEach((cat: any) => {
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
    const targetIds = ['happy-bars', 'waffle-basket-sundae', 'jar-sundae', 'triple-sundae']

    try {
        const items = await fetchWithFilter('menu_items', 'id', targetIds)
        return items
    } catch (e) {
        console.error("Error fetching featured items:", e)
        return []
    }
}
