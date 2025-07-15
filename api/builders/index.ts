import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { builders, type Builder, type InsertBuilder } from '../../shared/schema';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
const db = drizzle(pool, { schema: { builders } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const allBuilders = await db.select().from(builders);
      return res.status(200).json(allBuilders);
    }

    if (req.method === 'POST') {
      // Handle empty strings by converting to null for optional fields
      const builderData = { ...req.body };
      if (builderData.website === '') builderData.website = null;
      if (builderData.abn === '') builderData.abn = null;
      if (builderData.profileImageUrl === '') builderData.profileImageUrl = null;
      if (builderData.description === '') builderData.description = null;
      
      const [newBuilder] = await db.insert(builders).values(builderData).returning();
      return res.status(201).json(newBuilder);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in builders API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}