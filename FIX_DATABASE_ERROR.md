# Fix "Failed to create renovation project" Error

## The Problem
Your app is connected to Supabase but the database tables don't exist yet.

## The Solution (2 minutes)

1. **Open Supabase SQL Editor**: https://supabase.com/dashboard/project/wsobqmcjmukjgylzzhkl/sql/new

2. **Copy and paste this SQL code:**

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

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON renovation_projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON renovation_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON renovation_projects FOR UPDATE USING (true);
```

3. **Click "Run"**

4. **Test your app** - the error will be fixed and project submissions will work.

## After Running the SQL
- Your renovation form will save projects to Supabase
- The dashboard will show real project data
- All database operations will work properly