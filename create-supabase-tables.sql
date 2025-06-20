-- Run this SQL in your Supabase SQL Editor to fix the database error

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

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON renovation_projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON renovation_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON renovation_projects FOR UPDATE USING (true);