import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js"; 
import Anime from "./models/anime.js"; 

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Anime.deleteMany({});

    // Insert users
    const users = await User.insertMany([
      { username: "1", email: "1@1.com", password: "1" },
      { username: "2", email: "2@2.com", password: "2" },
      { username: "BobTheCar", email: "Bob@gmail.com", password: "Bob123" }
    ]);

    // Insert anime
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

      // Bob's anime
      {
        title: "One Piece",
        genre: ["Action", "Adventure", "Comedy"],
        episodes: 1050,
        rating: 0,
        status: "Watching",
        episodesWatched: 500,
        image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        userId: users[2]._id,
      },
      {
        title: "My Hero Academia",
        genre: ["Action", "Comedy", "Superhero"],
        episodes: 88,
        rating: 0,
        status: "Plan to Watch",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
        userId: users[2]._id,
      },
      {
        title: "Jujutsu Kaisen",
        genre: ["Action", "Supernatural", "Fantasy"],
        episodes: 24,
        rating: 0,
        status: "Plan to Watch",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/1184/109114.jpg",
        userId: users[2]._id,
      },
      {
        title: "Tokyo Revengers",
        genre: ["Action", "Drama", "Romance"],
        episodes: 24,
        rating: 0,
        status: "Plan to Watch",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/1653/108111.jpg",
        userId: users[2]._id,
      },
      {
        title: "Spy x Family",
        genre: ["Action", "Comedy", "Slice of Life"],
        episodes: 12,
        rating: 0,
        status: "Plan to Watch",
        episodesWatched: 0,
        image: "https://cdn.myanimelist.net/images/anime/1336/124223.jpg",
        userId: users[2]._id,
      }
    ];

    await Anime.insertMany(animes);

    console.log("Seed data for users and anime inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();