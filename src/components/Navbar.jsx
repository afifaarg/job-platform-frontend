import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle user profile check and redirection
  const handleProfileClick = () => {
    const userId = localStorage.getItem("userID"); // Get user ID
    if (userId) {
      // Fetch user data from the backend
      axios
        .get(`http://127.0.0.1:8000/backendAPI/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          // Check if educations, experiences, or projects data is missing
          console.log(userData);
          if (
            userData.educations.length == 0 &&
            userData.experiences.length == 0 &&
            userData.projects.length == 0
          ) {
            navigate("/fillProfile"); // Redirect to Profile page to fill out data
          } else {
            navigate("/profile"); // Redirect to Profile page if all data is present
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Redirect to Profile page in case of error
        });
    } else {
      navigate("/Profile"); // If no user ID, redirect to Profile page
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refresh"); // Get refresh token
    axios
      .post("http://127.0.0.1:8000/backendAPI/logout/", {
        refresh_token: refreshToken,
      })
      .then(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userID");
        navigate("/"); // Redirect to login page after logout
      })
      .catch((error) => {
        alert("Logout error:", error); // Handle logout errors
      });
  };

  return (
    <div className="relative bg-white shadow-xl rounded-xl m-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-4  md:space-x-10">
          {/* Left: User icon with dropdown */}
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"
              alt="User"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
            />
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a
                  onClick={() => {
                    setDropdownOpen(false);
                    handleProfileClick(); // Check profile data and navigate accordingly
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </a>
                <a
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/Settings");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </a>
                <a
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/AboutUs");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  About Us
                </a>
              </div>
            )}
          </div>

          {/* Right: Logout button */}
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-base font-medium text-white bg-[#000066] hover:bg-opacity-90 rounded-md shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
