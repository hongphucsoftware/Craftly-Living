import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

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
      const { userId } = req.query;
      const projects = await storage.getRenovationProjectsByUser(userId ? parseInt(userId as string) : null);
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const project = await storage.createRenovationProject(req.body);
      return res.status(201).json(project);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error in projects API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}