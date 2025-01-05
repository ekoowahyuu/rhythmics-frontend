import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Create a review for a room
export const createReview = async (roomId, reviewData, token) => {
    try {
        const response = await axios.post(`${baseUrl}/rooms/${roomId}/reviews`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during review creation:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to create review. Please try again later.'
        );
    }
};

// Get all reviews for a room
export const getAllReviews = async (roomId, token) => {
    try {
        const response = await axios.get(`${baseUrl}/rooms/${roomId}/reviews`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to fetch reviews. Please try again later.'
        );
    }
};

// Delete a review for a room
export const deleteReview = async (roomId, reviewId, token) => {
    try {
        const response = await axios.delete(`${baseUrl}/rooms/${roomId}/reviews/${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting review:', error.response || error.message);
        throw new Error(
            error.response?.data?.message || 'Failed to delete review. Please try again later.'
        );
    }
};
