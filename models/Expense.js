const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
      min: [0, "Negative amount are not allowed"],
    },
    description: {
      type: String,
      maxLength: 50,
    },
    category: {
      type: String,
      lowercase: true,
      default: "miscellaneous",
      enum: {
        values: [
          "groceries",
          "utilities",
          "rent",
          "transportation",
          "entertainment",
          "mobile top-up",
          "foodstuffs",
          "education",
          "urgent",
          "babe",
          "miscellaneous",
        ],
        message: "{VALUE} is not one of the category mentioned",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Enter a valid user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
