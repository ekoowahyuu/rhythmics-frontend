import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

const adminService = {
    // Fetch all users
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            return response.data.data; // Assuming the response contains a `data` field with user data
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Delete user by ID
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${userId}/delete`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    },

    // Fetch all studios
    getAllStudios: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/studios`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with studio data
        } catch (error) {
            console.error('Error fetching studios:', error);
            throw error;
        }
    },

    createStudio: async (studioData, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/studios`, studioData, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token, // Ensure the token is passed here
                },
            });
            return response.data.data;
        } catch (error) {
            console.error("Error creating studio:", error.response?.data || error.message);
            throw error;
        }
    },

    // Update an existing studio
    updateStudio: async (studioId, studioData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/studios/${studioId}/update`, studioData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with updated studio data
        } catch (error) {
            console.error(`Error updating studio with ID ${studioId}:`, error);
            throw error;
        }
    },

    // Delete a studio by ID
    deleteStudio: async (studioId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/studios/${studioId}/delete`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting studio with ID ${studioId}:`, error);
            throw error;
        }
    },

    // Fetch all rooms
    getAllRooms: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/rooms`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with room data
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    // Delete a room
    deleteRoom: async (roomId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/rooms/${roomId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting room with ID ${roomId}:`, error);
            throw error;
        }
    },

    // Fetch all reviews for a room
    getAllReviews: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/reviews`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data; // Assuming the response contains a `data` field with reviews data
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    },

    // Update an existing review
    updateReview: async (reviewId, reviewData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/reviews/${reviewId}`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating review with ID ${reviewId}:`, error);
            throw error;
        }
    },

    // Delete a review
    deleteReview: async (reviewId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
                headers: {
                    'Authorization': token, // Pass token for authorization
                    'Content-Type': 'application/json', // Ensure content type is correct
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
            throw error;
        }
    },

    // Fetch all bookings
    getAllBookings: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/bookings/all`, {
                headers: {
                    'Authorization': token,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    },

    updateBooking: async (bookingId, bookingData, token) => {
        try {
            const response = await axios.patch(`${BASE_URL}/bookings/${bookingId}/update`, bookingData, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(`Error updating booking with ID ${bookingId}:`, error);
            throw error;
        }
    },

    deleteBooking: async (bookingId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/bookings/${bookingId}/delete`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting booking with ID ${bookingId}:`, error);
            throw error;
        }
    },

};

export default adminService;
