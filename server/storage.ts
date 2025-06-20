import { users, renovationProjects, type User, type InsertUser, type RenovationProject, type InsertRenovationProject } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRenovationProject(project: InsertRenovationProject): Promise<RenovationProject>;
  getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createRenovationProject(insertProject: InsertRenovationProject): Promise<RenovationProject> {
    const [project] = await db
      .insert(renovationProjects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]> {
    return await db
      .select()
      .from(renovationProjects)
      .where(eq(renovationProjects.userId, userId));
  }
}

export const storage = new DatabaseStorage();
