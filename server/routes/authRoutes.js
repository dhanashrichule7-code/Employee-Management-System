const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  changePassword,
  updateProfile,
  updatePhoto,
  removePhoto,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


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

router.put(
  "/update-photo",
  authMiddleware,
  upload.single("photo"),
  updatePhoto
);

router.delete(
  "/remove-photo",
  authMiddleware,
  removePhoto
);
module.exports = router;