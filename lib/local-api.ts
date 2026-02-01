
import { MENU_CATEGORIES } from "@/lib/menu-data";
import { PRODUCT_TYPES } from "@/lib/constants";

export interface ProductType {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface BakeryProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    variants?: any[];
}

export interface BakeryTopping {
    id: string;
    name: string;
    price: number;
}

export type Order = any;
export type OrderItem = any;

export async function createOrder(order: any) {
    console.log("Creating order (local):", order);
    return "ORDER-" + Math.floor(Math.random() * 10000);
}

export async function getProductTypes(): Promise<ProductType[]> {
    return Object.values(PRODUCT_TYPES).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image
    }));
}

export async function getBakeryProducts(): Promise<BakeryProduct[]> {
    if (!MENU_CATEGORIES.bakery || !MENU_CATEGORIES.bakery.items) return [];

    return MENU_CATEGORIES.bakery.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        variants: item.variants
    }));
}

export async function getDrinksProducts(): Promise<BakeryProduct[]> {
    if (!MENU_CATEGORIES.drinks || !MENU_CATEGORIES.drinks.items) return [];

    return MENU_CATEGORIES.drinks.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        variants: item.variants
    }));
}

export async function getBakeryProduct(id: string): Promise<BakeryProduct | null> {
    if (!MENU_CATEGORIES.bakery || !MENU_CATEGORIES.bakery.items) return null;

    const item = MENU_CATEGORIES.bakery.items.find(i => i.id === id);
    if (!item) return null;
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        variants: item.variants
    };
}

export async function getBakeryToppings(): Promise<BakeryTopping[]> {
    return [
        { id: "tp-nutella", name: "Nutella", price: 2000 },
        { id: "tp-honey", name: "Honey", price: 1500 },
        { id: "tp-choc-sauce", name: "Chocolate Sauce", price: 1500 },
        { id: "tp-caramel", name: "Caramel Sauce", price: 1500 },
        { id: "tp-straw-sauce", name: "Strawberry Sauce", price: 1500 },
        { id: "tp-vanilla-sauce", name: "Vanilla Sauce", price: 1500 },
        { id: "tp-pb", name: "Peanut Butter", price: 1500 },
        { id: "tp-jam-straw", name: "Strawberry Jam", price: 1000 },
        { id: "tp-jam-mix", name: "Mixed Fruit Jam", price: 1000 },
        { id: "tp-strawberry", name: "Fresh Strawberry", price: 2000 },
        { id: "tp-banana", name: "Banana", price: 1000 },
        { id: "tp-blueberry", name: "Blueberry", price: 2500 },
        { id: "tp-sprinkles", name: "Sprinkles", price: 1000 },
        { id: "tp-choc-chips", name: "Chocolate Chips", price: 1500 },
        { id: "tp-choc-flakes", name: "Chocolate Flakes", price: 1500 },
    ];

}

export async function initializeDefaultData() {
    return;
}

export async function forceUpdateAllImages() {
    return;
}
