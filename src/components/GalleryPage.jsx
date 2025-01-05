import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GalleryPage() {
    const { state } = useLocation();
    const studio = state?.studio;  // Renamed from venue to studio

    // All images from all rooms
    const images = studio.rooms.flatMap((room) =>  // Changed from fields to rooms
        room.gallery.map((photo) => ({
            url: `http://localhost:8080${photo.photo_url}`,
            roomType: room.type,  // Changed fieldType to roomType
        }))
    );

    // State for filtering, pagination, and modal
    const [filter, setFilter] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter images by room type
    const roomTypes = [...new Set(studio.rooms.map((room) => room.type))];  // Changed from fields to rooms
    const filteredImages = filter
        ? images.filter((img) => img.roomType === filter)  // Changed fieldType to roomType
        : images;

    // Pagination
    const imagesPerPage = 9;
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
    const paginatedImages = filteredImages.slice(
        (currentPage - 1) * imagesPerPage,
        currentPage * imagesPerPage
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                {studio.name} - Gallery
            </h1>

            {/* Filter Dropdown */}
            <div className="flex justify-center mb-6">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="">All Rooms</option>  // Changed from All Fields
                    {roomTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid of Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paginatedImages.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(img.url)}
                    >
                        <img
                            src={img.url}
                            alt={`Gallery ${index}`}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                            <p className="text-white text-lg font-medium">{img.roomType}</p>  // Changed fieldType to roomType
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Previous
                </button>
                <p className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Next
                </button>
            </div>

            {/* Modal for Image Preview */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-auto max-w-3xl"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
