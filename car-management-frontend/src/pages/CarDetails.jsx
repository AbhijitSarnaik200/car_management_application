import { useEffect, useState } from "react";
import {
  Fuel,
  Calendar,
  IndianRupee,
  Star,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Layout from "../components/Layout";

import { toast } from "react-toastify";

function CarDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [review, setReview] =
    useState("");

  const [reviews, setReviews] =
    useState([]);

  // Fetch Single Car
  const fetchCar = async () => {

    try {

      const token = localStorage.getItem(
        "token"
      );

      const response = await fetch(
        `https://car-management-application-3wos.onrender.com/api/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        toast.error(data.message);

      } else {

        setCar(data);

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");

    }

  };

  useEffect(() => {

    fetchCar();

  }, []);

  // Add Review
  const addReview = () => {

    if (!review) return;

    const newReview = {

      text: review,

      user: "Current User",

    };

    setReviews([
      ...reviews,
      newReview,
    ]);

    setReview("");

  };

  if (!car) {

    return (

      <Layout>

        <div className="text-center py-20 text-2xl font-bold">

          Loading...

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Image */}
        <img
          src={`http://localhost:5000${car.image}`}
          alt={car.name}
          className="w-full h-[450px] object-cover"
        />

        {/* Details */}
        <div className="p-10">

          {/* Add Review */}
          <div className="mb-6">

            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              className="w-full p-4 rounded-2xl border dark:bg-gray-900 dark:text-white"
              rows="4"
            />

            <button
              onClick={addReview}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl transition"
            >

              Submit Review

            </button>

          </div>

          {/* Reviews List */}
          <div className="space-y-5">

            {
              reviews.map((item, index) => (

                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md"
                >

                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-8">

                    {item.text}

                  </p>

                  <p className="mt-5 font-bold text-blue-600 text-lg">

                    — {item.user}

                  </p>

                </div>

              ))
            }

          </div>
          {/* Rating Stars */}
          <div className="flex items-center gap-2 mb-6">

            <Star
              size={30}
              className="fill-yellow-400 text-yellow-400"
            />

            <Star
              size={30}
              className="fill-yellow-400 text-yellow-400"
            />

            <Star
              size={30}
              className="fill-yellow-400 text-yellow-400"
            />

            <Star
              size={30}
              className="fill-yellow-400 text-yellow-400"
            />

            <Star
              size={30}
              className="text-gray-400"
            />

            <span className="ml-3 text-lg font-bold dark:text-white">

              4.0 Rating

            </span>

          </div>
          {/* Car Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl">

              <h2 className="text-gray-500 mb-2">

                Price

              </h2>

              <p className="text-3xl font-bold text-blue-600">

                ₹{Number(car.price).toLocaleString()}

              </p>

            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl">

              <h2 className="text-gray-500 mb-2">

                Model Year

              </h2>

              <p className="text-3xl font-bold text-green-600">

                {car.modelYear}

              </p>

            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl">

              <h2 className="text-gray-500 mb-2">

                Fuel Type

              </h2>

              <p className="text-3xl font-bold text-yellow-500">

                {car.fuelType}

              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default CarDetails;