import { type User, type InsertUser, type RenovationProject, type InsertRenovationProject } from "@shared/schema";
import { supabase } from "./db";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRenovationProject(project: InsertRenovationProject): Promise<RenovationProject>;
  getRenovationProjectsByUser(userId: number | null): Promise<RenovationProject[]>;
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
    // Map camelCase to snake_case for database columns
    const dbProject = {
      user_id: insertProject.userId,
      renovation_type: insertProject.renovationType,
      postcode: insertProject.postcode,
      budget_min: insertProject.budgetMin,
      budget_max: insertProject.budgetMax,
      style: insertProject.style,
      timeline: insertProject.timeline,
      urgency: insertProject.urgency,
      additional_notes: insertProject.additionalNotes
    };

    const { data, error } = await supabase
      .from('renovation_projects')
      .insert(dbProject)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to create renovation project: ${error.message}`);
    }
    
    // Map snake_case response back to camelCase
    return {
      id: data.id,
      userId: data.user_id,
      renovationType: data.renovation_type,
      postcode: data.postcode,
      budgetMin: data.budget_min,
      budgetMax: data.budget_max,
      style: data.style,
      timeline: data.timeline,
      urgency: data.urgency,
      additionalNotes: data.additional_notes,
      createdAt: data.created_at
    } as RenovationProject;
  }

  async getRenovationProjectsByUser(userId: number | null): Promise<RenovationProject[]> {
    let query = supabase
      .from('renovation_projects')
      .select('*');
    
    if (userId !== null) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch renovation projects: ${error.message}`);
    }
    
    // Map snake_case to camelCase for application use
    return data?.map((project: any) => ({
      id: project.id,
      userId: project.user_id,
      renovationType: project.renovation_type,
      postcode: project.postcode,
      budgetMin: project.budget_min,
      budgetMax: project.budget_max,
      style: project.style,
      timeline: project.timeline,
      urgency: project.urgency,
      additionalNotes: project.additional_notes,
      createdAt: project.created_at
    })) || [];
  }
}

export const storage = new SupabaseStorage();
