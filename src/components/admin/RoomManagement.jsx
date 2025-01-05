import React, { useEffect, useState } from "react";
import adminService from "../../services/admin-service";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomList = await adminService.getAllRooms(token);
        setRooms(roomList);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [token]);

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmDelete) {
      try {
        await adminService.deleteRoom(roomId, token);
        setRooms(rooms.filter((room) => room.id !== roomId)); // Update state after deletion
        alert("Room deleted successfully");
      } catch (error) {
        console.error("Failed to delete room:", error);
        alert("Failed to delete room");
      }
    }
  };

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: "#000" }}>
        Room Management
      </h2>

      {/* Table for displaying rooms */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Studio</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <tr key={room.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {room.id}
                </td>
                <td className="border border-gray-300 p-2">{room.type}</td>
                <td className="border border-gray-300 p-2">{room.studio_id}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 p-2 text-center"
              >
                No rooms found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;
