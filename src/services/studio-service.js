import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Adjust the base URL to match your backend setup

const StudioService = {
    // Fetch all studios
    getAllStudios: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/studios`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching studios:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to fetch studio data."
            );
        }
    },

    // Fetch all studios owned by the user
    getStudiosFromAllOwner: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/studios/owner`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching studios owned by user:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to fetch studios owned by user."
            );
        }
    },

    // Add a new studio
    addStudio: async (token, studioData) => {
        try {
            const response = await axios.post(`${BASE_URL}/studios`, studioData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding studio:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to add studio."
            );
        }
    },

    updateRating: async (token, rating, studioId) => {
        try {
            const response = await axios.patch(`${BASE_URL}/studios/${studioId}/rating`, rating, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating rating:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to update rating."
            );
        }
    },

    // Delete a specific review
    deleteReview: async (roomId, reviewId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${roomId}/reviews/${reviewId}`);
            return response.data.data; // Assuming response structure: { data: 'Review Deleted Successfully' }
        } catch (error) {
            console.error(`Error deleting review with ID ${reviewId}:`, error);
            throw new Error(
                error.response?.data?.errors || `Failed to delete review with ID ${reviewId}.`
            );
        }
    },

    deleteStudio: async (token, studioId) => {
        const config = {
            headers: { Authorization: token },
        };
        try {
            const response = await axios.delete(`${BASE_URL}/studios/${studioId}`, config);
            return response.data;
        } catch (error) {
            console.error("Error deleting studio:", error);
            throw new Error(
                error.response?.data?.errors || "Failed to delete studio."
            );
        }
    },
};

export default StudioService;
