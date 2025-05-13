const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  verifyToken,
  updateUser,
  forgotPassword,
  resetPassword,
  getUser,
} = require("../controllers/userController");

// Auth routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.put("/profile/:id", updateUser);
router.post("/refresh-token", protect, refreshToken);
router.get("/verify-token", protect, verifyToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
