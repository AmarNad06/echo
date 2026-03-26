// src/models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "Textbooks",
        "Lab Equipment",
        "Calculators",
        "Hostel Appliances",
        "Cycles",
        "Electronics",
        "Event Outfits",
        "Other",
      ],
      required: true,
    },
    course: String,
    semester: String,
    condition: { type: String, enum: ["New", "Good", "Fair"], default: "Good" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    images: [String],
    isHostelExit: { type: Boolean, default: false },
    status: { type: String, enum: ["AVAILABLE", "RESERVED", "SOLD"], default: "AVAILABLE" },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
