const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Alternative implementation with more detailed error handling
const asyncHandler2 = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    // Log error for debugging
    console.error("Async Error:", error);

    // Handle specific types of errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format",
        details: "The provided ID is not in the correct format",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Error",
        details: "A record with this value already exists",
      });
    }

    // Default error response
    res.status(500).json({
      success: false,
      error: "Server Error",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};

module.exports = asyncHandler;
