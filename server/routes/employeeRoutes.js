const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

router.post("/create", createEmployee);

router.get("/", getAllEmployees);

router.delete("/delete/:id", deleteEmployee);

router.put("/update/:id", updateEmployee);

module.exports = router;