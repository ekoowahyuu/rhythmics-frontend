import { useState } from "react";
import profile from "../assets/profile.png";

const SelectReview = ({ rooms, onClose, username, onNext }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room.type);
    setRoomId(room.id);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      style={{
        paddingTop: "5vh",
        paddingBottom: "5vh",
      }}
    >
      <div
        className="relative bg-white rounded-3xl shadow-lg p-8 w-[90%] max-w-3xl"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Exit Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold">{username}</h2>
        </div>

        {/* Room Selection */}
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-center">
            Which room would you like to review?
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {rooms.map((room) => (
              <button
                key={room.id} // Use id as a unique key
                onClick={() => {
                  handleRoomSelection(room);
                }}
                className={`px-8 py-3 rounded-full ${
                  selectedRoom === room.type
                    ? "bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white hover:bg-[#E7FF8C]/90"
                    : "border-2"
                }`}
              >
                {room.type} {/* Display the room type */}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto w-full">
          <button
            className="bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white hover:bg-[#E7FF8C]/90 rounded-full px-10 py-4"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className={`${
              selectedRoom
                ? "bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white hover:bg-[#E7FF8C]/90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } rounded-full px-10 py-4`}
            onClick={() => {
              if (selectedRoom) {
                onNext(selectedRoom, roomId);
              }
            }}
            disabled={!selectedRoom}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectReview;
