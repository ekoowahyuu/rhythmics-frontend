// UpdateRoomPage.jsx
import React, { useEffect, useState } from "react";
import UpdateRoomForm from "./UpdateRoomForm";
import { getRoom, updateRoom } from "./api"; // Adjust the import path as needed

const UpdateRoomPage = ({ studioId, roomId, token }) => {
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const data = await getRoom(token, studioId, roomId);
                setRoom(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [token, studioId, roomId]);

    const handleUpdate = async (updatedData) => {
        try {
            const response = await updateRoom(token, studioId, roomId, updatedData);
            setRoom(response); // Update the local state with the latest data
            alert("Room updated successfully!");
        } catch (err) {
            alert(`Failed to update room: ${err.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <UpdateRoomForm
            room={room}
            studioId={studioId}
            token={token}
            onSubmit={handleUpdate}
            onCancel={() => window.history.back()}
        />
    );
};

export default UpdateRoomPage;
