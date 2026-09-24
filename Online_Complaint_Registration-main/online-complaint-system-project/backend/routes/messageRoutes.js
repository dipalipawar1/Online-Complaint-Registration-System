const express = require("express");

const {
    sendMessage,
    getMessages
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Send a message
router.post("/", protect, sendMessage);

// Get messages for a complaint
router.get("/:complaintId", protect, getMessages);

module.exports = router;