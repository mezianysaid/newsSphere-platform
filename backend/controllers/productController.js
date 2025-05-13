const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../utils/errorResponse");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/products/create
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    // Handle price and stock as numbers
    req.body.price = Number(req.body.price);

    // Handle images if they exist
    if (req.files && req.files.length > 0) {
      // Map the file paths to an array of strings
      req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
    } else {
      // If no images, set empty array
      req.body.images = [];
    }

    // Create the product
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(401).json({
      success: false,
      message: "Product not found",
    });
  }

  // Make sure user is product owner

  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "User is not authorized to delete this product",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is product owner

  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "User is not authorized to delete this product",
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new ErrorResponse("Please provide a search query", 400));
  }

  const products = await Product.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
    ],
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Filter products
// @route   GET /api/products/filter
// @access  Public
exports.filterProducts = asyncHandler(async (req, res, next) => {
  const { category, minPrice, maxPrice, rating } = req.query;

  let query = Product.find();

  if (category) {
    query = query.find({ category });
  }

  if (minPrice || maxPrice) {
    const priceQuery = {};
    if (minPrice) priceQuery.$gte = minPrice;
    if (maxPrice) priceQuery.$lte = maxPrice;
    query = query.find({ price: priceQuery });
  }

  if (rating) {
    query = query.find({ rating: { $gte: rating } });
  }

  const products = await query;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Sort products
// @route   GET /api/products/sort
// @access  Public
exports.sortProducts = asyncHandler(async (req, res, next) => {
  const { sortBy } = req.query;

  if (!sortBy) {
    return next(new ErrorResponse("Please provide a sort parameter", 400));
  }

  let sortQuery = {};
  switch (sortBy) {
    case "price-asc":
      sortQuery = { price: 1 };
      break;
    case "price-desc":
      sortQuery = { price: -1 };
      break;
    case "rating-desc":
      sortQuery = { rating: -1 };
      break;
    case "name-asc":
      sortQuery = { name: 1 };
      break;
    case "name-desc":
      sortQuery = { name: -1 };
      break;
    default:
      return next(new ErrorResponse("Invalid sort parameter", 400));
  }

  const products = await Product.find().sort(sortQuery);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});
