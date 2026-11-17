const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/budget", budgetRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Learning Budget Planner API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

