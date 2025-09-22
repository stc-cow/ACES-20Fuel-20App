import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/password-reset", async (req, res) => {
    const { email } = req.body as { email?: string };
    // Stub: integrate with email service (e.g., Zapier, SendGrid) here
    console.log("Password reset requested for:", email);
    res.json({ ok: true });
  });

  return app;
}
