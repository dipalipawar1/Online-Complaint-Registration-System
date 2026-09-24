const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        complaintId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "Assigned",
                "In Progress",
                "Resolved",
                "Closed"
            ],
            default: "Assigned"
        },

        assignedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// =========================
// DATABASE INDEXES
// =========================

// Find assignments for a particular agent
assignmentSchema.index({ agentId: 1 });

// Find assignment using complaint
assignmentSchema.index({ complaintId: 1 });

// Find assignments by status
assignmentSchema.index({ status: 1 });

// Sort assignments by newest
assignmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Assignment", assignmentSchema);