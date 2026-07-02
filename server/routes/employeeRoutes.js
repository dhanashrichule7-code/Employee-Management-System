const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createEmployee);

router.get("/", authMiddleware, getAllEmployees);

router.put("/:id", authMiddleware, updateEmployee);

router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;