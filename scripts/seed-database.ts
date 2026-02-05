
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { MENU_CATEGORIES } from '../lib/menu-data'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service key for admin rights

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
    console.log('Starting database seed...')

    // 1. Categories
    console.log('Seeding categories...')
    const categoriesToInsert = Object.values(MENU_CATEGORIES).map(cat => ({
        id: cat.id,
        title: cat.title,
        description: cat.description,
        image: cat.image,
        display_order: 0 // You might want to add this field
    }))

    const { error: catError } = await supabase
        .from('categories')
        .upsert(categoriesToInsert, { onConflict: 'id' })

    if (catError) {
        console.error('Error seeding categories:', catError)
        return
    }
    console.log('Categories seeded successfully.')

    // 2. Menu Items and Variants
    console.log('Seeding menu items...')

    for (const cat of Object.values(MENU_CATEGORIES)) {
        for (const item of cat.items) {
            // Insert Parent Item
            const { error: itemError } = await supabase
                .from('menu_items')
                .upsert({
                    id: item.id,
                    category_id: cat.id,
                    name: item.name,
                    description: item.description || '',
                    price: item.price,
                    image: item.image || '',
                    is_available: true
                }, { onConflict: 'id' })

            if (itemError) {
                console.error(`Error seeding item ${item.name}:`, itemError)
                continue
            }

            // Insert Variants if any
            if (item.variants && item.variants.length > 0) {
                const variantsToInsert = item.variants.map(v => ({
                    id: v.id,
                    parent_item_id: item.id,
                    name: v.name,
                    description: v.description || '',
                    price: v.price,
                    image: v.image || '',
                    is_available: true
                }))

                const { error: variantError } = await supabase
                    .from('menu_variants')
                    .upsert(variantsToInsert, { onConflict: 'id' })

                if (variantError) {
                    console.error(`Error seeding variants for ${item.name}:`, variantError)
                }
            }
        }
    }

    console.log('Menu items and variants seeded successfully.')

    // 3. Create Admin Table (if helpful for testing, though Auth is handled by Supabase Auth)
    // We don't necessarily need to seed users, but we could seed a public config table

    console.log('Database seed completed!')
}

seedDatabase()
