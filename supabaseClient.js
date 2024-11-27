import { createClient } from '@supabase/supabase-js';

// Ilisi ang 'your-supabase-url' ug 'your-anon-key' sa imong Supabase project details
const supabaseUrl = 'https://ifumwgkedexufuankrmj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdW13Z2tlZGV4dWZ1YW5rcm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2Nzk2MTgsImV4cCI6MjA0ODI1NTYxOH0.RYqqGfXuOkX9SN0gGjF2W-oY6knCdPyvl011OzwYEfA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);