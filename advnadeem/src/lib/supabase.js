import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https:/ryudgscczrylbyefgexk.supabase.co'
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5dWRnc2NjenJ5bGJ5ZWZnZXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTAwODUsImV4cCI6MjA5NDA4NjA4NX0.E2D-Wy8RtdF8rEDpb9V-xkpJeDjT1jYV8OWti5wQtNI'

export const supabase = createClient(supabaseUrl, supabaseAnon)
