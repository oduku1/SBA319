import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Show register page
router.get("/register", (req, res) => res.render("register"));

// Show login page
router.get("/login", (req, res) => res.render("login"));

// Register user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).send("Invalid credentials");
  res.redirect(`/anime?userId=${user._id}`);
});

export default router;
