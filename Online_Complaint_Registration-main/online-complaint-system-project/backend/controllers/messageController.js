const Message = require("../models/Message");
const Complaint = require("../models/Complaint");
const Assignment = require("../models/Assignment");


// CHECK WHETHER USER CAN ACCESS COMPLAINT CHAT
const canAccessChat = async (req, complaint) => {

    // ADMIN can access complaint chat
    if (req.user.role === "ADMIN") {
        return true;
    }

    // USER can access only their own complaint
    if (req.user.role === "USER") {
        return complaint.userId.toString() === req.user.id;
    }

    // AGENT can access only assigned complaint
    if (req.user.role === "AGENT") {

        const assignment = await Assignment.findOne({
            complaintId: complaint._id,
            agentId: req.user.id
        });

        return !!assignment;
    }

    return false;
};


// SEND MESSAGE
const sendMessage = async (req, res) => {

    try {

        const { complaintId, message } = req.body;

        if (!complaintId || !message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Complaint ID and message are required"
            });
        }


        // FIND COMPLAINT
        const complaint = await Complaint.findOne({
            complaintId: complaintId
        });


        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }


        // CHECK CHAT ACCESS
        const hasAccess = await canAccessChat(
            req,
            complaint
        );


        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this complaint chat"
            });
        }


        // CREATE MESSAGE
        const newMessage = await Message.create({

            complaintId: complaint._id,

            senderId: req.user.id,

            message: message.trim()

        });


        // POPULATE SENDER
        await newMessage.populate(
            "senderId",
            "name email role userId"
        );


        res.status(201).json({

            success: true,

            message: "Message sent successfully",

            data: newMessage

        });


    } catch (error) {

        console.error(
            "Send Message Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Server error while sending message"

        });

    }

};



// GET COMPLAINT MESSAGES
const getMessages = async (req, res) => {

    try {

        const { complaintId } = req.params;


        // FIND COMPLAINT
        const complaint = await Complaint.findOne({
            complaintId: complaintId
        });


        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }


        // CHECK CHAT ACCESS
        const hasAccess = await canAccessChat(
            req,
            complaint
        );


        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this complaint chat"
            });
        }


        // GET MESSAGES
        const messages = await Message.find({

            complaintId: complaint._id

        })
            .populate(
                "senderId",
                "name email role userId"
            )
            .sort({
                createdAt: 1
            });


        res.status(200).json({

            success: true,

            count: messages.length,

            messages

        });


    } catch (error) {

        console.error(
            "Get Messages Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message: "Server error while fetching messages"

        });

    }

};


module.exports = {

    sendMessage,
    getMessages

};