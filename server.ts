import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateWebsite, chatEditWebsite } from "./src/server/gemini.ts";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Increase payload size limits to allow handling rich components and code structures
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Generate a new multi-page website from a natural language prompt
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "A prompt string is required." });
      }

      console.log(`[AI Gen] Generating website for prompt: "${prompt}"`);
      const project = await generateWebsite(prompt);
      res.json(project);
    } catch (error: any) {
      console.error("[AI Gen Error]:", error);
      res.status(500).json({
        error: "Failed to generate website.",
        details: error.message || String(error)
      });
    }
  });

  // Conversational chat edits on an existing website project
  app.post("/api/chat", async (req, res) => {
    try {
      const { project, message, history } = req.body;
      if (!project || !message) {
        return res.status(400).json({ error: "project and message are required." });
      }

      console.log(`[AI Chat] Editing project "${project.name}" with request: "${message}"`);
      const updatedProject = await chatEditWebsite(project, message, history || []);
      res.json(updatedProject);
    } catch (error: any) {
      console.error("[AI Chat Error]:", error);
      res.status(500).json({
        error: "Failed to edit website.",
        details: error.message || String(error)
      });
    }
  });

  // Integrate Vite dev middleware or serve production client static files
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");

    // Serve static assets with long caching
    app.use(express.static(distPath, { maxAge: "1d" }));

    // Fallback to React App index.html for clientside routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server startup failure:", err);
  process.exit(1);
});
