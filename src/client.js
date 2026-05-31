import { createClient } from '@supabase/supabase-js'

const URL = 'https://nsrvmvaixlkrisjzpznk.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcnZtdmFpeGxrcmlzanpwem5rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDk4NDkyNywiZXhwIjoyMDkwNTYwOTI3fQ.OhyO4lN8JoSZmstAxYFl-QV6Yc2-2BXg841TmK4CTQ8'

const isConfigured = URL.startsWith('http') && !API_KEY.includes('YOUR_SUPABASE')

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase not fully configured — set your anon API key in src/client.js'
  )
}

export const supabase = createClient(
  URL,
  isConfigured ? API_KEY : 'placeholder-key'
)
