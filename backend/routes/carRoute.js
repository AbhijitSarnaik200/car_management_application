const express = require("express");

const router = express.Router();

const {
  addCar,
  getCars,
  getSingleCar,
  updateCar,
  deleteCar,
  toggleFavorite,
} = require("../controllers/carController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Add Car
router.post(
  "/",
  protect,
  upload.single("image"),
  addCar
);

// Get All Cars
router.get("/", protect, getCars);

// Get Single Car
router.get("/:id", protect, getSingleCar);

// Update Car
router.put("/:id", protect, updateCar);

// Delete Car
router.delete("/:id", protect, deleteCar);

router.put(
  "/favorite/:id",
  protect,
  toggleFavorite
);

module.exports = router;