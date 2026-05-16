import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  CarFront,
  Menu,
  X,
  Users,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") === "dark"
    );

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`
                fixed z-50 top-0 left-0
                h-screen w-72
                bg-gradient-to-b from-blue-700 to-indigo-900
              text-white shadow-2xl
                flex flex-col justify-between
                transition-transform duration-300
                ${sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
              }
           `}
        >
        { }
        <div className="p-8 border-b border-white/20 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CarFront size={35} />
              CarHub
            </h1>
            <p className="text-gray-300 mt-2 text-sm">
              Car Management System
            </p>
          </div>

          {/* Close Button Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={28} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${location.pathname === "/dashboard"
              ? "bg-white text-blue-700 shadow-xl"
              : "hover:bg-white/10"
              }`}
          >
            <LayoutDashboard size={22} />
            <span className="font-medium text-lg">
              Dashboard
            </span>
          </Link>

          {/* Add Car */}
          <Link
            to="/add-car"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${location.pathname === "/add-car"
              ? "bg-white text-blue-700 shadow-xl"
              : "hover:bg-white/10"
              }`}
          >
            <PlusCircle size={22} />
            <span className="font-medium text-lg">
              Add Car
            </span>
          </Link>

          {/* Admin Panel */}
          {
            user?.isAdmin && (
              <Link
                to="/admin"
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${location.pathname === "/admin"
                  ? "bg-white text-blue-700 shadow-xl"
                  : "hover:bg-white/10"
                  }`}
              >
                <Shield size={22} />
                <span className="font-medium text-lg">
                  Admin Panel
                </span>
              </Link>
            )
          }

          {/* Users */}
          {
            user?.isAdmin && (
              <Link
                to="/users"
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${location.pathname === "/users"
                  ? "bg-white text-blue-700 shadow-xl"
                  : "hover:bg-white/10"
                  }`}
              >
                <Users size={22} />
                <span className="font-medium text-lg">
                  Users
                </span>
              </Link>
            )
          }
        </div>

        {/* Logout */}
        <div className="p-5 border-t border-white/20">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 hover:scale-105 transition duration-300 text-white py-3 rounded-2xl shadow-lg"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-72">
        {/* Top Navbar */}
        <div className="fixed left-0 lg:left-72 right-0 top-0 z-30 bg-white shadow-md px-5 lg:px-8 py-5 flex justify-between items-center dark:bg-gray-900">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Menu size={30} />
          </button>
          {/* Welcome */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your dream cars easily
            </p>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {
              darkMode
                ? <Sun className="text-yellow-400" />
                : <Moon className="text-gray-700" />
            }
          </button>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-800">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500">
                User
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 lg:p-8 mt-28"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default Layout;