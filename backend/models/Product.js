const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Sports",
        "Beauty",
        "Toys",
        "Others",
      ],
    },
    images: [
      {
        type: String,
        required: [true, "Please add at least one image"],
      },
    ],
    productLink: {
      type: String,
      required: [true, "Please add a product link"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 4,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add text index for search functionality
ProductSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", ProductSchema);
