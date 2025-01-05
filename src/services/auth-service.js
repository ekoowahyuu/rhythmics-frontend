import axios from 'axios';
import { Navigate, Outlet } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(baseUrl + '/users', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during user registration:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to register user. Please try again later.'
        );
    }
};

// User login
export const login = async (userData) => {
    try {
        const response = await axios.post(baseUrl + '/auth/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("expired_at", response.data.data.expired_at);
        return response.data;
    } catch (error) {
        console.error('Error during Login:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to login. Please try again later.'
        );
    }
};

// Forgot password
export const forgotPassword = async (email) => {
    try {
        return await axios.post(baseUrl + "/auth/forgot-password", email, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error.response || error.message);
        throw new Error(error.response?.data?.message);
    }
};

// Validate OTP
export const validateOtp = async (otp) => {
    try {
        const res = await axios.post(baseUrl + '/auth/validate-otp', otp, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem("token", res.data.data.token);
    } catch (error) {
        console.error(error.response || error.message);
        throw new Error(error.response?.data?.message);
    }
};

// Reset password
export const resetPassword = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        await axios.patch(baseUrl + '/auth/reset-password', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Reset-Token': token,
            },
        });
        localStorage.removeItem("token");
    } catch (error) {
        console.error(error.response || error.message);
        throw new Error(error.response?.data?.message);
    }
};

// Change password
export const changePassword = async (userData) => {
    const token = localStorage.getItem("token");
    try {
        const response = axios.patch(baseUrl + '/auth/reset-password', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        return response;
    } catch (error) {
        console.error(error.response || error.message);
        throw new Error(error.response?.data?.message);
    }
};
