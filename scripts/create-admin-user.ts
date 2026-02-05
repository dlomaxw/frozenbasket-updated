
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Simple .env parser since dotenv might not be installed
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local')
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf8')
            envConfig.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/)
                if (match) {
                    const key = match[1].trim()
                    const value = match[2].trim().replace(/^["'](.*)["']$/, '$1')
                    process.env[key] = value
                }
            })
        }
    } catch (e) {
        console.error('Error loading .env.local', e)
    }
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const EMAIL = 'frozebasketug@gmail.com'
const PASSWORD = 'Frozen2026@'

async function createAdminUser() {
    console.log(`Creating user: ${EMAIL}...`)

    // Check if user exists first (optional, buy signUp doesn't duplicate usually, retrieves existing or errors)
    // Admin API createUser is better for forcing creation without email confirm
    const { data, error } = await supabase.auth.admin.createUser({
        email: EMAIL,
        password: PASSWORD,
        email_confirm: true // Auto confirm
    })

    if (error) {
        console.error('Error creating user:', error.message)
        // If user already exists, maybe we want to update password?
        if (error.message.includes('already registered')) {
            console.log('User exists, attempting to list users to find ID...')
            // This is a bit complex without exact knowing, let's just warn.
            console.log('Please delete the user manually from Supabase Auth dashboard if you need to recreate it, or try logging in.')
        }
    } else {
        console.log('User created successfully:', data.user.id)
    }
}

createAdminUser()
