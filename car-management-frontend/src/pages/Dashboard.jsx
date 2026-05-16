import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

import { toast } from "react-toastify";

import {
  Pencil,
  Trash2,
  Search,
  Heart,
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const [cars, setCars] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [favorites, setFavorites] =
    useState([]);

  // Fetch Cars
  const fetchCars = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
       "https://car-management-application-3wos.onrender.com/api/cars",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setCars(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch cars"
      );

    }

  };

  useEffect(() => {

    fetchCars();

  }, []);

  // Delete Car
  const deleteHandler = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/cars/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        toast.error(data.message);

      } else {

        toast.success(
          "Car deleted successfully"
        );

        fetchCars();

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

  };

  // Toggle Favorite
  const toggleFavorite = (id) => {

    if (
      favorites.includes(id)
    ) {

      setFavorites(

        favorites.filter(
          (favId) =>
            favId !== id
        )

      );

    } else {

      setFavorites([
        ...favorites,
        id,
      ]);

    }

  };

  return (

    <Layout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">

              Car Dashboard 🚗

            </h1>

            <p className="text-gray-500 mt-2">

              Manage all your cars easily

            </p>

          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">

            <Search
              size={20}
              className="absolute top-4 left-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, year, brand..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white p-4 pl-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            cars
              .filter((car) => {

                const searchText =
                  search.toLowerCase();

                return (

                  car.name
                    ?.toLowerCase()
                    .includes(searchText)

                  ||

                  car.brand
                    ?.toLowerCase()
                    .includes(searchText)

                  ||

                  car.modelYear
                    ?.toString()
                    .includes(searchText)

                  ||

                  car.fuelType
                    ?.toLowerCase()
                    .includes(searchText)

                );

              })
              .map((car) => (

                <div
                  key={car._id}
                  onClick={() =>
                    navigate(
                      `/car/${car._id}`
                    )
                  }
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                >

                  {/* Image */}
                  <img
                    src={`http://localhost:5000${car.image}`}
                    alt={car.name}
                    className="w-full h-56 object-cover"
                  />

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-end mb-3">

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          toggleFavorite(car._id);

                        }}
                      >

                        <Heart
                          size={28}
                          className={`transition ${favorites.includes(car._id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                            }`}
                        />

                      </button>

                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between mb-4">

                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">

                        {car.name}

                      </h2>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                        {car.brand}

                      </span>

                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-gray-700 dark:text-gray-200 text-lg">

                      <p className="flex justify-between">

                        <span className="font-bold">
                          Price:
                        </span>

                        <span className="text-green-600 font-bold">

                          ₹{car.price}

                        </span>

                      </p>

                      <p className="flex justify-between">

                        <span className="font-bold">
                          Year:
                        </span>

                        <span>
                          {car.modelYear}
                        </span>

                      </p>

                      <p className="flex justify-between">

                        <span className="font-bold">
                          Fuel:
                        </span>

                        <span>
                          {car.fuelType}
                        </span>

                      </p>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">

                      {/* Edit */}
                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          navigate(
                            `/edit-car/${car._id}`
                          );

                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl transition"
                      >

                        <Pencil size={18} />

                        Edit

                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          deleteHandler(car._id);

                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition"
                      >

                        <Trash2 size={18} />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))
          }

        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;
