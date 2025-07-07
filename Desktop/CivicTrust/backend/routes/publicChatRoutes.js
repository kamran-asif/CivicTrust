import express from "express";
import PublicChatMessage from "../models/publicChatModel.js";

const router = express.Router();

// GET all public chat messages
router.get("/", async (req, res) => {
  try {
    const { room } = req.query;
    const query = room ? { room } : {};
    const messages = await PublicChatMessage.find(query).sort({ createdAt: 1 }); // sort oldest → newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// GET messages for a specific room
router.get("/:room", async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await PublicChatMessage.find({ room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;