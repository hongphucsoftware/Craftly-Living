// Script to create Supabase tables using the admin API
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wsobqmcjmukjgylzzhkl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb2JxbWNqbXVramd5bHp6aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDk0MzUsImV4cCI6MjA2NTk4NTQzNX0.zDALCDgyOBjKNgdW-hGfHxrmDLpBjwso0-LtSOplTaU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTables() {
  try {
    // Test if tables exist by trying to fetch from them
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError && usersError.code === 'PGRST116') {
      console.log('Tables do not exist. Please create them manually in Supabase SQL Editor.');
      console.log('Use the SQL commands from SUPABASE_SETUP.md');
      return;
    }
    
    console.log('Database connection successful!');
    console.log('Users table check:', usersError ? 'Not found' : 'Found');
    
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

createTables();