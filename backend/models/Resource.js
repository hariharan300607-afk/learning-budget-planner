
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Resource name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Resource category is required"],
      enum: ["Course", "Certification", "Tool"],
    },

    price: {
      type: Number,
      required: [true, "Resource price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);
