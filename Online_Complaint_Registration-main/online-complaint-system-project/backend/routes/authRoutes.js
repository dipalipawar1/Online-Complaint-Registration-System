const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const { body } = require("express-validator");

const router = express.Router();

// Register validation
router.post(
    "/register",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email"),

        body("phone")
            .trim()
            .notEmpty()
            .withMessage("Phone number is required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
    ],
    registerUser
);

// Login validation
router.post(
    "/login",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email"),

        body("password")
            .notEmpty()
            .withMessage("Password is required"),
        
        body("role")
            .isIn(["USER", "ADMIN", "AGENT"])
            .withMessage("Invalid login role")
    ],
    loginUser
);

module.exports = router;