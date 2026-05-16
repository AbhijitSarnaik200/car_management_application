import { Link } from "react-router-dom";
import { FaHome, FaPlusCircle } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-950 text-white p-5">
      <h2 className="text-2xl font-bold mb-10 text-blue-500">
        Dashboard
      </h2>
      <div className="flex flex-col gap-5">
        <Link
          to="/"
          className="flex items-center gap-3 hover:text-blue-400 transition"
        >
          <FaHome />
          Home
        </Link>

        <Link
          to="/add-car"
          className="flex items-center gap-3 hover:text-blue-400 transition"
        >
          <FaPlusCircle />
          Add Car
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;