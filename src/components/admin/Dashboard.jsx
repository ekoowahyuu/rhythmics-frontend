import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import UserManagement from "./UserManagement";
import StudioManagement from "./StudioManagement"; // Renamed VenueManagement
import RoomManagement from "./RoomManagement"; // Renamed FieldManagement
import ReviewManagement from "./ReviewManagement";
import BookingManagement from "./BookingManagement";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const token = localStorage.getItem("token");

  const location = useLocation();

  useEffect(() => {
    const pageFromUrl = new URLSearchParams(location.search).get("page");
    if (pageFromUrl) {
      setActivePage(pageFromUrl);
    }
  }, [location]);

  const renderContent = () => {
    switch (activePage) {
      case "User Management":
        return <UserManagement token={token} />;
      case "Studio Management": // Adjusted from Venue Management
        return <StudioManagement token={token} />;
      case "Room Management": // Adjusted from Field Management
        return <RoomManagement token={token} />;
      case "Review Management":
        return <ReviewManagement token={token} />;
      case "Booking Management":
        return <BookingManagement token={token} />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold" style={{ color: "#B17457" }}>
              Welcome to the Admin Dashboard
            </h1>
            <p className="mt-4" style={{ color: "#B17457" }}>
              Select an option from the sidebar to get started.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} activePage={activePage} />

      {/* Main Content */}
      <div className="flex-1 p-6" style={{ backgroundColor: "#F5F5F5" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
