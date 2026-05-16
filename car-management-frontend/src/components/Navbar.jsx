import { FaCarSide } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <FaCarSide className="text-3xl text-blue-500" />
        <h1 className="text-2xl font-bold">
          CarHub
        </h1>
      </div>
      {/* Logout Button */}
      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;