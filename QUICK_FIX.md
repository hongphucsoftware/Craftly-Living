# Fix Database Error - 2 Minutes

Your app is connected to Supabase but needs tables created.

## Copy This SQL Code:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

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

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE renovation_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_users" ON users FOR SELECT USING (true);
CREATE POLICY "public_insert_users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_projects" ON renovation_projects FOR SELECT USING (true);
CREATE POLICY "public_insert_projects" ON renovation_projects FOR INSERT WITH CHECK (true);
```

## Run It:
1. Go to https://supabase.com/dashboard/project/wsobqmcjmukjgylzzhkl
2. Click "SQL Editor" 
3. Paste the code above
4. Click "Run"
5. Refresh your app - error fixed!