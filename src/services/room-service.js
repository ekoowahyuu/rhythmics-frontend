import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const addRoom = async (token, studioId, roomData, files) => {
    try {
        const formData = new FormData();
        formData.append("room", new Blob([JSON.stringify(roomData)], { type: "application/json" }));
        files.forEach((file) => formData.append("files", file));

        const response = await axios.post(`${baseUrl}/studios/${studioId}/rooms`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding room:", error);
        throw new Error(error.response?.data?.errors || "Failed to add room.");
    }
};

export const updateRoom = async (token, studioId, roomId, roomData) => {
    try {
        const formData = new FormData();
        formData.append(
            "room",
            new Blob([JSON.stringify(roomData)], { type: "application/json" })
        );
        roomData.newImages.forEach((file) => formData.append("files", file));

        const response = await axios.patch(
            `${baseUrl}/studios/${studioId}/rooms/${roomId}`,
            formData,
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating room:", error);
        throw new Error(error.response?.data?.errors || "Failed to update room.");
    }
};

export const deleteRoom = async (token, studioId, roomId) => {
    try {
        const response = await axios.delete(`${baseUrl}/studios/${studioId}/rooms/${roomId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting room:", error);
        throw new Error(error.response?.data?.errors || "Failed to delete room.");
    }
};

export const getRoom = async (token, studioId, roomId) => {
    try {
        const response = await axios.get(`${baseUrl}/studios/${studioId}/rooms/${roomId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching room:", error);
        throw new Error(error.response?.data?.errors || "Failed to fetch room.");
    }
};
