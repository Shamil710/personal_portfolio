// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import commentsRouter from "./routes/comments.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use("/api/comments", commentsRouter);

// ── Health check ──
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── MongoDB ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
