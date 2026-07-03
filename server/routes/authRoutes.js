const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  changePassword,
  updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.put(
  "/update-profile",
  authMiddleware,
  updateProfile
);

module.exports = router;