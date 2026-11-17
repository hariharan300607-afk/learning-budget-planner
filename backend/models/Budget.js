
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    monthlyBudget: {
      type: Number,
      required: true,
      min: [1, "Monthly budget must be greater than zero"],
      default: 10000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Budget", budgetSchema);
