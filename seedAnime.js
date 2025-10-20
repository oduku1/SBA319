import mongoose from "mongoose";
import dotenv from "dotenv";
import Anime from "./models/anime.js"; // adjust path if needed

dotenv.config();

const ATLAS_URI = process.env.ATLAS_URI;
await mongoose.connect(ATLAS_URI);
console.log("✅ Connected to MongoDB");

// Replace with your MyAnimeList username
const username = "your_mal_username";

try {
  const response = await fetch(`https://api.jikan.moe/v4/users/${username}/animelist?status=watching`);
  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    console.log("❌ No anime found or invalid username");
    process.exit();
  }

  const animeList = data.data.map((entry) => ({
    title: entry.entry.title,
    score: entry.score,
    progress: `${entry.watched_episodes}/${entry.total_episodes || "?"}`,
    type: entry.entry.type,
    status: "Watching",
    image: entry.entry.images.jpg.image_url,
    userId: "YOUR_USER_ID_HERE" // optional
  }));

  await Anime.insertMany(animeList);
  console.log(`🎉 Inserted ${animeList.length} anime into MongoDB!`);
} catch (err) {
  console.error("❌ Error seeding data:", err);
}

mongoose.connection.close();