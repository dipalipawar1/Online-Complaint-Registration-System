const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        complaintId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// =========================
// DATABASE INDEXES
// =========================

// Find messages belonging to a complaint
messageSchema.index({ complaintId: 1 });

// Find messages sent by a particular user
messageSchema.index({ senderId: 1 });

// Sort chat messages chronologically
messageSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);