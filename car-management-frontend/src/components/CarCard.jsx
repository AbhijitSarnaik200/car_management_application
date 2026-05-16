import { FaTrash } from "react-icons/fa";

function CarCard({ car, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={`https://car-management-application-3wos.onrender.com/uploads/${car.image}`}
        alt={car.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {car.name}
        </h2>

        <p className="text-gray-600 mt-2">
          Brand: {car.brand}
        </p>

        <p className="text-gray-600">
          Fuel: {car.fuelType}
        </p>

        <p className="text-blue-500 font-bold text-xl mt-3">
          ₹ {car.price}
        </p>

        <button
          onClick={() => onDelete(car._id)}
          className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
}

export default CarCard;