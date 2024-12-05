
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://qazyubdpqcyvtkqvwnwg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhenl1YmRwcWN5dnRrcXZ3bndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjQ4ODcsImV4cCI6MjA0ODkwMDg4N30.7Ivj_wcOmZHSQ5M1m2AtXKTDZNsf9jKCklbhibADOa4"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase