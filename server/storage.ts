import { users, type User, type InsertUser, type RenovationProject, type InsertRenovationProject } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRenovationProject(project: InsertRenovationProject): Promise<RenovationProject>;
  getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private renovationProjects: Map<number, RenovationProject>;
  currentUserId: number;
  currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.renovationProjects = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRenovationProject(insertProject: InsertRenovationProject): Promise<RenovationProject> {
    const id = this.currentProjectId++;
    const project: RenovationProject = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.renovationProjects.set(id, project);
    return project;
  }

  async getRenovationProjectsByUser(userId: number): Promise<RenovationProject[]> {
    return Array.from(this.renovationProjects.values()).filter(
      (project) => project.userId === userId,
    );
  }
}

export const storage = new MemStorage();
