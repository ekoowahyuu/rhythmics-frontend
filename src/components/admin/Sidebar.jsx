import React from "react";

const Sidebar = ({ setActivePage, activePage }) => {
  return (
    <div className="w-64 bg-[#B17457] text-white h-screen sticky top-0">
      {/* Sidebar Header */}
      <div className="py-4 text-center font-bold text-lg border-b border-white">
        Admin Dashboard
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-4">
        {/* User Management Section */}
        <li
          className={`py-2 px-4 hover:bg-[#D8A583] cursor-pointer ${
            activePage === "User Management" ? "bg-[#D8A583]" : ""
          }`}
          onClick={() => setActivePage("User Management")}
        >
          User Management
        </li>

        {/* Studio Management Section */}
        <li
          className={`py-2 px-4 hover:bg-[#D8A583] cursor-pointer ${
            activePage === "Studio Management" ? "bg-[#D8A583]" : ""
          }`}
          onClick={() => setActivePage("Studio Management")}
        >
          Studio Management
        </li>

        {/* Room Management Section */}
        <li
          className={`py-2 px-4 hover:bg-[#D8A583] cursor-pointer ${
            activePage === "Field Management" ? "bg-[#D8A583]" : ""
          }`}
          onClick={() => setActivePage("Room Management")}
        >
          Room Management
        </li>

        {/* Review Management Section */}
        <li
          className={`py-2 px-4 hover:bg-[#D8A583] cursor-pointer ${
            activePage === "Review Management" ? "bg-[#D8A583]" : ""
          }`}
          onClick={() => setActivePage("Review Management")}
        >
          Review Management
        </li>

        {/* Booking Management Section */}
        <li
          className={`py-2 px-4 hover:bg-[#D8A583] cursor-pointer ${
            activePage === "Booking Management" ? "bg-[#D8A583]" : ""
          }`}
          onClick={() => setActivePage("Booking Management")}
        >
          Booking Management
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
