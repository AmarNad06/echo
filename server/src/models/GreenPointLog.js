// src/models/GreenPointLog.js
import mongoose from "mongoose";

const greenPointLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true },
    type: {
      type: String,
      enum: [
        "BUY_SECOND_HAND",
        "SELL_SECOND_HAND",
        "DONATE_ITEM",
        "RECYCLING_EVENT",
        "SUSTAINABLE_TRANSPORT",
      ],
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const GreenPointLog = mongoose.model("GreenPointLog", greenPointLogSchema);
export default GreenPointLog;
