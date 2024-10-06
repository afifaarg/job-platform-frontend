import React, { useState } from "react";
import axios from "axios";

/**
 * RegisterAdmin Component
 *
 * This component displays a form for adding a new admin user.
 * It includes fields for the admin's full name, email, gender,
 * username, and password. Upon successful registration, it
 * calls the parent function to add the new member and closes
 * the modal.
 *
 * Props:
 * - onAddMember: Function to call when a new admin is successfully registered.
 * - onClose: Function to call to close the modal.
 */
export default function RegisterAdmin({ onAddMember, onClose }) {
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  /**
   * Handles input changes in the form fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sends a POST request to register the admin user
      const response = await axios.post(
        "https://job-platform-api-1.onrender.com/backendAPI/registerAdmin/",
        formData
      );
      alert("Admin user registered successfully!");

      // Call the parent function to add the new member
      onAddMember({
        ...formData,
        role: "admin",
        uniqueID: response.data.uniqueID, // Add unique ID from response
      });

      onClose(); // Close the modal
      // Reset form data
      setFormData({
        name: "",
        username: "",
        email: "",
        gender: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to register admin user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white flex flex-col space-y-2 p-6 w-full max-w-md rounded-2xl">
        <h3 className="text-xl mb-4 font-bold text-secondary-text">
          Add New Admin
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Input field for Admin's Full Name */}
          <div className="mb-2">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Admin's full-name"
              value={formData.name}
              onChange={handleChange}
              className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
            />
          </div>
          {/* Input field for Admin's Email */}
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Admin's Email"
              value={formData.email}
              onChange={handleChange}
              className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
            />
          </div>
          {/* Select field for Admin's Gender */}
          <div className="mb-2">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Input field for Admin's Username */}
          <div className="mb-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
            />
          </div>
          {/* Input field for Admin's Password */}
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]"
            />
          </div>

          {/* Buttons for Cancel and Submit */}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
