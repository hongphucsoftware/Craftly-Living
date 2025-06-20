import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wsobqmcjmukjgylzzhkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb2JxbWNqbXVramd5bHp6aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDk0MzUsImV4cCI6MjA2NTk4NTQzNX0.zDALCDgyOBjKNgdW-hGfHxrmDLpBjwso0-LtSOplTaU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('Creating database tables...');
  
  // Create the SQL commands
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  
  const createProjectsTable = `
    CREATE TABLE IF NOT EXISTS renovation_projects (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      renovation_type TEXT NOT NULL,
      postcode TEXT NOT NULL,
      budget_min DECIMAL(10,2),
      budget_max DECIMAL(10,2),
      style TEXT NOT NULL,
      timeline TEXT NOT NULL,
      urgency TEXT,
      additional_notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  
  const enableRLS = `
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE renovation_projects ENABLE ROW LEVEL SECURITY;
  `;
  
  const createPolicies = `
    CREATE POLICY IF NOT EXISTS "public_read_users" ON users FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "public_insert_users" ON users FOR INSERT WITH CHECK (true);
    CREATE POLICY IF NOT EXISTS "public_read_projects" ON renovation_projects FOR SELECT USING (true);
    CREATE POLICY IF NOT EXISTS "public_insert_projects" ON renovation_projects FOR INSERT WITH CHECK (true);
  `;
  
  try {
    // Execute SQL using rpc function
    const { data, error } = await supabase.rpc('exec', { 
      sql: createUsersTable + createProjectsTable + enableRLS + createPolicies 
    });
    
    if (error) {
      console.log('RPC method not available. Tables need to be created manually.');
      console.log('Copy the SQL from create-supabase-tables.sql and run it in Supabase SQL Editor');
    } else {
      console.log('Tables created successfully!');
    }
  } catch (err) {
    console.log('Need to create tables manually in Supabase SQL Editor');
  }
  
  // Test if tables exist
  try {
    const { data, error } = await supabase.from('renovation_projects').select('count').limit(1);
    if (!error) {
      console.log('Database tables are ready!');
    } else {
      console.log('Tables still need to be created manually');
    }
  } catch (err) {
    console.log('Run the SQL from create-supabase-tables.sql file');
  }
}

createTables();