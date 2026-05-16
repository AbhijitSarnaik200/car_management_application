import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaLock,
  FaCar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(data.message);

      } else {

        // Save Token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save User
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error);

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 px-5">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Login Card */}
      <motion.div

        initial={{ opacity: 0, y: 50 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.6 }}

        className="relative z-10 bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-md"

      >

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <motion.div

            animate={{
              rotate: [0, 5, -5, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 3,
            }}

            className="bg-white text-blue-600 p-5 rounded-full shadow-xl"

          >

            <FaCar size={35} />

          </motion.div>

        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-gray-200 mt-3">
            Login to manage your dream cars
          </p>

        </div>

        {/* Error */}
        {error && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="bg-red-500/20 border border-red-400 text-white text-center p-3 rounded-xl mb-5"

          >

            {error}

          </motion.div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div className="relative">

            <FaEnvelope className="absolute top-5 left-4 text-gray-300" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/30 text-white placeholder-gray-300 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

          </div>

          {/* Password */}
          <div className="relative">

            <FaLock className="absolute top-5 left-4 text-gray-300" />

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
              className="w-full bg-white/10 border border-white/30 text-white placeholder-gray-300 p-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute top-5 right-4 text-gray-300"
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm text-white">

            <label className="flex items-center gap-2 cursor-pointer">

              <input type="checkbox" />

              Remember Me

            </label>

            <button
              type="button"
              className="hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-700 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition duration-300"
          >

            {
              loading
                ? "Logging In..."
                : "Login"
            }

          </button>

        </form>

        {/* Register */}
        <p className="text-center text-gray-200 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-bold text-white hover:underline"
          >
            Register
          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Login;