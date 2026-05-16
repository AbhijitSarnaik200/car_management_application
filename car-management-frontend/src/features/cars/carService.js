import axios from "axios";

const API_URL = "http://localhost:5000/api/cars/";


// Get Cars
const getCars = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL,
        config
    );

    return response.data;
};


// Create Car
const createCar = async (carData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const response = await axios.post(
        API_URL,
        carData,
        config
    );

    return response.data;
};


// Delete Car
const deleteCar = async (id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(
        API_URL + id,
        config
    );

    return response.data;
};


const carService = {
    getCars,
    createCar,
    deleteCar,
};

export default carService;