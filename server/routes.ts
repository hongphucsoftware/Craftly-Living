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
  urgency: z.string().nullish(),
  additionalNotes: z.string().nullish(),
  userId: z.number().optional().nullable(),
});

// Helper function to parse budget range strings
const parseBudgetRange = (budgetString: string) => {
  switch (budgetString) {
    case "Under $15,000":
      return { min: "0", max: "15000" };
    case "$15,000 - $35,000":
      return { min: "15000", max: "35000" };
    case "$35,000 - $65,000":
      return { min: "35000", max: "65000" };
    case "$65,000 - $100,000":
      return { min: "65000", max: "100000" };
    case "Over $100,000":
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
      
      const projectData: any = {
        renovationType: formData.renovationType,
        postcode: formData.postcode,
        budgetMin,
        budgetMax,
        style: formData.style,
        timeline: formData.timeline,
        urgency: formData.urgency,
        additionalNotes: formData.additionalNotes,
      };
      
      // Only include userId if it's provided and valid
      if (formData.userId && formData.userId > 0) {
        projectData.userId = formData.userId;
      }
      
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

  app.get("/api/renovation-projects", async (req, res) => {
    try {
      const projects = await storage.getRenovationProjectsByUser(null);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching all projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
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

  // Builder routes
  app.post("/api/builders", async (req, res) => {
    try {
      const { insertBuilderSchema } = await import("@shared/schema");
      
      // Clean up empty string values for optional fields
      const cleanedData = {
        ...req.body,
        priceRangeMin: req.body.priceRangeMin && req.body.priceRangeMin !== "" ? req.body.priceRangeMin : null,
        priceRangeMax: req.body.priceRangeMax && req.body.priceRangeMax !== "" ? req.body.priceRangeMax : null,
        abn: req.body.abn && req.body.abn !== "" ? req.body.abn : null,
        licenseNumber: req.body.licenseNumber && req.body.licenseNumber !== "" ? req.body.licenseNumber : null,
        websiteUrl: req.body.websiteUrl && req.body.websiteUrl !== "" ? req.body.websiteUrl : null,
        insuranceDetails: req.body.insuranceDetails && req.body.insuranceDetails !== "" ? req.body.insuranceDetails : null,
        profileImageUrl: req.body.profileImageUrl && req.body.profileImageUrl !== "" ? req.body.profileImageUrl : null,
        portfolioImages: req.body.portfolioImages || [],
      };
      
      const validatedData = insertBuilderSchema.parse(cleanedData);
      
      // Transform data for database insertion
      const dbData = {
        ...validatedData,
        serviceAreas: JSON.stringify(validatedData.serviceAreas),
        specialties: JSON.stringify(validatedData.specialties),
        portfolioImages: JSON.stringify(validatedData.portfolioImages),
      };
      

      
      // Check if builder already exists
      const existingBuilder = await storage.getBuilderByEmail(req.body.email);
      if (existingBuilder) {
        return res.status(400).json({ error: "Builder with this email already exists" });
      }

      const builder = await storage.createBuilder(dbData);
      res.json(builder);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid builder data", details: error.errors });
      } else {
        console.error("Error creating builder:", error);
        res.status(500).json({ 
          error: "Failed to create builder profile", 
          details: error?.message || String(error)
        });
      }
    }
  });

  app.get("/api/builders", async (req, res) => {
    try {
      const builders = await storage.getAllBuilders();
      res.json(builders);
    } catch (error) {
      console.error("Error fetching builders:", error);
      res.status(500).json({ error: "Failed to fetch builders" });
    }
  });

  app.get("/api/builders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid builder ID" });
      }
      const builder = await storage.getBuilder(id);
      if (!builder) {
        return res.status(404).json({ error: "Builder not found" });
      }
      res.json(builder);
    } catch (error) {
      console.error("Error fetching builder:", error);
      res.status(500).json({ error: "Failed to fetch builder" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
