import React, { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudioService from "../services/studio-service"; // Import StudioService

export default function StudiosList() {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [studios, setStudios] = useState([]);
  const [filteredStudios, setFilteredStudios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudios = filteredStudios.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredStudios.length / itemsPerPage);

  const navigate = useNavigate();

  const handleButtonClick = (location) => {
    setActiveButton(location);
    const updatedStudios = studios.filter(
      (studio) =>
        studio.city_or_regency.toLowerCase() === location.toLowerCase()
    );
    setFilteredStudios(updatedStudios);
    setCurrentPage(1);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const studiosData = await StudioService.getAllStudios();
        setStudios(studiosData);
        setFilteredStudios(studiosData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching studios:", error);
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, []);

  useEffect(() => {
    let updatedStudios = [...studios];
    if (selectedRoom) {
      updatedStudios = updatedStudios.filter((studio) =>
        studio.rooms.some((room) => room.type === selectedRoom)
      );
    }
    if (selectedRating) {
      updatedStudios.sort((a, b) => {
        if (selectedRating === "Lowest to Highest") {
          return a.rating - b.rating;
        } else if (selectedRating === "Highest to Lowest") {
          return b.rating - a.rating;
        }
        return 0;
      });
    }
    setFilteredStudios(updatedStudios);
  }, [selectedRoom, selectedRating, studios]);

  const handleResetFilters = () => {
    setSelectedRoom("");
    setSelectedRating("");
    setFilteredStudios(studios);
    setCurrentPage(1);
    setActiveButton(null); // Reset active button
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#B17457] to-[#D8A583] mt-24 mx-20 p-10 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center md:py-16 relative">
        <div className="w-full md:w-1/2 text-left text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Find Your Perfect Studio
          </h1>
          <div className="flex gap-4 flex-wrap">
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Bandung"
                  ? "bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Bandung")}
            >
              Bandung
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Jakarta"
                  ? "bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Jakarta")}
            >
              Jakarta
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeButton === "Bali"
                  ? "bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white font-semibold"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Bali")}
            >
              Bali
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 flex-wrap">
          {/* Room Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("room")}
              className="bg-primary2 px-4 py-2 rounded-md flex items-center gap-2"
            >
              {selectedRoom || "Room Type"}
              <ChevronDown size={20} />
            </button>
            {openDropdown === "room" && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50">
                {["Regular", "VIP", "VVIP"].map((room) => (
                  <div
                    key={room}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedRoom(room);
                      setOpenDropdown(null);
                    }}
                  >
                    {room}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rating")}
              className="bg-primary2 px-4 py-2 rounded-md flex items-center gap-2"
            >
              {selectedRating || "Rating"}
              <ChevronDown size={20} />
            </button>
            {openDropdown === "rating" && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 z-50">
                {["Lowest to Highest", "Highest to Lowest"].map((rating) => (
                  <div
                    key={rating}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedRating(rating);
                      setOpenDropdown(null);
                    }}
                  >
                    {rating}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-400"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStudios.length > 0 ? (
          currentStudios.map((studio) => (
            <div
              key={studio.id}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() =>
                navigate(`/studioDetail/${studio.name}`, { state: { studio } })
              }
            >
              <div className="relative h-48">
                <img
                  src={
                    studio.rooms.length > 0 &&
                    studio.rooms[0].gallery.length > 0
                      ? `http://localhost:8080${studio.rooms[0].gallery[0].photo_url}`
                      : "https://example.com/default-image.jpg"
                  }
                  alt="Studio"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">{studio.name || "Music Studio"}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {studio.street} - {studio.district}, {studio.city_or_regency},{" "}
                  {studio.province}
                </p>
                <div className="flex gap-2">
                  {studio.rooms.map((room, j) => (
                    <span
                      key={j}
                      className="bg-gray-200 px-3 py-1 rounded-md text-sm"
                    >
                      {room.type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No studios available.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-8">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === pageIndex + 1
                  ? "bg-[#6B7FFF] text-white"
                  : "bg-gray-300"
              } flex items-center justify-center`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
