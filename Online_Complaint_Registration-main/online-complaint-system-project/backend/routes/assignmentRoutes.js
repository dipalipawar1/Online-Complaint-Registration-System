const express = require("express");

const {
    assignComplaint,
    getAgentComplaints,
    updateAssignmentStatus
} = require("../controllers/assignmentController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN → Assign complaint to an agent
router.post(
    "/assign",
    protect,
    authorizeRoles("ADMIN"),
    assignComplaint
);

// AGENT → View assigned complaints
router.get(
    "/agent",
    protect,
    authorizeRoles("AGENT"),
    getAgentComplaints
);

// AGENT → Update complaint status
router.put(
    "/:complaintId/status",
    protect,
    authorizeRoles("AGENT"),
    updateAssignmentStatus
);

module.exports = router;