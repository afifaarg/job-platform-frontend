import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://job-platform-api-1.onrender.com/backendAPI/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data.user_data;
          if (userData) {
            localStorage.setItem("userID", userData.id);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            if (userData.role === "admin") {
              localStorage.setItem("userRole", "admin");
              localStorage.setItem(
                "allUsers",
                JSON.stringify(response.data.user_data.all_users)
              );
              navigate("/adminDashboard");
            } else {
              localStorage.setItem("userRole", "employee");
              navigate("/Landed");
            }
          } else {
            alert("User data is undefined");
          }
        }
      })
      .catch((error) => {
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <>
      <div className="flex justify-start items-center  space-x-4 p-5 bg-white shadow-md w-full fixed top-0">
        <a href="#" className="flex text-[#000066] text-xl px-4 font-bold">
          EMPLOYEEID
        </a>
        <div className="flex space-x-6">
          <a href="#" className="text-[#000066] hover:font-semibold">
            About Us
          </a>
          <a href="#" className="text-[#000066] hover:font-semibold">
            Contact Us
          </a>
        </div>
      </div>

      <div class="flex mt-4 items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-2xl p-10 shadow-lg text-center">
          <h2 class="mb-5 text-3xl font-bold">Login</h2>
          <form class="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label for="email" class="block text-left text-lg">
                Username
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your username"
                required
                class="w-full p-3 border-b border-[#000066] outline-none focus:border-[#000066]"
              />
            </div>
            <div>
              <label for="password" class="block text-left text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                class="w-full p-3 border-b border-[#000066] outline-none focus:border-[#000066]"
              />
            </div>
            <button
              type="submit"
              class="w-full p-3 mt-5 font-bold text-[#000066] border-2 border-[#000066] rounded-lg transition duration-300 hover:bg-[#000066] hover:text-white"
            >
              Login
            </button>
            <a href="#" class="block mt-3 text-sm text-[#000066]">
              Forgot Password?
            </a>
          </form>
          <hr class="my-5 border-gray-300" />
          <Link
            to="/SignUp"
            class="w-full inline-block p-3 font-bold text-white transition duration-300 bg-[#000066] border-2 border-[#000066] rounded-lg hover:bg-white hover:text-[#000066]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
