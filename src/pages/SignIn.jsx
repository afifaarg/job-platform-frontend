import { useState } from "react"; // Import useState hook from React
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Import icons for showing/hiding password

// SignIn component for user authentication
export default function SignIn() {
  // State variables for form inputs and error handling
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Make a POST request to the login endpoint
    axios
      .post("https://job-platform-api-1.onrender.com/backendAPI/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        // Check if the response status is 200 (success)
        if (response.status === 200) {
          const userData = response.data.user_data; // Extract user data from response

          if (userData) {
            console.log(userData);
            // Save user ID and tokens to localStorage
            localStorage.setItem("userID", userData.id);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            // Check user role to navigate accordingly
            if (userData.role === "admin") {
              console.log(response.data);
              localStorage.setItem("userRole", "admin");
              localStorage.setItem(
                "allUsers",
                JSON.stringify(response.data.user_data.all_users) // Store all users
              );
              navigate("/adminDashboard"); // Navigate to the admin dashboard
            } else {
              localStorage.setItem("userRole", "employee");
              navigate("/Landed"); // Navigate to the regular user landing page
            }
          } else {
            console.error("User data is undefined"); // Handle case where user data is not defined
          }
        }
      })
      .catch((error) => {
        // Handle errors during the request
        setError("Invalid credentials. Please try again."); // Update error state
      });
  };

  return (
    <div className="flex h-screen w-full items-center space-x-2 justify-center ">
      <div className="flex items-center overflow-hidden rounded-lg lg:flex-row bg-gray-50 shadow-lg border">
        {/* Left Section - Image */}
        <div className="hidden h-full md:flex lg:w-1/2 border-r-2">
          <img
            className="object-cover rounded-lg"
            src={"/cover-img.png"} // Image for login illustration
            alt="Login illustration"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 rounded-lg">
          <h2 className="mb-2 text-5xl font-bold text-secondary-text">Login</h2>
          <p className="mb-6 text-sm text-secondary-muted">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username Input */}
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="p-3 border-b-2 border-gray-500 outline-none rounded-lg bg-gray-50"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state on input change
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                className="p-3 border-b-2 border-gray-500 rounded-lg outline-none bg-gray-50 w-full"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              />
              {/* Eye Icon for Toggle */}
              <button
                type="button"
                className="absolute right-3 bottom-2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility of password
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-500" /> // Show eye off icon
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" /> // Show eye icon
                )}
              </button>
            </div>

            {/* Error Message Display */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button className="mt-4 bg-primary text-white py-3 rounded-lg hover:scale-105 transform transition duration-300">
              Login
            </button>
          </form>

          {/* Link to Registration Page */}
          <div className="mt-4 text-md flex mx-auto items-center text-secondary-text">
            <p>Don't have an account?</p>
            <Link
              to="/SignUp"
              className="px-4 py-2 text-md font-bold underline text-secondary-text rounded-lg hover:text-[#323138] transform transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
