const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["USER", "AGENT", "ADMIN"],
            default: "USER"
        }
    },
    {
        timestamps: true
    }
);

// =========================
// DATABASE INDEXES
// =========================

// Find users by role quickly
userSchema.index({ role: 1 });

// Sort users by newest registration
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model("User", userSchema);