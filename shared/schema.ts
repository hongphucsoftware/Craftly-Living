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

export const builders = pgTable("builders", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  abn: text("abn"),
  businessAddress: text("business_address").notNull(),
  serviceAreas: text("service_areas").notNull(), // JSON array as text
  specialties: text("specialties").notNull(), // JSON array as text
  yearsExperience: integer("years_experience").notNull(),
  insuranceDetails: text("insurance_details"),
  licenseNumber: text("license_number"),
  websiteUrl: text("website_url"),
  profileImageUrl: text("profile_image_url"),
  portfolioImages: text("portfolio_images"), // JSON array as text
  description: text("description").notNull(),
  priceRangeMin: decimal("price_range_min", { precision: 10, scale: 2 }),
  priceRangeMax: decimal("price_range_max", { precision: 10, scale: 2 }),
  verified: boolean("verified").default(false),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRenovationProjectSchema = createInsertSchema(renovationProjects).omit({
  id: true,
  createdAt: true,
}).extend({
  budgetMin: z.string().optional().nullable(),
  budgetMax: z.string().optional().nullable(),
});

export const insertBuilderSchema = createInsertSchema(builders).omit({
  id: true,
  verified: true,
  rating: true,
  totalReviews: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  serviceAreas: z.array(z.string()),
  specialties: z.array(z.string()),
  portfolioImages: z.array(z.string()).optional(),
  priceRangeMin: z.string().optional().nullable(),
  priceRangeMax: z.string().optional().nullable(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRenovationProject = z.infer<typeof insertRenovationProjectSchema>;
export type RenovationProject = typeof renovationProjects.$inferSelect;
export type InsertBuilder = z.infer<typeof insertBuilderSchema>;
export type Builder = typeof builders.$inferSelect;
