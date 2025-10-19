import express from "express";
import User from "../models/user.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already used" });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.password !== password)
    return res.status(401).json({ error: "Incorrect password" });

  // Simple token = user ID string (not secure)
  const token = user._id.toString();

  res.json({ message: "Login successful", token });
});

export default router;