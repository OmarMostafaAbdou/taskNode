const mongoose = require("mongoose");
const port = 4080;
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoute");
const blogsRoute = require("./routes/blogRoutes");
const { log } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/Task")
  .then(() => {
    console.log("connection to Mongo db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/blogs", blogsRoute);
app.listen(port, () => {
  console.log(`conniction success`);
});
