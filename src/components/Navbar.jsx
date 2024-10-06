import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// NavBar component for user navigation and actions like logout
export default function NavBar() {
  const [open, setOpen] = useState(false); // State for mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle user logout
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refresh"); // Get refresh token from local storage

    axios
      .post("https://job-platform-api-1.onrender.com/backendAPI/logout/", {
        refresh_token: refreshToken, // Send refresh token to logout
      })
      .then(() => {
        // Clear tokens from local storage upon successful logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/"); // Redirect to the home page
      })
      .catch((error) => {
        console.error("Logout error:", error); // Log any errors
      });
  };

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-4 md:justify-start md:space-x-10">
            {/* User profile image and profile link */}
            <div className="hidden md:flex items-center justify-start md:flex-1 lg:w-0">
              <div>
                <a
                  onClick={() => {
                    setDropdownOpen(false); // Close dropdown if open
                    navigate("/Profile"); // Navigate to the profile page
                  }}
                  className="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"
                    alt="User"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown} // Toggle dropdown on image click
                  />
                </a>
              </div>
            </div>

            {/* Logout button */}
            <div>
              <a
                onClick={handleLogout}
                className="w-full cursor-pointer whitespace-nowrap inline-flex items-center space-x-2 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                <svg
                  viewBox="0 0 900 1000"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
                </svg>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={
            open
              ? "opacity-100 scale-100 z-10 transition shadow-lg ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"
                    alt="userPic"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)} // Toggle mobile menu
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-2 gap-x-8">
                {/* Profile link in mobile menu */}
                <a
                  onClick={() => {
                    setDropdownOpen(false); // Close dropdown if open
                    navigate("/Profile"); // Navigate to the profile page
                  }}
                  className="w-full mb-2 whitespace-nowrap inline-flex items-center space-x-2 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-secondary-text bg-gray-100 hover:bg-gray-300 cursor-pointer"
                >
                  <span>Profile</span>
                </a>

                {/* Logout link in mobile menu */}
                <a
                  onClick={handleLogout}
                  className="w-full cursor-pointer whitespace-nowrap inline-flex items-center space-x-2 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 900 1000"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
                  </svg>
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
