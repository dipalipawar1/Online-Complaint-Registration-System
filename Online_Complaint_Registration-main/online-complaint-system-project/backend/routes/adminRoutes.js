const express = require("express");

const {
    getAllUsers,
    getAllAgents,
    getAllComplaints,
    createAgent
} = require("../controllers/adminController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const { body } = require("express-validator");

const router = express.Router();


// =========================
// GET ALL USERS
// =========================

router.get(
    "/users",
    protect,
    authorizeRoles("ADMIN"),
    getAllUsers
);


// =========================
// GET ALL AGENTS
// =========================

router.get(
    "/agents",
    protect,
    authorizeRoles("ADMIN"),
    getAllAgents
);


// =========================
// GET ALL COMPLAINTS
// =========================

router.get(
    "/complaints",
    protect,
    authorizeRoles("ADMIN"),
    getAllComplaints
);


// =========================
// CREATE AGENT
// =========================

router.post(
    "/agents",
    protect,
    authorizeRoles("ADMIN"),
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Agent name is required"),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid agent email"),

        body("phone")
            .trim()
            .notEmpty()
            .withMessage("Agent phone number is required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Agent password must be at least 6 characters")
    ],
    createAgent
);


module.exports = router;