import User from "../models/user.js";

export default async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });

  const user = await User.findById(token);
  if (!user) return res.status(403).json({ error: "Invalid token" });

  req.user = user;
  next();
}