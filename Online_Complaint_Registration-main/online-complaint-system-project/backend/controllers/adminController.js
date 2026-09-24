const User = require("../models/User");
const Complaint = require("../models/Complaint");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// =========================
// GET ALL USERS
// =========================

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(
            { role: "USER" },
            "-password"
        ).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Get Users Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while fetching users"
        });
    }
};


// =========================
// GET ALL AGENTS
// =========================

const getAllAgents = async (req, res) => {
    try {
        const agents = await User.find(
            { role: "AGENT" },
            "-password"
        ).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: agents.length,
            agents
        });
    } catch (error) {
        console.error("Get Agents Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while fetching agents"
        });
    }
};


// =========================
// GET ALL COMPLAINTS
// =========================

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("userId", "userId name email phone")
            .sort({ createdAt: -1 });

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
// CREATE AGENT
// =========================

const createAgent = async (req, res) => {
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
            email,
            phone,
            password
        } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create agent
        const agent = await User.create({
            userId: `AGT-${Date.now()}`,
            name,
            email,
            phone,
            password: hashedPassword,
            role: "AGENT"
        });

        res.status(201).json({
            success: true,
            message: "Agent created successfully",
            agent: {
                userId: agent.userId,
                name: agent.name,
                email: agent.email,
                phone: agent.phone,
                role: agent.role
            }
        });

    } catch (error) {
        console.error("Create Agent Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while creating agent"
        });
    }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
    getAllUsers,
    getAllAgents,
    getAllComplaints,
    createAgent
};