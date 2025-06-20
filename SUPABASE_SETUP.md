# URGENT: Create Database Tables

Your application is ready but needs database tables created in Supabase.

## Steps to Fix the Error:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/wsobqmcjmukjgylzzhkl
2. **Click "SQL Editor" in the left sidebar**
3. **Copy and paste this SQL code exactly:**

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create renovation_projects table  
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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE renovation_projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Allow public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read projects" ON renovation_projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert projects" ON renovation_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update projects" ON renovation_projects FOR UPDATE USING (true);
```

4. **Click "Run" to execute the SQL**
5. **Refresh your application** - the error will be fixed

## What This Does:
- Creates the `users` and `renovation_projects` tables
- Sets up security policies so your app can read/write data
- Fixes the "Failed to create renovation project" error