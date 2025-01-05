import React, { useEffect, useState } from "react";
import adminService from "../../services/admin-service";

const StudioManagement = () => {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    city_or_regency: "",
    district: "",
    phone_number: "",
    postal_code: "",
    street: "",
    province: "",
    latitude: "",
    longitude: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const studioList = await adminService.getAllStudios(token);
        setStudios(studioList);
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, [token]);

  const handleDelete = async (studioId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this studio?"
    );
    if (confirmDelete) {
      try {
        await adminService.deleteStudio(studioId, token);
        setStudios(studios.filter((studio) => studio.id !== studioId));
        alert("Studio deleted successfully");
      } catch (error) {
        console.error("Failed to delete studio:", error);
        alert("Failed to delete studio");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formState.id) {
        // Update studio
        const updatedStudio = await adminService.updateStudio(
          formState.id,
          formState,
          token
        );
        setStudios(
          studios.map((studio) =>
            studio.id === formState.id ? updatedStudio : studio
          )
        );
        alert("Studio updated successfully");
      } else {
        // Create studio
        const newStudio = await adminService.createStudio(formState, token);
        setStudios([...studios, newStudio]);
        alert("Studio created successfully");
      }
      resetForm();
    } catch (error) {
      console.error(
        "Failed to submit form:",
        error.response?.data || error.message
      );
      alert("Failed to submit form");
    }
  };

  const handleEdit = (studio) => {
    setFormState({
      id: studio.id,
      name: studio.name,
      city_or_regency: studio.city_or_regency,
      district: studio.district,
      phone_number: studio.phone_number,
      postal_code: studio.postal_code,
      street: studio.street,
      province: studio.province,
      latitude: studio.latitude,
      longitude: studio.longitude,
    });
  };

  const resetForm = () => {
    setFormState({
      name: "",
      city_or_regency: "",
      district: "",
      phone_number: "",
      postal_code: "",
      street: "",
      province: "",
      latitude: "",
      longitude: "",
    });
  };

  if (loading) {
    return <div>Loading studios...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-black">Studio Management</h2>

      {/* Form for creating/updating studio */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="City or Regency"
            value={formState.city_or_regency}
            onChange={(e) =>
              setFormState({ ...formState, city_or_regency: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="District"
            value={formState.district}
            onChange={(e) =>
              setFormState({ ...formState, district: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formState.phone_number}
            onChange={(e) =>
              setFormState({ ...formState, phone_number: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={formState.postal_code}
            onChange={(e) =>
              setFormState({ ...formState, postal_code: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Street"
            value={formState.street}
            onChange={(e) =>
              setFormState({ ...formState, street: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Province"
            value={formState.province}
            onChange={(e) =>
              setFormState({ ...formState, province: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Latitude"
            value={formState.latitude}
            onChange={(e) =>
              setFormState({ ...formState, latitude: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Longitude"
            value={formState.longitude}
            onChange={(e) =>
              setFormState({ ...formState, longitude: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-[#6B7FFF] text-white px-4 py-2 rounded"
          >
            {formState.id ? "Update Studio" : "Create Studio"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Table for displaying studios */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studios.length > 0 ? (
            studios.map((studio) => (
              <tr key={studio.id}>
                <td className="border border-gray-300 p-2 text-center">
                  {studio.id}
                </td>
                <td className="border border-gray-300 p-2">{studio.name}</td>
                <td className="border border-gray-300 p-2">
                  {studio.phone_number}
                </td>
                <td className="border border-gray-300 p-2">
                  {studio.street} - {studio.district}, {studio.city_or_regency},{" "}
                  {studio.province}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-[#E6FDA3] text-black px-2 py-1 rounded mr-2 hover:bg-[#D4F491]"
                    onClick={() => handleEdit(studio)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#F87A7A] text-white px-2 py-1 rounded hover:bg-[#F45A5A]"
                    onClick={() => handleDelete(studio.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border border-gray-300 p-2 text-center"
              >
                No studios found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudioManagement;
