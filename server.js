const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");

// Load environment variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// Connecting to DB
connectDB();

// Middleware for parsing JSON
app.use(bodyParser.json());

// Importing routes
const schoolRoutes = require("./routes/schoolRoute");

// Registering routes
app.use('/api/v1/schools', schoolRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on PORT no: ${PORT}`);
});
