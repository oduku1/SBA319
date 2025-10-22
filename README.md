# 🎌 My Anime List Web App

A full-stack anime tracking application that lets users search for anime using the **Jikan API**, add them to their personal watchlist, rate them, and update their progress — all stored securely in MongoDB.

---

## 🚀 Features

- 🔍 **Search Anime** — Uses [Jikan API](https://docs.api.jikan.moe/) to find anime by title.  
- 💾 **Save Anime** — Add shows to your list with status and rating.  
- 📝 **Update Progress** — Edit your watch status or rating anytime.  
- 📦 **MongoDB Integration** — Data persists for each user.  
- 🔐 **User Accounts (Optional)** — Supports token-based authentication for per-user lists.

---

## 🧠 Tech Stack

**Frontend**
- HTML, CSS, EJS, JavaScript (Vanilla JS Fetch API)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose

**External API**
- [Jikan API](https://api.jikan.moe/v4) — for anime data from MyAnimeList.

---

## 🗂️ Project Structure

```
my-anime-list/
├── models/
│   └── Anime.js          # Mongoose schema for anime
├── routes/
│   └── animeRoutes.js    # API routes for CRUD operations
├── views/
│   └── anime.ejs         # Frontend template
├── server.js             # Express server entry point
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my-anime-list.git
cd my-anime-list
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Run the App

```bash
npm start
```

Then open your browser and go to:

```
http://localhost:3000
```

---

## 🧩 API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/anime`         | Fetch all saved anime    |
| POST   | `/anime`         | Add new anime to list    |
| PUT    | `/anime/:id`     | Update anime rating/status |
| DELETE | `/anime/:id`     | Remove anime from list   |

---

## 🧱 Mongoose Schema Example

```js
const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: [String],
  episodes: Number,
  rating: { type: Number, min: 0, max: 10 },
  status: {
    type: String,
    enum: ["Plan to Watch", "Watching", "Completed", "Dropped"],
    default: "Plan to Watch"
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
```

---

## 🧑‍💻 How It Works

1. **Search** for anime using the search bar.  
2. **Select status** and **enter rating** directly under each result.  
3. Click **Add** to save the anime to your personal list.  
4. View and update your saved anime in the “My Saved Anime” section.

---

## 🐛 Troubleshooting

### ❌ Error: `Cannot read properties of undefined (reading '_id')`
This happens if `req.user` is undefined.
- If you have authentication: ensure your JWT middleware sets `req.user`.
- If not using authentication yet, temporarily hardcode a `userId` in the backend route.



## 📜 License

MIT License © 2025 Omar

---

## 💬 Future Improvements

- ✅ Authentication & user sessions  
- ⭐ Sorting and filtering anime by rating or status  
- 🗓️ Track episodes watched  
- 🎨 Improved UI with React or Tailwind CSS  