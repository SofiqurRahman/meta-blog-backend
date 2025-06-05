const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// middleware
app.use(express.json());
// app.use(cors());
const corsConfig = {
  origin: "",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

// routes
const blogRoutes = require("./src/routes/blog.routes");
app.use("/blogs", blogRoutes);

// mongoose configuration
async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Meta Blog App Sever is running...!");
  });
}

main()
  .then(() => console.log("Mongodb connected Successfully!"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
