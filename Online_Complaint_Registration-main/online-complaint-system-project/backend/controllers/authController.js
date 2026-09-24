const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// =========================
// REGISTER USER
// =========================

const registerUser = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0   ].msg
            });
        }

        const { name, email, phone, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate User ID
        const userId = `USR-${Date.now()}`;

        // Create user
        const user = await User.create({
            userId,
            name,
            email,
            phone,
            password: hashedPassword,
            role: "USER"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Register Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};


// =========================
// LOGIN USER
// =========================

const loginUser = async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg
            });
        }

        const { email, password, role } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check selected login role
        if (user.role !== role) {
            return res.status(403).json({
                success: false,
                message: `This account cannot login as ${role}`
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                userId: user.userId,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
    registerUser,
    loginUser
};