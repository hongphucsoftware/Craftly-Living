# Supabase Database Setup

## Required SQL Commands

Execute these commands in your Supabase SQL Editor to create the database schema:

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create renovation_projects table  
CREATE TABLE renovation_projects (
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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE renovation_projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for anon access
CREATE POLICY "Allow anon read users" ON users FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert users" ON users FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon read projects" ON renovation_projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon insert projects" ON renovation_projects FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon update projects" ON renovation_projects FOR UPDATE TO anon USING (true);
```

## Next Steps

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/wsobqmcjmukjgylzzhkl
2. Navigate to SQL Editor 
3. Run the above SQL commands
4. The application will automatically connect to your Supabase database