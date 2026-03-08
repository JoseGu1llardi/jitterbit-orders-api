const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middlewares/authMiddleware");

const app = express();

// Middleware to parse JSON in body of requests
app.use(express.json());

// Swagger documentation available at /api-docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Public routes
app.use("/auth", authRoutes);

// Protected routes — all /order endpoints require a valid JWT token
app.use("/order", authenticateToken, orderRoutes);

// Global error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
