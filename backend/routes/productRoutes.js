const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
  sortProducts,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
router.get("/sort", sortProducts);
router.get("/:id", getProductById);

// Protected routes
router.use(protect);

// Product management routes
router.post("/create", protect, upload.array("images", 5), createProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/delete/:id", protect, deleteProduct);
router.put("/update/:id", protect, upload.array("images", 5), updateProduct);

module.exports = router;
