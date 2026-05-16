const Car = require("../models/Car");

// Add Car
const addCar = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const car = await Car.create({
      user: req.user.id,
      name: req.body.name,
      brand: req.body.brand,
      price: Number(req.body.price),
      modelYear: Number(req.body.modelYear),
      fuelType: req.body.fuelType,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });
    res.status(201).json(car);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Car
const getSingleCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Car
const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    car.name = req.body.name;
    car.brand = req.body.brand;
    car.price = req.body.price;
    car.modelYear = req.body.modelYear;
    car.fuelType = req.body.fuelType;
    const updatedCar = await car.save();
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Car
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    await car.deleteOne();
    res.status(200).json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Favorite
const toggleFavorite = async (req, res) => {
  try {
    const car = await Car.findById(
      req.params.id
    );
    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    const userId = req.user.id;
    const alreadyFavorite =
      car.favorites.includes(userId);
    if (alreadyFavorite) {
      car.favorites =
        car.favorites.filter(
          (id) => id !== userId
        );
    } else {
      car.favorites.push(userId);
    }
    await car.save();
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCar,
  getCars,
  getSingleCar,
  updateCar,
  deleteCar,
  toggleFavorite,
};