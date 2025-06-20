import { createClient } from '@supabase/supabase-js';
import * as schema from "@shared/schema";

// Supabase configuration
const supabaseUrl = 'https://wsobqmcjmukjgylzzhkl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb2JxbWNqbXVramd5bHp6aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDk0MzUsImV4cCI6MjA2NTk4NTQzNX0.zDALCDgyOBjKNgdW-hGfHxrmDLpBjwso0-LtSOplTaU';

// Create Supabase client for API calls
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We'll use Supabase client directly instead of Drizzle for simpler setup
// This allows us to work with the database immediately without complex connection setup
export { supabase as db };