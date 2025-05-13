const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};

// Check if user is admin
// exports.admin = async (req, res, next) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res
//         .status(403)
//         .json({
//           message:
//             "toooozzzzzzzzzzzzzzzzzzzzzzz Access denied. Admin privileges required.",
//         });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Check if user is admin (legacy function)
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "tooooooooooooooooorrr. Admin privileges required." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
