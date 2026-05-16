import axios from 'axios';

const API_URL = "http://localhost:5000/api/users/";

// Register User
const register = async (userData) => {
    const response = await axios.post(
        API_URL + "register",
        userData
    );
    if (response.data.token) {
        localStorage.setItem(
            "token",
            response.data.token
        );
    }
    return response.data;
};


// Login User
const login = async (userData) => {
    const response = await axios.post(
        API_URL + "login",
        userData
    );
    if (response.data.token) {
        localStorage.setItem(
            "token",
            response.data.token
        );
    }
    return response.data;
};


// Logout
const logout = () => {
    localStorage.removeItem("token");
};


const authService = {
    register,
    login,
    logout,
};

export default authService;