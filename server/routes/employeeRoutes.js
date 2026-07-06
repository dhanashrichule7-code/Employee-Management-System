const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getDashboardStats,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createEmployee
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllEmployees
);

router.get(
  "/dashboard-stats",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEmployee
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEmployee
);

module.exports = router;