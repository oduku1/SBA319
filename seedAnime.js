import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // your user schema
import Anime from "./models/Anime.js"; // your anime schema

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Anime.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { username: "1", email: "1@1.com", password: "1" },
      { username: "2", email: "2@2.com", password: "2" },
    ]);

    // Example anime data with genres
    const animes = [
      {
        title: "Chainsaw Man Movie: Reze-hen",
        genre: ["Action", "Horror", "Supernatural"],
        episodes: 1,
        rating: 0,
        status: "Dropped",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/1763/150638.jpg",
        userId: users[0]._id,
      },
      {
        title: "Demon Slayer: Kimetsu no Yaiba",
        genre: ["Action", "Adventure", "Supernatural"],
        episodes: 26,
        rating: 0,
        status: "Plan to Watch",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        userId: users[0]._id,
      },
      {
        title: "Attack on Titan",
        genre: ["Action", "Drama", "Fantasy"],
        episodes: 75,
        rating: 0,
        status: "Watching",
        episodesWatched: 20,
        image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        userId: users[1]._id,
      },
    ];

    await Anime.insertMany(animes);

    console.log("Seed data inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();