// src/routes/itemRoutes.js
import express from "express";
import Item from "../models/Item.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create item
router.post("/", protect, async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, seller: req.user._id });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Item creation failed" });
  }
});

// Get all available items with filters
router.get("/", protect, async (req, res) => {
  try {
    const { category, course, semester, hostelExit } = req.query;
    const filter = { status: "AVAILABLE" };
    if (category) filter.category = category;
    if (course) filter.course = course;
    if (semester) filter.semester = semester;
    if (hostelExit === "true") filter.isHostelExit = true;

    const items = await Item.find(filter).populate("seller", "name rating");
    res.json(items);
  } catch {
    res.status(500).json({ message: "Unable to fetch items" });
  }
});

export default router;
