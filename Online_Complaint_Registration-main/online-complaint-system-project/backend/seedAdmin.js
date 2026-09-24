const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log(
                "Please add ADMIN_EMAIL and ADMIN_PASSWORD to your .env file"
            );
            process.exit(1);
        }

        const existingAdmin = await User.findOne({
            email: adminEmail
        });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            adminPassword,
            10
        );

        const admin = await User.create({
            userId: `ADM-${Date.now()}`,
            name: "System Admin",
            email: adminEmail,
            phone: "0000000000",
            password: hashedPassword,
            role: "ADMIN"
        });

        console.log("Admin created successfully!");
        console.log("Admin Email:", admin.email);
        console.log("Admin Role:", admin.role);

        await mongoose.connection.close();

        process.exit(0);
    } catch (error) {
        console.error("Admin creation failed:", error.message);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedAdmin();