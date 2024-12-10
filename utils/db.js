require("dotenv").config();
const mongoose = require("mongoose");

// For local MongoDD
const mongoUrl = process.env.MONGO_URI_LOCAL;

// For MongoDB Atlas
// const mongoUrl = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("Error to connecting MongoDB", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
