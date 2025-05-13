const express = require("express");
const router = express.Router();
const { handleContactForm } = require("../controllers/contactController");

// Contact form route
router.post("/", handleContactForm);

module.exports = router;
