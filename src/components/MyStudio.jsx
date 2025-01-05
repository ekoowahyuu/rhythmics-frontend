import { useState, useEffect } from "react";
import SideBar from "./SideBar.jsx";
import AddStudioForm from "./AddStudioForm";
import AddRoomForm from "./AddRoomForm";
import StudioService from "../services/studio-service.js";
import UpdateRoomForm from "./UpdateRoomForm.jsx";
import { addRoom, deleteRoom, updateRoom } from "../services/room-service.js";

const ProgressBar = ({ value, color }) => {
  const progressBarStyle = {
    width: `${value}%`,
    height: "10px",
    backgroundColor: color,
    borderRadius: "5px",
  };

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-2.5">
      <div style={progressBarStyle}></div>
    </div>
  );
};

const ITEMS_PER_PAGE = 2;

const MyStudio = ({ onLogout, user }) => {
  const [studioData, setStudioData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [currentStudioId, setCurrentStudioId] = useState(null);
  const [isUpdateRoomModalOpen, setIsUpdateRoomModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await StudioService.getStudiosFromAllOwner(token);
        setStudioData(response.data);
      } catch (err) {
        setError(err.message || "Failed to load studios.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, [user]);

  const totalPages = Math.ceil(studioData.length / ITEMS_PER_PAGE);

  const paginatedData = studioData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenUpdateRoomModal = (studio, room) => {
    setCurrentRoom(room);
    setCurrentStudioId(studio.id);
    setIsUpdateRoomModalOpen(true);
  };

  const handleCloseUpdateRoomModal = () => {
    setIsUpdateRoomModalOpen(false);
    setCurrentRoom(null);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenRoomModal = (studioId) => {
    setCurrentStudioId(studioId);
    setIsRoomModalOpen(true);
  };

  const handleCloseRoomModal = () => {
    setIsRoomModalOpen(false);
    setCurrentStudioId(null);
  };

  const handleDeleteRoom = async (studioId, roomId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteRoom(token, studioId, roomId);
      alert("Room deleted successfully.");
      await fetchStudios();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert(error.message || "Failed to delete room.");
    }
  };

  const fetchStudios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await StudioService.getStudiosFromAllOwner(token);
      setStudioData(response.data);
    } catch (err) {
      setError(err.message || "Failed to load studios.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudio = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await StudioService.addStudio(token, formData);
      alert("Studio added successfully.");
      handleCloseModal();
      await fetchStudios();
    } catch (error) {
      console.error("Error adding studio:", error);
      alert(error.message || "Failed to add studio.");
    }
  };

  const handleAddRoom = async (formData) => {
    const token = localStorage.getItem("token");
    const result = await addRoom(token, currentStudioId, formData);
    console.log(JSON.stringify(result));
    handleCloseRoomModal();
  };

  const handleDeleteStudio = async (studioId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this studio?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await StudioService.deleteStudio(token, studioId);
      setStudioData((prevData) =>
        prevData.filter((studio) => studio.id !== studioId)
      );
      alert("Studio deleted successfully.");
    } catch (err) {
      console.error("Error deleting studio:", err);
      alert(err.message || "Failed to delete the studio.");
    }
  };

  const handleAddRoomSuccess = async () => {
    handleCloseRoomModal();
    await fetchStudios();
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (studioData.length === 0) {
    return (
      <div className="flex min-h-screen bg-[#F5F5F5]">
        <div className="flex-shrink-0 w-64">
          <SideBar onLogout={onLogout} />
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              No Studios Found
            </h1>
            <p className="text-gray-500 mb-6">
              You don’t have any studios yet. Start by adding one!
            </p>
            <button
              type="button"
              onClick={handleOpenModal}
              className="p-3 rounded-lg bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold hover:bg-[#F2FA5A] transition"
            >
              Add Studio
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
              <AddStudioForm
                onSubmit={handleAddStudio}
                onCancel={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-start min-h-screen bg-[#F5F5F5]">
      <SideBar onLogout={onLogout} />

      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Studio</h1>
          <button
            onClick={handleOpenModal}
            type="button"
            className="p-3 rounded-lg bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold hover:bg-[#F2FA5A] transition"
          >
            Add Studio
          </button>
        </div>

        {paginatedData.length === 0 ? (
          <div className="flex justify-center items-center text-gray-500">
            <p>No studios available on this page.</p>
          </div>
        ) : (
          paginatedData.map((studio) => (
            <div key={studio.id} className="bg-white rounded-lg shadow-xl mb-6">
              <div className="relative w-full h-96 rounded-lg overflow-hidden opacity-90">
                <img
                  src={
                    studio.rooms.length > 0 &&
                    studio.rooms[0].gallery.length > 0
                      ? `http://localhost:8080${studio.rooms[0].gallery[0].photo_url}`
                      : "https://ichef.bbci.co.uk/images/ic/1200x675/p0bp18nq.jpg"
                  }
                  alt={studio.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center p-4">
                  <h2 className="text-white text-4xl font-bold">
                    {studio.name}
                  </h2>
                </div>
              </div>

              <div className="p-8 relative">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{studio.name}</h3>
                    <p className="text-gray-500">
                      {studio.city_or_regency}, {studio.province}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteStudio(studio.id)}
                    className="p-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-6 space-x-8">
                  {(() => {
                    const allReviews = studio.rooms.flatMap(
                      (room) => room.reviews || []
                    );
                    const totalReviews = allReviews.length;
                    const averageRating =
                      totalReviews > 0
                        ? allReviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) / totalReviews
                        : 0;

                    return (
                      <>
                        <div className="flex flex-col items-center space-y-2 w-1/3">
                          <span className="text-4xl font-bold text-black">
                            {averageRating.toFixed(1)}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`text-xl ${
                                  index < Math.floor(averageRating)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-500 text-sm">
                            based on {totalReviews} reviews
                          </span>
                        </div>

                        <div className="flex flex-col w-2/3 space-y-4">
                          {studio.rooms && studio.rooms.length > 0 ? (
                            studio.rooms.map((room) => {
                              const roomReviews = room.reviews || [];
                              const roomTotalReviews = roomReviews.length;
                              const roomAverageRating =
                                roomTotalReviews > 0
                                  ? roomReviews.reduce(
                                      (sum, review) => sum + review.rating,
                                      0
                                    ) / roomTotalReviews
                                  : 0;

                              const getProgressBarColor = (rating) => {
                                if (rating >= 4) return "#4caf50";
                                if (rating >= 3) return "#FFC107";
                                if (rating >= 2) return "#FF9800";
                                return "#F44336";
                              };

                              return (
                                <div
                                  key={room.id}
                                  className="flex items-center space-x-4"
                                >
                                  <span className="text-gray-700 text-sm w-24">
                                    {room.type}
                                  </span>
                                  <div className="flex-1">
                                    <ProgressBar
                                      value={roomAverageRating * 20}
                                      color={getProgressBarColor(
                                        roomAverageRating
                                      )}
                                    />
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-gray-500 text-sm text-center">
                              No rooms added yet.
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="flex justify-center w-full mt-6 p-3 rounded-lg bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold">
                  Available Rooms
                </div>

                <div className="my-16 grid grid-cols-2 gap-4">
                  {studio.rooms && studio.rooms.length > 0 ? (
                    studio.rooms.map((room) => (
                      <div
                        key={room.id}
                        className="border rounded-lg shadow p-4 flex flex-col items-center relative cursor-pointer"
                        onClick={() => handleOpenUpdateRoomModal(studio, room)}
                      >
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRoom(studio.id, room.id);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none shadow-md transition"
                        >
                          ✕
                        </button>

                        <img
                          src={`http://localhost:8080${room.gallery[0]?.photo_url}`}
                          alt={room.type}
                          className="w-full h-60 object-cover rounded mb-4"
                        />
                        <h3 className="font-bold text-lg mb-2">{room.type}</h3>
                        <p className="text-gray-500">
                          Rp {room.price.toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500">
                      No rooms available.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleOpenRoomModal(studio.id)}
                  className="absolute bottom-4 right-4 p-3 rounded-lg bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold shadow-lg hover:bg-[#F2FA5A] transition"
                >
                  Add Room
                </button>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Studio Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
            <AddStudioForm
              onSubmit={handleAddStudio}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
            <AddRoomForm
              onSubmit={handleAddRoom}
              onCancel={handleCloseRoomModal}
              studioId={currentStudioId}
              onSuccess={handleAddRoomSuccess}
            />
          </div>
        </div>
      )}

      {/* Update Room Modal */}
      {isUpdateRoomModalOpen && currentRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
            <UpdateRoomForm
              room={currentRoom}
              studio={currentStudioId}
              token={localStorage.getItem("token")}
              onSubmit={async (formData) => {
                if (!currentStudioId) {
                  alert("Studio ID is missing. Cannot update room.");
                  return;
                }
                try {
                  const token = localStorage.getItem("token");
                  await updateRoom(
                    token,
                    currentStudioId,
                    currentRoom.id,
                    formData
                  );
                  alert("Room updated successfully.");
                  await fetchStudios();
                  handleCloseUpdateRoomModal();
                } catch (error) {
                  console.error("Error updating room:", error);
                  alert(error.message || "Failed to update room.");
                }
              }}
              onCancel={handleCloseUpdateRoomModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudio;
