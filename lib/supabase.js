import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://rogbgsarcacsjvpgmuxn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvZ2Jnc2FyY2Fjc2p2cGdtdXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxODkxNDEsImV4cCI6MjA0NTc2NTE0MX0.IVTeBA_wsnTKbIKOoy9dEJ8SPaI7aMMF9NoDtE88elM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 