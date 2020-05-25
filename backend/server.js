const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dogfightRoutes = require("./routes/dogfight");
const golferRoutes = require("./routes/golfer");

const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();

// Connect to MongoDB

const uri = "mongodb://127.0.0.1:27017/dogfight2";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
});

app.use(cors());
app.use(express.json());

// Routes

app.use("/dogfights", dogfightRoutes);
app.use("/golfers", golferRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
