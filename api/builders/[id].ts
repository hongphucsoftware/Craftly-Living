import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { builders } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { builders } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const builderId = parseInt(id as string);
      
      if (isNaN(builderId)) {
        return res.status(400).json({ message: 'Invalid builder ID' });
      }
      
      const [builder] = await db.select().from(builders).where(eq(builders.id, builderId));
      
      if (!builder) {
        return res.status(404).json({ message: 'Builder not found' });
      }
      
      return res.status(200).json(builder);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in builder API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}