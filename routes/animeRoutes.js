import express from "express";
import Anime from "../models/anime.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Get user's anime
router.get("/", authMiddleware, async (req, res) => {
  const animeList = await Anime.find({ userId: req.user._id });
  res.json(animeList);
});

// Add anime (✅ this saves to MongoDB)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, episodes, image, status, rating, episodesWatched } = req.body;
    const newAnime = new Anime({
      title,
      episodes,
      image,
      status,
      rating,
      episodesWatched,
      userId: req.user._id,
    });
    await newAnime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to save anime" });
  }
});

// Update anime
router.put("/:id", authMiddleware, async (req, res) => {
  const { status, rating, episodesWatched } = req.body;
  const updatedAnime = await Anime.findByIdAndUpdate(
    req.params.id,
    { status, rating, episodesWatched },
    { new: true }
  );
  res.json(updatedAnime);
});

// Delete anime
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Anime.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Anime deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete anime" });
  }
});

export default router;
