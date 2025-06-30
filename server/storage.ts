import { users, type User, type InsertUser, renovationProjects, type RenovationProject, type InsertRenovationProject, builders, type Builder, type InsertBuilder } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRenovationProject(project: InsertRenovationProject): Promise<RenovationProject>;
  getRenovationProjectsByUser(userId: number | null): Promise<RenovationProject[]>;
  createBuilder(builder: InsertBuilder): Promise<Builder>;
  getBuilder(id: number): Promise<Builder | undefined>;
  getBuilderByEmail(email: string): Promise<Builder | undefined>;
  getAllBuilders(): Promise<Builder[]>;
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

  async getRenovationProjectsByUser(userId: number | null): Promise<RenovationProject[]> {
    if (userId === null) {
      return await db.select().from(renovationProjects);
    }
    return await db.select().from(renovationProjects).where(eq(renovationProjects.userId, userId));
  }

  async createBuilder(insertBuilder: any): Promise<Builder> {
    const [builder] = await db
      .insert(builders)
      .values(insertBuilder)
      .returning();
    return builder;
  }

  async getBuilder(id: number): Promise<Builder | undefined> {
    const [builder] = await db.select().from(builders).where(eq(builders.id, id));
    return builder || undefined;
  }

  async getBuilderByEmail(email: string): Promise<Builder | undefined> {
    const [builder] = await db.select().from(builders).where(eq(builders.email, email));
    return builder || undefined;
  }

  async getAllBuilders(): Promise<Builder[]> {
    return await db.select().from(builders);
  }
}

export const storage = new DatabaseStorage();
