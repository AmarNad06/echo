// src/utils/pointsRules.js
export const getPointsForTransaction = ({ action }) => {
  switch (action) {
    case "BUY_SECOND_HAND":
      return 5;
    case "SELL_SECOND_HAND":
      return 8;
    case "DONATE_ITEM":
      return 10;
    default:
      return 0;
  }
};
