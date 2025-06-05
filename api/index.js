const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");

// middleware
app.use(express.json());
app.use(cors());

// routes
const blogRoutes = require("../src/routes/blog.routes");
app.use("/blogs", blogRoutes);

// mongoose configuration
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Meta Blog App Server is running on Vercel!");
});

module.exports = app;
module.exports.handler = serverless(app);
