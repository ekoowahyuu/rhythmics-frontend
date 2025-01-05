import { useState } from "react";

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="">
      <div className="h-screen flex items-center justify-center bg-putih">
        <div className="w-[80%] max-w-5xl h-[30rem] flex rounded-l-lg shadow-lg">
          <div class="w-1/2 bg-white flex flex-col justify-center items-center rounded-l-lg p-6">
            <h1 className="text-3xl font-bold mb-10 text-hitam-800">
              Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
              />
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
              />
              <textarea
                placeholder="Description"
                required
                className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary mb-6 font-poppins"
              ></textarea>
              <button
                type="submit"
                className="w-full border text-putih bg-[#B17457] hover:bg-[#AB886D] border-gray-300 rounded-3xl p-3 focus:outline-primary focus:ring-primary font-poppins"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-1/2 bg-gradient-to-r from-[#B17457] to-[#D8A583] text-white flex flex-col justify-center rounded-r-lg p-10">
            <h2 class="font-poppins text-3xl font-bold mb-4">
              Reach Out to Rhythmics
            </h2>
            <p class=" font-poppins text-sm mb-4 text-putih font-semibold">
              Have questions or need assistance? We’re here for you!
            </p>
            <p class=" font-poppins text-sm leading-6 text-putih">
              At Rhythmics, we’re committed to making your studio booking
              experience as smooth as possible. Whether you need help with
              finding the perfect studio, have feedback, or want to know more
              about our services, don’t hesitate to reach out. Our team is ready
              to support you every step of the way!
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Email Successfully Sent</h2>
            <p className="mb-6">
              Thank you for reaching out to us. We will get back to you shortly.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-primary text-white rounded-3xl font-poppins"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default ContactUs;
