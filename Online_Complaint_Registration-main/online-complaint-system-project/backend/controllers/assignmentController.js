const Assignment = require("../models/Assignment");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

// =========================
// ASSIGN COMPLAINT TO AGENT
// =========================

const assignComplaint = async (req, res) => {
    try {
        const { complaintId, agentId } = req.body;

        // Check required fields
        if (!complaintId || !agentId) {
            return res.status(400).json({
                success: false,
                message: "Complaint ID and Agent ID are required"
            });
        }

        // Find complaint
        const complaint = await Complaint.findOne({
            complaintId: complaintId
        });

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        // Find agent
        const agent = await User.findOne({
            userId: agentId,
            role: "AGENT"
        });

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        // Check if complaint is already assigned
        const existingAssignment = await Assignment.findOne({
            complaintId: complaint._id
        });

        if (existingAssignment) {
            return res.status(400).json({
                success: false,
                message: "Complaint is already assigned"
            });
        }

        // Create assignment
        const assignment = await Assignment.create({
            complaintId: complaint._id,
            userId: complaint.userId,
            agentId: agent._id,
            assignedBy: req.user.id,
            status: "Assigned"
        });

        // Update complaint status
        complaint.status = "Assigned";
        await complaint.save();

        res.status(201).json({
            success: true,
            message: "Complaint assigned successfully",
            assignment
        });

    } catch (error) {
        console.error("Assign Complaint Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while assigning complaint"
        });
    }
};


// =========================
// GET AGENT COMPLAINTS
// =========================

const getAgentComplaints = async (req, res) => {
    try {
        const assignments = await Assignment.find({
            agentId: req.user.id
        })
            .populate("complaintId")
            .populate("userId", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: assignments.length,
            assignments
        });

    } catch (error) {
        console.error("Get Agent Complaints Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error while fetching assigned complaints"
        });
    }
};


// =========================
// UPDATE ASSIGNMENT STATUS
// =========================

// UPDATE ASSIGNMENT STATUS
const updateAssignmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { complaintId } = req.params;

        const allowedStatuses = [
            "In Progress",
            "Resolved",
            "Closed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        // Find complaint
        const complaint = await Complaint.findOne({
            complaintId: complaintId
        });

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        // Find assignment for this agent
        const assignment = await Assignment.findOne({
            complaintId: complaint._id,
            agentId: req.user.id
        });

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        // Current status
        const currentStatus = assignment.status;

        // Allowed status transitions
        const allowedTransitions = {
            "Assigned": ["In Progress"],
            "In Progress": ["Resolved"],
            "Resolved": ["Closed"],
            "Closed": []
        };

        const nextStatuses =
            allowedTransitions[currentStatus] || [];

        // Check transition
        if (!nextStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message:
                    `Cannot change status from "${currentStatus}" to "${status}".`
            });
        }

        // Update assignment
        assignment.status = status;
        await assignment.save();

        // Update complaint
        complaint.status = status;
        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Complaint status updated successfully",
            complaint
        });

    } catch (error) {
        console.error(
            "Update Status Error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error while updating status"
        });
    }
};


module.exports = {
    assignComplaint,
    getAgentComplaints,
    updateAssignmentStatus
};