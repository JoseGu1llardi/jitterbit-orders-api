const express = require("express");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware to parse JSON in body of requests
app.use(express.json());

// Routes
app.use("/order", orderRoutes);

// Global error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
