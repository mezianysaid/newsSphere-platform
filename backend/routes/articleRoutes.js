const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  filterArticles,
  sortArticles,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getAllArticles);
router.get("/search", searchArticles);
router.get("/filter", filterArticles);
router.get("/sort", sortArticles);
router.get("/:id", getArticleById);

// Protected routes
router.use(protect);
router.post("/", upload.array("images", 5), createArticle);
router.put("/:id", upload.array("images", 5), updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
