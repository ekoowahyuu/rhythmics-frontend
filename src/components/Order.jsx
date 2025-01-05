import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import OrderService from "../services/order-service.js";

const Order = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await OrderService.getOrder(localStorage.getItem("token"));
        setOrders(fetchedOrders);
        setIsLoading(false);

        // Fetch schedule details for each booking
        const fetchedSchedules = {};
        for (const order of fetchedOrders) {
          const schedule = await OrderService.getSchedule(localStorage.getItem("token"), order.id);
          fetchedSchedules[order.id] = schedule;
        }
        setSchedules(fetchedSchedules);
      } catch (error) {
        console.error("Error fetching orders or schedules:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on activeTab
    setFilteredOrders(orders.filter((order) => order.status === activeTab));
  }, [activeTab, orders]);

  const handleCancelOrder = async (orderId) => {
    try {
      await OrderService.updateBooking(orderId, { status: "canceled" }, localStorage.getItem("token"));
      // Update the local state after canceling the order
      setOrders((prevOrders) =>
          prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: "canceled" } : order
          )
      );
      alert("Order successfully canceled!");
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Failed to cancel the order. Please try again.");
    }
  };

  const handleOrderAgain = () => {
    navigate("/studio");
  };

  return (
      <div className="flex justify-start h-screen bg-gray-100">
        {/* Menu */}
        <SideBar onLogout={onLogout} />

        <div className="p-6 w-full">
          {/* Header */}
          <h1 className="text-3xl font-bold text-[#B17457] text-start mb-6 ml-6">Order</h1>

          {/* Tabs */}
          <div className="bg-gradient-to-r from-[#B17457] to-[#D8A583] rounded-lg shadow-xl w-full xl:w-[60rem] h-auto ml-6">
            <div className="flex border-b border-gray-200">
              <button
                  onClick={() => setActiveTab("ongoing")}
                  className={`w-1/3 py-4 text-center font-semibold ${
                      activeTab === "ongoing" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white"
                  }`}
              >
                Ongoing
              </button>
              <button
                  onClick={() => setActiveTab("finished")}
                  className={`w-1/3 py-4 text-center font-semibold ${
                      activeTab === "finished" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white"
                  }`}
              >
                Finished
              </button>
              <button
                  onClick={() => setActiveTab("canceled")}
                  className={`w-1/3 py-4 text-center font-semibold ${
                      activeTab === "canceled" ? "text-yellow-400 border-b-2 border-yellow-400" : "text-white"
                  }`}
              >
                Canceled
              </button>
            </div>

            {/* Order Items */}
            <div className="p-4 space-y-4">
              {isLoading ? (
                  <p className="text-white text-center">Loading orders...</p>
              ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                      <div key={order.id} className="flex items-center bg-white rounded-lg shadow-lg p-4">
                        {/* Order Details */}
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-[#B17457]">{order.name}</h2>
                          {schedules[order.id] ? (
                              <>
                                <p className="text-gray-500 text-sm">
                                  {schedules[order.id].date} • {schedules[order.id].time_slot}
                                </p>
                                <p className="text-green-600 font-semibold mt-1">Rp{order.price.toLocaleString()}</p>
                              </>
                          ) : (
                              <p className="text-gray-500 text-sm">Loading schedule...</p>
                          )}
                        </div>

                        {/* Cancel Button for Ongoing Orders */}
                        {activeTab === "ongoing" && (
                            <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                            >
                              Cancel Order
                            </button>
                        )}

                        {/* Order Again Button for Canceled Orders */}
                        {activeTab === "canceled" && (
                            <button
                                onClick={handleOrderAgain}
                                className="bg-[#B17457] text-white py-1 px-3 rounded-lg hover:bg-[#A36A4E]"
                            >
                              Order Again
                            </button>
                        )}
                      </div>
                  ))
              ) : (
                  <p className="text-white text-center">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Order;
