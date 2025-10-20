import express from "express";
import Anime from "../models/anime.js";

const router = express.Router();

// Anime list page
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const list = await Anime.find({ userId });
  res.render("anime", { list, userId });
});

// Add new anime
router.post("/", async (req, res) => {
  const anime = new Anime(req.body);
  await anime.save();
  res.redirect(`/anime?userId=${anime.userId}`);
});

export default router;