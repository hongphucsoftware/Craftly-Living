import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRenovationProjectSchema } from "@shared/schema";
import { z } from "zod";

// Create a form schema that accepts the budget field from the frontend
const formRenovationProjectSchema = z.object({
  renovationType: z.string(),
  postcode: z.string(),
  budget: z.string().optional(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  style: z.string(),
  timeline: z.string(),
  urgency: z.string().optional(),
  additionalNotes: z.string().optional(),
  userId: z.number().optional().nullable(),
});

// Helper function to parse budget range strings
const parseBudgetRange = (budgetString: string) => {
  switch (budgetString) {
    case "Under £10,000":
      return { min: "0", max: "10000" };
    case "£10,000 - £25,000":
      return { min: "10000", max: "25000" };
    case "£25,000 - £50,000":
      return { min: "25000", max: "50000" };
    case "£50,000 - £100,000":
      return { min: "50000", max: "100000" };
    case "Over £100,000":
      return { min: "100000", max: "999999" };
    default:
      return { min: "0", max: "0" };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Renovation project routes
  app.post("/api/renovation-projects", async (req, res) => {
    try {
      const formData = formRenovationProjectSchema.parse(req.body);
      
      // Transform the form data to match the database schema
      let budgetMin = formData.budgetMin;
      let budgetMax = formData.budgetMax;
      
      // If budget range string is provided, parse it
      if (formData.budget && !budgetMin && !budgetMax) {
        const budgetRange = parseBudgetRange(formData.budget);
        budgetMin = budgetRange.min;
        budgetMax = budgetRange.max;
      }
      
      const projectData = {
        renovationType: formData.renovationType,
        postcode: formData.postcode,
        budgetMin,
        budgetMax,
        style: formData.style,
        timeline: formData.timeline,
        urgency: formData.urgency,
        additionalNotes: formData.additionalNotes,
        userId: formData.userId,
      };
      
      // Validate against the actual database schema
      const validatedData = insertRenovationProjectSchema.parse(projectData);
      const project = await storage.createRenovationProject(validatedData);
      res.json(project);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid project data", details: error.errors });
      } else {
        console.error("Error creating project:", error);
        res.status(500).json({ 
          error: "Failed to create project", 
          details: error?.message || String(error)
        });
      }
    }
  });

  app.get("/api/renovation-projects/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const projects = await storage.getRenovationProjectsByUser(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
