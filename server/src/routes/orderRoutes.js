// src/routes/orderRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import GreenPointLog from "../models/GreenPointLog.js";
import { calculateServiceFee } from "../utils/paymentUtils.js";
import { getPointsForTransaction } from "../utils/pointsRules.js";

const router = express.Router();

// Create order & simulate payment
router.post("/", protect, async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId).populate("seller");

    if (!item || item.status !== "AVAILABLE") {
      return res.status(400).json({ message: "Item not available" });
    }

    const itemPrice = item.price;
    const serviceFee = calculateServiceFee(itemPrice);
    const totalAmount = itemPrice + serviceFee;

    // In real life, call payment gateway here (Razorpay/Stripe, etc.)

    const order = await Order.create({
      item: item._id,
      buyer: req.user._id,
      seller: item.seller._id,
      itemPrice,
      serviceFee,
      totalAmount,
      status: "COMPLETED",
    });

    // Mark item as sold
    item.status = "SOLD";
    await item.save();

    // Update GreenPoints for buyer and seller
    const buyer = await User.findById(req.user._id);
    const seller = await User.findById(item.seller._id);

    const buyerPts = getPointsForTransaction({ action: "BUY_SECOND_HAND" });
    const sellerPts = getPointsForTransaction({ action: "SELL_SECOND_HAND" });

    buyer.greenPoints += buyerPts;
    seller.greenPoints += sellerPts;
    await buyer.save();
    await seller.save();

    await GreenPointLog.create({
      user: buyer._id,
      points: buyerPts,
      type: "BUY_SECOND_HAND",
      description: `Bought item ${item.title}`,
    });
    await GreenPointLog.create({
      user: seller._id,
      points: sellerPts,
      type: "SELL_SECOND_HAND",
      description: `Sold item ${item.title}`,
    });

    res.status(201).json({
      message: "Order completed",
      order,
      feeBreakdown: { itemPrice, serviceFee, totalAmount },
      greenPointsEarned: { buyer: buyerPts, seller: sellerPts },
    });
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

export default router;
