// src/utils/paymentUtils.js
export const calculateServiceFee = (price) => {
  const flat = 10; // ₹10 minimum
  const percent = price * 0.02; // 2%
  return Math.max(flat, Math.round(percent));
};
