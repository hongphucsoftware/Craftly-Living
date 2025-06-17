import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const renovationProjects = pgTable("renovation_projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  renovationType: text("renovation_type").notNull(),
  postcode: text("postcode").notNull(),
  budgetMin: decimal("budget_min", { precision: 10, scale: 2 }),
  budgetMax: decimal("budget_max", { precision: 10, scale: 2 }),
  style: text("style").notNull(),
  timeline: text("timeline").notNull(),
  urgency: text("urgency"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRenovationProjectSchema = createInsertSchema(renovationProjects).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRenovationProject = z.infer<typeof insertRenovationProjectSchema>;
export type RenovationProject = typeof renovationProjects.$inferSelect;
