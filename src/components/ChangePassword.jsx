import { useState } from "react";
import Profile from "../assets/Profile.png";
import SideBar from "./SideBar.jsx";
import { changePassword } from "../services/auth-service.js";

const ChangePassword = ({ onLogout, user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);

    // Reset errors
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmNewPasswordError("");

    let isValid = true;

    if (currentPassword.trim() === "") {
      setCurrentPasswordError("Current password is required");
      isValid = false;
    }

    if (newPassword.trim() === "") {
      setNewPasswordError("New password is required");
      isValid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (confirmNewPassword.trim() === "") {
      setConfirmNewPasswordError("Confirm password is required");
      isValid = false;
    } else if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      setIsUpdate(false);
      return;
    }

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirmation_password: confirmNewPassword,
      });

      setSuccessMessage("Password changed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // Reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.message || "Failed to change password.");
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <div className="flex justify-start h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar onLogout={onLogout} />

      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold text-[#B17457] text-start mb-6 ml-36">
          Change Password
        </h1>
        <div className="bg-gradient-to-r from-[#B17457] to-[#D8A583] rounded-lg shadow-xl w-full sm:w-2/4 md:w-1/3 lg:w-1/2 xl:w-[60rem] h-[40rem] flex flex-wrap ml-36">
          <div className="w-full h-48 border-b-[1px] border-gray-900 border-opacity-35 shadow-lg p-6 flex items-center">
            <img src={Profile} alt="Profile" className="w-28 h-28 ml-16" />
            <div className="ml-6">
              <p className="text-xl text-white font-bold">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-white font-semibold mt-2">
                {user.email}
              </p>
            </div>
          </div>

          <div className="w-full h-[calc(100%-12rem)] flex flex-col items-center justify-center px-8">
            <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-white font-medium mb-2"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-65 placeholder-gray-500 border-[#D8A583] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {currentPasswordError && (
                  <p className="text-sm text-red-600 mt-1">
                    {currentPasswordError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-white font-medium mb-2"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-65 placeholder-gray-500 border-[#D8A583] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPasswordError && (
                  <p className="text-sm text-red-600 mt-1">
                    {newPasswordError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-white font-medium mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-65 placeholder-gray-500 border-[#D8A583] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {confirmNewPasswordError && (
                  <p className="text-sm text-red-600 mt-1">
                    {confirmNewPasswordError}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-1/3 p-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
                  disabled={isUpdate}
                >
                  {isUpdate ? "Updating..." : "Update"}
                </button>
              </div>
            </form>

            {successMessage && (
              <div className="text-center mt-4 text-white">
                <p>{successMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
