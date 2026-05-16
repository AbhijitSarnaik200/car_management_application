import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function EditCar() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    modelYear: "",
    fuelType: "",
  });

  // Fetch Single Car
  const fetchCar = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://car-management-application-3wos.onrender.com/api/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setFormData(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Update Car
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://car-management-application-3wos.onrender.com/api/cars/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {

      toast.error(data.message);

    } else {

      toast.success("Car Updated Successfully");

      navigate("/dashboard");

    }

  } catch (error) {

    console.log(error);

    toast.error("Something went wrong");

  }

};

  return (
    <Layout>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Edit Car
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Car Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="modelYear"
            placeholder="Model Year"
            value={formData.modelYear}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Update Car
          </button>

        </form>

      </div>

    </Layout>
  );
}

export default EditCar;