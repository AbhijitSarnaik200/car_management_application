const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  getAdminStats,
  deleteUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Users (Admin Only)
router.get(
  "/users",
  protect,
  admin,
  getUsers,
);

router.get(
  "/admin/stats",
  protect,
  admin,
  getAdminStats
);

router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);

module.exports = router;