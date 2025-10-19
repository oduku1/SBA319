import { verifyToken } from "../middleware/authmiddleware.js";

router.post("/", verifyToken, async (req, res) => {
  const anime = new Anime({ ...req.body, userId: req.user._id });
  await anime.save();
  res.status(201).json(anime);
});

router.get("/", verifyToken, async (req, res) => {
  const list = await Anime.find({ userId: req.user._id });
  res.json(list);
});