import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";
import authMiddleware from "./middleware/authmiddleware.js"; // important!

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));

app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);

app.get("/", (req, res) => res.redirect("/auth/login"));

app.get("/anime-page", async (req, res) => {
    const token = req.query.token;
    if (!token) return res.redirect("/auth/login"); // no token → back to login
  
    const User = mongoose.model("User");
    const user = await User.findById(token);
    if (!user) return res.redirect("/auth/login"); // invalid token
  
    const Anime = mongoose.model("Anime");
    const animeList = await Anime.find({ userId: user._id });
  
    res.render("anime", { user, animeList });
  });

app.listen(5050, () => console.log("🚀 Server running on http://localhost:5050"));
