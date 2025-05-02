// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register user
const registeruser = async (req, res) => {
    if (!req.body || !req.body.fullName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const { fullName, email, password, profileImageUrl } = req.body;

    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await User.create({ fullName, email, password, profileImageUrl });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login user
const loginuser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

// Get user info
const getuserinfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};


// Exporting all functions in one object
module.exports = {
    registeruser,
    loginuser,
    getuserinfo,
};
