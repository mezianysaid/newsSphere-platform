const Article = require("../models/Article");
const asyncHandler = require("../middleware/asyncHandler");
const { ErrorResponse } = require("../utils/errorResponse");

// @desc    Get all articles
// @route   GET /api/articles
// @access  Public
exports.getAllArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Article.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Article.countDocuments({ status: "published" }),
  ]);

  res.status(200).json({
    success: true,
    count: items.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: items,
  });
});

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Public
exports.getArticleById = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: article });
});

// @desc    Create new article
// @route   POST /api/articles
// @access  Private/Admin
exports.createArticle = asyncHandler(async (req, res) => {
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
    if (!req.body.coverImage) {
      req.body.coverImage = req.body.images[0];
    }
  }

  const article = await Article.create(req.body);
  res.status(201).json({ success: true, data: article });
});

// @desc    Update article
// @route   PUT /api/articles/:id
// @access  Private/Admin
exports.updateArticle = asyncHandler(async (req, res, next) => {
  let article = await Article.findById(req.params.id);

  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404)
    );
  }

  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
    if (!req.body.coverImage) {
      req.body.coverImage = req.body.images[0];
    }
  }

  article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: article });
});

// @desc    Delete article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return next(
      new ErrorResponse(`Article not found with id of ${req.params.id}`, 404)
    );
  }

  await Article.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});

// @desc    Search articles
// @route   GET /api/articles/search
// @access  Public
exports.searchArticles = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return next(new ErrorResponse("Please provide a search query", 400));
  }

  const articles = await Article.find({
    status: "published",
    $or: [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ],
  }).sort({ publishedAt: -1 });

  res
    .status(200)
    .json({ success: true, count: articles.length, data: articles });
});

// @desc    Filter articles
// @route   GET /api/articles/filter
// @access  Public
exports.filterArticles = asyncHandler(async (req, res) => {
  const { category, author, tag, status, from, to } = req.query;
  let query = Article.find();

  if (status) query = query.find({ status });
  if (category) query = query.find({ category });
  if (author) query = query.find({ author });
  if (tag) query = query.find({ tags: { $in: [tag] } });
  if (from || to) {
    const dateQuery = {};
    if (from) dateQuery.$gte = new Date(from);
    if (to) dateQuery.$lte = new Date(to);
    query = query.find({ publishedAt: dateQuery });
  }

  const articles = await query.sort({ publishedAt: -1 });
  res
    .status(200)
    .json({ success: true, count: articles.length, data: articles });
});

// @desc    Sort articles
// @route   GET /api/articles/sort
// @access  Public
exports.sortArticles = asyncHandler(async (req, res, next) => {
  const { sortBy } = req.query;
  if (!sortBy) {
    return next(new ErrorResponse("Please provide a sort parameter", 400));
  }

  let sortQuery = {};
  switch (sortBy) {
    case "date-desc":
      sortQuery = { publishedAt: -1 };
      break;
    case "date-asc":
      sortQuery = { publishedAt: 1 };
      break;
    case "views-desc":
      sortQuery = { views: -1 };
      break;
    case "title-asc":
      sortQuery = { title: 1 };
      break;
    case "title-desc":
      sortQuery = { title: -1 };
      break;
    default:
      return next(new ErrorResponse("Invalid sort parameter", 400));
  }

  const articles = await Article.find({ status: "published" }).sort(sortQuery);
  res
    .status(200)
    .json({ success: true, count: articles.length, data: articles });
});
