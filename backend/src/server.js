//const express = require("express");

import dotenv from "dotenv";
dotenv.config(); // ✅ REQUIRED

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";


const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ ONLY enable this if frontend is actually built & copied
const __filename = fileURLToPath(import.meta.url);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
