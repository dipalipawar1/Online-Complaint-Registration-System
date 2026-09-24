const mongoose = require("mongoose");

// =========================
// COMPLAINT SCHEMA
// =========================

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "In Progress",
                "Resolved",
                "Rejected",
                "Closed"
            ],
            default: "Pending"
        },

        resolutionNote: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


// =========================
// DATABASE INDEXES
// =========================

// Find complaints of a specific user quickly
complaintSchema.index({
    userId: 1
});

// Filter complaints by status quickly
complaintSchema.index({
    status: 1
});

// Get latest complaints quickly
complaintSchema.index({
    createdAt: -1
});


// =========================
// MODEL
// =========================

module.exports = mongoose.model(
    "Complaint",
    complaintSchema
);