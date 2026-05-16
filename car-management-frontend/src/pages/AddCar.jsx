import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

import {
  FaCar,
  FaGasPump,
  FaImage,
} from "react-icons/fa";

function AddCar() {
  const navigate = useNavigate();
  const [loading, setLoading] =
    useState(false);
  const [preview, setPreview] =
    useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    modelYear: "",
    fuelType: "",
    image: null,
  });

  // Handle Change
  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      setPreview(
        URL.createObjectURL(file)
      );
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem(
        "token"
      );
      const carData = new FormData();

      carData.append(
        "name",
        formData.name
      );

      carData.append(
        "brand",
        formData.brand
      );

      carData.append(
        "price",
        formData.price
      );

      carData.append(
        "modelYear",
        formData.modelYear
      );

      carData.append(
        "fuelType",
        formData.fuelType
      );

      carData.append(
        "image",
        formData.image
      );

      const response = await fetch(
        "https://car-management-application-3wos.onrender.com/api/cars",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: carData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success("Car Added Successfully 🚗"
        );
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white p-8 lg:p-10 rounded-3xl shadow-2xl"
      >

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-full text-white shadow-xl">
              <FaCar size={35} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Add New Car
          </h1>
          <p className="text-gray-500 mt-3">
            Fill all details carefully
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Car Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Car Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Car Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Enter Brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price & Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Model Year
              </label>
              <input
                type="number"
                name="modelYear"
                placeholder="Enter Model Year"
                value={formData.modelYear}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Fuel Type
            </label>
            <div className="relative">
              <FaGasPump className="absolute top-5 left-4 text-gray-400" />
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">
                  Select Fuel Type
                </option>

                <option value="Petrol">
                  Petrol
                </option>

                <option value="Diesel">
                  Diesel
                </option>

                <option value="CNG">
                  CNG
                </option>

                <option value="Electric">
                  Electric
                </option>

              </select>
            </div>
          </div>
          {/* Image Upload */}
          <div>
            <label className="block mb-3 font-semibold text-gray-700">
              Upload Car Image
            </label>
            <label className="border-2 border-dashed border-blue-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
              <FaImage
                size={40}
                className="text-blue-500 mb-4"
              />
              <p className="text-gray-600">
                Click to upload image
              </p>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                required
              />
            </label>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-6">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-72 object-cover rounded-3xl shadow-lg"
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-xl"
          >
            {
              loading
                ? "Adding Car..."
                : "Add Car 🚗"
            }
          </button>
        </form>
      </motion.div>
    </Layout>
  );
}

export default AddCar;