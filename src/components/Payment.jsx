import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const formattedPrice = state?.price
        ? parseFloat(state.price)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            .replace(",", ".")
        : "0.00";

    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        email: "",
        notes: "",
    });

    const [errors, setErrors] = useState({
        customerName: "",
        phoneNumber: "",
        email: "",
    });

    const [paymentOption, setPaymentOption] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        category: "",
        method: "",
    });

    const [progress, setProgress] = useState(0);
    const [taxPrice, setTaxPrice] = useState("0.00");
    const [totalPrice, setTotalPrice] = useState("0.00");

    useEffect(() => {
        if (state?.price) {
            const numericPrice = parseFloat(state.price);
            const calculatedTax = numericPrice * 0.12;
            const calculatedTotal = numericPrice + calculatedTax;

            setTaxPrice(
                calculatedTax
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    .replace(",", ".")
            );

            setTotalPrice(
                calculatedTotal
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    .replace(",", ".")
            );
        }
    }, [state?.price]);

    const handleReset = () => {
        setFormData({
            customerName: "",
            phoneNumber: "",
            email: "",
            notes: "",
        });
        setErrors({
            customerName: "",
            phoneNumber: "",
            email: "",
        });
        setPaymentOption("");
        setSelectedPaymentMethod({
            category: "",
            method: "",
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "phoneNumber") {
            const isNumeric = /^[0-9]*$/;
            if (!isNumeric.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    phoneNumber: "Phone Number must contain only numbers",
                }));
                return;
            }
            if (value.length > 15) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    phoneNumber: "Phone Number cannot exceed 15 digits",
                }));
                return;
            }
        }

        setFormData({
            ...formData,
            [id]: value,
        });

        setErrors({
            ...errors,
            [id]:
                value.trim() === ""
                    ? `${id.replace(/([A-Z])/g, " $1")} is required`
                    : "",
        });

        if (id === "email" && value.trim() !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors({
                ...errors,
                email: !emailRegex.test(value) ? "Invalid email format" : "",
            });
        }
    };

    const handlePaymentMethodClick = (category, method) => {
        setSelectedPaymentMethod({
            category,
            method,
        });
    };

    const isFormValid = () => {
        const requiredFields = ["customerName", "phoneNumber", "email"];
        const hasErrors = requiredFields.some(
            (field) => errors[field] || !formData[field]
        );
        return !hasErrors && selectedPaymentMethod.method;
    };

    const handleNext = () => {
        if (isFormValid()) {
            navigate("/confirm-payment", {
                state: {
                    ...state,
                    price: formattedPrice,
                    taxPrice,
                    totalPrice,
                    selectedPaymentMethod,
                    formData,
                },
            });
        } else {
            alert("Please complete all required fields and select a payment method.");
        }
    };

    const calculateProgress = () => {
        const requiredFields = ["customerName", "phoneNumber", "email"];
        let filledFields = requiredFields.filter(
            (field) => formData[field].trim() !== ""
        ).length;

        let progressValue = (filledFields / requiredFields.length) * 50;

        if (selectedPaymentMethod.category && selectedPaymentMethod.method) {
            progressValue += 50;
        }

        setProgress(progressValue);
    };

    useEffect(() => {
        calculateProgress();
    }, [formData, selectedPaymentMethod]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[85rem] h-[45rem] flex">
                {/* Left Side */}
                <div className="w-2/3 flex flex-col items-center gap-6 py-8">
                    <div className="w-[50rem]">
                        <p className="text-lg font-semibold">
                            1. Customer Detail and Payment Option
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded mt-2">
                            <div
                                className="h-full bg-green-500 rounded"
                                style={{
                                    width: `${progress}%`,
                                    transition: "width 0.3s ease-in-out",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="bg-primary rounded-lg shadow-lg w-[50rem] p-8 text-white">
                        <h2 className="text-xl font-bold mb-3 -mt-3">Customer Detail</h2>
                        <form className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium">Customer Name</label>
                                <input
                                    type="text"
                                    id="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter name"
                                />
                                {errors.customerName && (
                                    <span className="text-red-500 text-sm mt-1">
                    {errors.customerName}
                  </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter phone number"
                                />
                                {errors.phoneNumber && (
                                    <span className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </span>
                                )}
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                                )}
                            </div>

                            <div className="flex flex-col col-span-2">
                                <label className="text-sm font-medium">Notes</label>
                                <input
                                    type="text"
                                    id="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="mt-2 p-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter notes"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="bg-primary rounded-lg shadow-lg w-[50rem] p-5 pl-8 text-white">
                        <div className="flex justify-between text-lg font-medium">
                            <span>Price</span>
                            <span>Rp{formattedPrice}</span>
                        </div>
                        <div className="flex justify-between text-lg font-medium mb-2">
                            <span>Service Fee</span>
                            <span>Rp{taxPrice}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-white pt-2">
                            <span>Total</span>
                            <span>Rp{totalPrice}</span>
                        </div>
                    </div>
                    <div className="absolute -bottom-14 text-left w-[50rem]">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-3 bg-[#E6FDA3] text-black font-semibold rounded-lg shadow-md hover:bg-[#F2FA5A] transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/3 flex flex-col items-center gap-6 py-8">

                    <div className="w-[25rem] text-start">
                        <p className="text-lg font-semibold">
                            2. Review and Confirm Payment
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded mt-2"></div>
                    </div>
                    <div className="bg-primary rounded-lg shadow-lg w-[25rem] h-[31rem] p-6">
                        <h2 className="text-lg font-bold text-white mb-4">
                            Select Payment Option
                        </h2>
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  Virtual Account
                </span>
                            </div>
                            <div className="flex gap-4">
                                <img
                                    src="https://www.bca.co.id/-/media/Feature/Header/Header-Logo/logo-bca.svg?v=1"
                                    alt="BCA"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "BCA" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("Virtual Account", "BCA")
                                    }
                                />
                                <img
                                    src="https://www.bni.co.id/Portals/1/BNI/Images/logo-bni-new.png"
                                    alt="BNI"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "BNI" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("Virtual Account", "BNI")
                                    }
                                />
                                <img
                                    src="https://www.bankmandiri.co.id/image/layout_set_logo?img_id=31567&t=1732986257988"
                                    alt="Mandiri"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "Mandiri" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("Virtual Account", "Mandiri")
                                    }
                                />
                            </div>
                            <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  E-Wallet
                </span>
                            </div>
                            <div className="flex gap-4">
                                <img
                                    src="https://gopay.co.id/assets/img/logo/gopay.webp"
                                    alt="Gopay"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "Gopay" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("E-Wallet", "Gopay")
                                    }
                                />
                                <img
                                    src="https://www.bankbsi.co.id/img/logo.png"
                                    alt="BSI"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "BSI" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("E-Wallet", "BSI")
                                    }
                                />
                            </div>
                            <div className="bg-[#E6FDA3] p-1 rounded-lg">
                <span className="block text-black font-semibold pl-2">
                  Credit Card
                </span>
                            </div>
                            <div className="flex gap-4">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                    alt="Visa"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "Visa" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("Credit Card", "Visa")
                                    }
                                />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                    alt="MasterCard"
                                    className={`w-12 h-12 object-contain bg-white rounded-md p-2 cursor-pointer ${
                                        selectedPaymentMethod.method === "MasterCard" &&
                                        "ring-2 ring-blue-500"
                                    }`}
                                    onClick={() =>
                                        handlePaymentMethodClick("Credit Card", "MasterCard")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-14 text-right w-[25rem]">
                        <button
                            type="button"
                            onClick={handleNext}
                            className={`px-6 py-3 font-semibold rounded-lg shadow-md transition ${
                                isFormValid()
                                    ? "bg-[#E6FDA3] text-black hover:bg-[#F2FA5A]"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!isFormValid()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
