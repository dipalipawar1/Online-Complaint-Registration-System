const express = require("express");

const {
    createComplaint,
    getMyComplaints,
    getComplaintById
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");

const router = express.Router();

// =========================
// CREATE COMPLAINT
// =========================

router.post(
    "/",
    protect,
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required"),

        body("address")
            .trim()
            .notEmpty()
            .withMessage("Address is required"),

        body("city")
            .trim()
            .notEmpty()
            .withMessage("City is required"),

        body("state")
            .trim()
            .notEmpty()
            .withMessage("State is required"),

        body("pincode")
            .trim()
            .isLength({ min: 6, max: 6 })
            .isNumeric()
            .withMessage("Pincode must be exactly 6 digits"),

        body("subject")
            .trim()
            .notEmpty()
            .withMessage("Subject is required"),

        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required")
    ],
    createComplaint
);


// =========================
// GET MY COMPLAINTS
// =========================

router.get(
    "/my",
    protect,
    getMyComplaints
);


// =========================
// GET SINGLE COMPLAINT
// =========================

router.get(
    "/:complaintId",
    protect,
    getComplaintById
);


module.exports = router;