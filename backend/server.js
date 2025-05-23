require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const Incomeroutes = require("./routes/Incomeroutes");
const Expenseroutes=require("./routes/ExpenseRoutes");
const Dashboardroutes=require("./routes/DashboardRoutes")
const app = express();

// Connect to MongoDB
app.use(express.json());

connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Must-have for parsing JSON request bodies

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", Incomeroutes);
app.use("/api/v1/expense", Expenseroutes);
app.use("/api/v1/dashboard", Dashboardroutes);
//serveupload folder
app.use('/uploads',express.static(path.join(__dirname,"uploads")))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
