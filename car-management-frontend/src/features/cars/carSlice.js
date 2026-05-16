import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cars: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
});

export default carSlice.reducer;