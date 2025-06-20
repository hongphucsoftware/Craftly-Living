import { type User, type InsertUser, type RenovationProject, type InsertRenovationProject } from "@shared/schema";
import { supabase } from "./db";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRenovationProject(project: InsertRenovationProject): Promise<RenovationProject>;
  getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(insertUser)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    return data as User;
  }

  async createRenovationProject(insertProject: InsertRenovationProject): Promise<RenovationProject> {
    const { data, error } = await supabase
      .from('renovation_projects')
      .insert(insertProject)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create renovation project: ${error.message}`);
    }
    return data as RenovationProject;
  }

  async getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]> {
    const { data, error } = await supabase
      .from('renovation_projects')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      throw new Error(`Failed to fetch renovation projects: ${error.message}`);
    }
    return data as RenovationProject[];
  }
}

export const storage = new SupabaseStorage();
