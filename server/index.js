const connectDB = require("./config/db");
const express = require("express");

const app = express();

require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome Dhanashri! Backend is Working 🚀",
  });
});

app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});