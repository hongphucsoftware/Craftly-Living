var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  builders: () => builders,
  insertBuilderSchema: () => insertBuilderSchema,
  insertRenovationProjectSchema: () => insertRenovationProjectSchema,
  insertUserSchema: () => insertUserSchema,
  renovationProjects: () => renovationProjects,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users, renovationProjects, builders, insertUserSchema, insertRenovationProjectSchema, insertBuilderSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull()
    });
    renovationProjects = pgTable("renovation_projects", {
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
      createdAt: timestamp("created_at").defaultNow()
    });
    builders = pgTable("builders", {
      id: serial("id").primaryKey(),
      businessName: text("business_name").notNull(),
      contactName: text("contact_name").notNull(),
      email: text("email").notNull().unique(),
      phone: text("phone").notNull(),
      abn: text("abn"),
      businessAddress: text("business_address").notNull(),
      serviceAreas: text("service_areas").notNull(),
      // JSON array as text
      specialties: text("specialties").notNull(),
      // JSON array as text
      yearsExperience: integer("years_experience").notNull(),
      insuranceDetails: text("insurance_details"),
      licenseNumber: text("license_number"),
      websiteUrl: text("website_url"),
      profileImageUrl: text("profile_image_url"),
      portfolioImages: text("portfolio_images"),
      // JSON array as text
      description: text("description").notNull(),
      priceRangeMin: decimal("price_range_min", { precision: 10, scale: 2 }),
      priceRangeMax: decimal("price_range_max", { precision: 10, scale: 2 }),
      verified: boolean("verified").default(false),
      rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
      totalReviews: integer("total_reviews").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true
    });
    insertRenovationProjectSchema = createInsertSchema(renovationProjects).omit({
      id: true,
      createdAt: true
    }).extend({
      budgetMin: z.string().optional().nullable(),
      budgetMax: z.string().optional().nullable()
    });
    insertBuilderSchema = createInsertSchema(builders).omit({
      id: true,
      verified: true,
      rating: true,
      totalReviews: true,
      createdAt: true,
      updatedAt: true
    }).extend({
      serviceAreas: z.array(z.string()),
      specialties: z.array(z.string()),
      portfolioImages: z.array(z.string()).optional(),
      priceRangeMin: z.string().optional().nullable(),
      priceRangeMax: z.string().optional().nullable()
    });
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
init_schema();

// server/db.ts
init_schema();
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createRenovationProject(insertProject) {
    const [project] = await db.insert(renovationProjects).values(insertProject).returning();
    return project;
  }
  async getRenovationProjectsByUser(userId) {
    if (userId === null) {
      return await db.select().from(renovationProjects);
    }
    return await db.select().from(renovationProjects).where(eq(renovationProjects.userId, userId));
  }
  async createBuilder(insertBuilder) {
    const [builder] = await db.insert(builders).values(insertBuilder).returning();
    return builder;
  }
  async getBuilder(id) {
    const [builder] = await db.select().from(builders).where(eq(builders.id, id));
    return builder || void 0;
  }
  async getBuilderByEmail(email) {
    const [builder] = await db.select().from(builders).where(eq(builders.email, email));
    return builder || void 0;
  }
  async getAllBuilders() {
    return await db.select().from(builders);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
init_schema();
import { z as z2 } from "zod";
var formRenovationProjectSchema = z2.object({
  renovationType: z2.string(),
  postcode: z2.string(),
  budget: z2.string().optional(),
  budgetMin: z2.string().optional(),
  budgetMax: z2.string().optional(),
  style: z2.string(),
  timeline: z2.string(),
  urgency: z2.string().nullish(),
  additionalNotes: z2.string().nullish(),
  userId: z2.number().optional().nullable()
});
var parseBudgetRange = (budgetString) => {
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
async function registerRoutes(app2) {
  app2.post("/api/renovation-projects", async (req, res) => {
    try {
      const formData = formRenovationProjectSchema.parse(req.body);
      let budgetMin = formData.budgetMin;
      let budgetMax = formData.budgetMax;
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
        additionalNotes: formData.additionalNotes
      };
      if (formData.userId && formData.userId > 0) {
        projectData.userId = formData.userId;
      }
      const validatedData = insertRenovationProjectSchema.parse(projectData);
      const project = await storage.createRenovationProject(validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/renovation-projects", async (req, res) => {
    try {
      const projects = await storage.getRenovationProjectsByUser(null);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching all projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  app2.get("/api/renovation-projects/user/:userId", async (req, res) => {
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
  app2.post("/api/builders", async (req, res) => {
    try {
      const { insertBuilderSchema: insertBuilderSchema2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const cleanedData = {
        ...req.body,
        priceRangeMin: req.body.priceRangeMin && req.body.priceRangeMin !== "" ? req.body.priceRangeMin : null,
        priceRangeMax: req.body.priceRangeMax && req.body.priceRangeMax !== "" ? req.body.priceRangeMax : null,
        abn: req.body.abn && req.body.abn !== "" ? req.body.abn : null,
        licenseNumber: req.body.licenseNumber && req.body.licenseNumber !== "" ? req.body.licenseNumber : null,
        websiteUrl: req.body.websiteUrl && req.body.websiteUrl !== "" ? req.body.websiteUrl : null,
        insuranceDetails: req.body.insuranceDetails && req.body.insuranceDetails !== "" ? req.body.insuranceDetails : null,
        profileImageUrl: req.body.profileImageUrl && req.body.profileImageUrl !== "" ? req.body.profileImageUrl : null,
        portfolioImages: req.body.portfolioImages || []
      };
      const validatedData = insertBuilderSchema2.parse(cleanedData);
      const dbData = {
        ...validatedData,
        serviceAreas: JSON.stringify(validatedData.serviceAreas),
        specialties: JSON.stringify(validatedData.specialties),
        portfolioImages: JSON.stringify(validatedData.portfolioImages)
      };
      const existingBuilder = await storage.getBuilderByEmail(req.body.email);
      if (existingBuilder) {
        return res.status(400).json({ error: "Builder with this email already exists" });
      }
      const builder = await storage.createBuilder(dbData);
      res.json(builder);
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/builders", async (req, res) => {
    try {
      const builders2 = await storage.getAllBuilders();
      res.json(builders2);
    } catch (error) {
      console.error("Error fetching builders:", error);
      res.status(500).json({ error: "Failed to fetch builders" });
    }
  });
  app2.get("/api/builders/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(new URL("src", import.meta.url).pathname)
      // 👈 this makes @/ point to /src at the root in ESM
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        process.cwd(),
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(process.cwd(), "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000");
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
  server.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
  });
  server.on("error", (err) => {
    console.error("\u274C Server failed to start:", err.message);
    process.exit(1);
  });
})();
