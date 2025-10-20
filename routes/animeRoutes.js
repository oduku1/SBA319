import express from "express";
import Anime from "../models/anime.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Get all anime
router.get("/", authMiddleware, async (req, res) => {
  const animeList = await Anime.find({ userId: req.user._id });
  res.json(animeList);
});

// Add anime
router.post("/", authMiddleware, async (req, res) => {
  const { title, episodes, image, status, rating, episodesWatched } = req.body;
  const newAnime = new Anime({
    title,
    episodes,
    image,
    status: status || "Plan to Watch",
    rating: rating || 0,
    episodesWatched: episodesWatched || 0,
    userId: req.user._id
  });
  await newAnime.save();
  res.status(201).json(newAnime);
});

// Update anime
router.put("/:id", authMiddleware, async (req, res) => {
  const { status, rating, episodesWatched } = req.body;
  const updatedAnime = await Anime.findByIdAndUpdate(
    req.params.id,
    { status, rating, episodesWatched },
    { new: true }
  );
  if (!updatedAnime) return res.status(404).json({ error: "Anime not found" });
  res.json(updatedAnime);
});

export default router;