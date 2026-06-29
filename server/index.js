const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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