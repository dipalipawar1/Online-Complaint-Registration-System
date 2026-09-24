    const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(loggerMiddleware);

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRoutes);

app.use("/api/complaints", complaintRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Online Complaint Registration API is running"
    });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});