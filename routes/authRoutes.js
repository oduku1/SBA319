import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/register", (req, res) => res.render("register"));

router.get("/login", (req, res) => res.render("login"));

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = user._id.toString();
  res.json({ token, user });
});

export default router;