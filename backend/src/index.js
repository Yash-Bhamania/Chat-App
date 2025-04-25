import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import cors from "cors"
import { connectDB } from "./lib/db.js";
import cookieParcer from 'cookie-parser'
import { app, server } from "./lib/socket.js";
import path from "path";


dotenv.config();

const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  }

}







const PORT = process.env.PORT;

app.use(express.json({ limit: '50mb' }))
app.use(cookieParcer())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
  connectDB()
});