const Complaint = require("../models/Complaint");
const { validationResult } = require("express-validator");

// =========================
// CREATE COMPLAINT
// =========================

const createComplaint = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const {
            name,
            address,
            city,
            state,
            pincode,
            subject,
            description
        } = req.body;

        // Generate complaint ID
        const complaintId = `CMP-${Date.now()}`;

        // Create complaint
        const complaint = await Complaint.create({
            complaintId,
            userId: req.user.id,
            name,
            address,
            city,
            state,
            pincode,
            subject,
            description,
            status: "Pending"
        });

        res.status(201).json({
            success: true,
            message: "Complaint registered successfully",
            complaint
        });

    } catch (error) {
        console.error("Create Complaint Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while creating complaint"
        });
    }
};


// =========================
// GET MY COMPLAINTS
// =========================

const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Get Complaints Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while fetching complaints"
        });
    }
};


// =========================
// GET SINGLE COMPLAINT
// =========================

const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            complaintId: req.params.complaintId,
            userId: req.user.id
        });

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            complaint
        });

    } catch (error) {
        console.error("Get Complaint Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while fetching complaint"
        });
    }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
    createComplaint,
    getMyComplaints,
    getComplaintById
};