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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE renovation_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON renovation_projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON renovation_projects FOR INSERT WITH CHECK (true);