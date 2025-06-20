const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wsobqmcjmukjgylzzhkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb2JxbWNqbXVramd5bHp6aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDk0MzUsImV4cCI6MjA2NTk4NTQzNX0.zDALCDgyOBjKNgdW-hGfHxrmDLpBjwso0-LtSOplTaU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up Supabase database...');
  
  // Test connection
  try {
    const { data, error } = await supabase.from('renovation_projects').select('*').limit(1);
    if (error && error.code === '42P01') {
      console.log('Tables need to be created manually in Supabase SQL Editor');
      console.log('Run the SQL from SUPABASE_SETUP.md in your dashboard');
    } else if (error) {
      console.log('Database error:', error.message);
    } else {
      console.log('Database tables exist and are accessible!');
    }
  } catch (err) {
    console.log('Connection error:', err.message);
  }
}

setupDatabase();