import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Studios from "./components/Studios";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import VerificationCode from "./components/VerificationCode";
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import Order from "./components/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Homepage from "./components/Homepage.jsx";
import WriteReview from "./components/WriteReview.jsx";
import ReviewSuccess from "./components/ReviewSuccess.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StudioDetail from "./components/StudioDetail.jsx";
import Payment from "./components/Payment.jsx";
import ConfirmPayment from "./components/ConfirmPayment.jsx";
import BookingSuccess from "./components/BookingSuccess.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import MyStudio from "./components/MyStudio.jsx";
import AddStudioForm from "./components/AddStudioForm.jsx";
import AdminVerification from "./components/AdminVerification.jsx";
import GalleryPage from "./components/GalleryPage.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(`DATA: ${JSON.stringify(userData)}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expired_at");
  };

  return (
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Navbar menerima user dan handleLogout sebagai props */}
          <Navbar user={user} />
          <div className="flex-grow bg-gray-100">
            <Routes>
              <Route
                  path="/sign-in"
                  element={<SignIn onLogin={handleLogin} />}
              />
              <Route path="/sign-up" element={<SignUp onLogin={handleLogin} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verification-code" element={<VerificationCode />} />

              <Route path="/reset-success" element={<ResetSuccess />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={<SignIn onLogin={handleLogin} />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/studio" element={<Studios />} />
                <Route path="/studioDetail/:name" element={<StudioDetail />} />
                <Route
                    path="/edit-profile"
                    element={
                      <EditProfile
                          onLogout={handleLogout}
                          user={user}
                          onUserUpdate={setUser}
                      />
                    }
                />
                <Route
                    path="/change-password"
                    element={<ChangePassword onLogout={handleLogout} user={user} />}
                />
                <Route path="/order" element={<Order onLogout={handleLogout} />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/write-review" element={<WriteReview />} />
                <Route path="/review-success" element={<ReviewSuccess />} />
                <Route path="/my-studio" element={<MyStudio onLogout={handleLogout} user={user} />} />
                <Route path="/add-studio" element={<AddStudioForm onLogout={handleLogout} user={user} />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/confirm-payment" element={<ConfirmPayment />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route element={<AdminVerification user={user} />}>
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
