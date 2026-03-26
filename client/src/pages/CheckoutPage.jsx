// src/pages/CheckoutPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useState } from "react";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!item) return <p>No item selected.</p>;

  const calcServiceFee = (price) => {
    const flat = 10;
    const percent = price * 0.02;
    return Math.max(flat, Math.round(percent));
  };

  const itemPrice = item.price;
  const serviceFee = calcServiceFee(itemPrice);
  const total = itemPrice + serviceFee;

  const handlePay = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/orders", { itemId: item._id });
      alert(
        `Payment successful! You earned ${data.greenPointsEarned.buyer} GreenPoints.`
      );
      navigate("/profile");
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>Item: {item.title}</p>
      <p>Item price (to seller): ₹{itemPrice}</p>
      <p>Service fee (to EcoSwap): ₹{serviceFee}</p>
      <p><strong>Total payable: ₹{total}</strong></p>
      <button disabled={loading} onClick={handlePay}>
        {loading ? "Processing..." : "Pay & Earn GreenPoints"}
      </button>
    </div>
  );
};

export default CheckoutPage;
