import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import carReducer from '../features/cars/carSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        car: carReducer,
    },
});