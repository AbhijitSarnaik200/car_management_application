import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      confirmPassword: "",

      isAdmin: false,

    });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // Handle Change
  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  // Password Strength
  const getPasswordStrength = () => {

    if (formData.password.length < 6)
      return "Weak";

    if (formData.password.length < 10)
      return "Medium";

    return "Strong";

  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");

      setSuccess("");

      // Confirm Password Check
      if (
        formData.password !==
        formData.confirmPassword
      ) {

        return setError(
          "Passwords do not match"
        );

      }

      const response = await fetch(
        "https://car-management-application-3wos.onrender.com/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            isAdmin: formData.isAdmin,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(data.message);

      } else {

        setSuccess(
          "Registration Successful 🚀"
        );

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        setTimeout(() => {

          navigate("/dashboard");

        }, 1500);

      }

    } catch (error) {

      console.log(error);

      setError(
        "Something went wrong"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 p-5">

      <div className="w-full max-w-lg bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="bg-white text-purple-600 p-5 rounded-full shadow-xl">

            <FaCar size={35} />

          </div>

        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold text-white">

            Create Account 🚀

          </h1>

          <p className="text-gray-200 mt-3 text-lg">

            Register to manage your cars

          </p>

        </div>

        {/* Error */}
        {error && (

          <div className="bg-red-500/20 border border-red-400 text-white p-3 rounded-xl mb-5 text-center">

            {error}

          </div>

        )}

        {/* Success */}
        {success && (

          <div className="bg-green-500/20 border border-green-400 text-white p-3 rounded-xl mb-5 text-center">

            {success}

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div className="relative">

            <FaUser className="absolute top-5 left-4 text-gray-200" />

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

          </div>

          {/* Email */}
          <div className="relative">

            <FaEnvelope className="absolute top-5 left-4 text-gray-200" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-200 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

          </div>

          {/* Password */}
          <div className="relative">

            <FaLock className="absolute top-5 left-4 text-gray-200" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-200 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute top-5 right-4 text-gray-200"
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* Password Strength */}
          <p className="text-white text-sm">

            Password Strength:{" "}

            <span className="font-bold">

              {getPasswordStrength()}

            </span>

          </p>

          {/* Confirm Password */}
          <div className="relative">

            <FaLock className="absolute top-5 left-4 text-gray-200" />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-200 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute top-5 right-4 text-gray-200"
            >

              {
                showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* Admin Checkbox */}
          <div className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="text-lg">

              Register as Admin 👑

            </label>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-purple-700 py-4 rounded-2xl text-lg font-bold hover:scale-105 hover:shadow-2xl transition duration-300"
          >

            Register

          </button>

        </form>

        {/* Login */}
        <p className="text-center text-gray-200 mt-8">

          Already have an account?{" "}

          <Link
            to="/"
            className="font-bold text-white hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;