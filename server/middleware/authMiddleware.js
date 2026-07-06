const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {

    console.log("========== AUTH ==========");
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer Token");
      return res.status(401).json({
        success: false,
        message: "No Token",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN =>", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mysecretkey"
    );

    console.log("Decoded =>", decoded);

    const user = await User.findById(decoded.id).select("-password");

    console.log("User =>", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (err) {

    console.log("JWT ERROR =>", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

module.exports = authMiddleware;