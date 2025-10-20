import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";

dotenv.config();
const app = express();

// Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

// MongoDB connection
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);

// Home redirects to login
app.get("/", (req, res) => res.redirect("/auth/login"));

app.listen(5050, () => console.log("🚀 Server running on http://localhost:5050"));
