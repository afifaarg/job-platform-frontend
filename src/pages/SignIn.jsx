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
      <div className="flex justify-start items-start  space-x-4 p-5 bg-white shadow-md w-full fixed top-0">
        <a href="#" className="flex ">
          {/* Logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 864 188.3852"
            width="100"
            className="fill-current text-[#000066]"
          >
            <path
              id="fullLogo"
              d="M180.2263,4.8246H309.8888V34.4683H214.3646v44.32h70.8128v29.3442H214.3646v38.7625a7.9532,7.9532,0,0,0,7.9532,7.9532h87.2715v29.6437H206.0955a25.8691,25.8691,0,0,1-25.8692-25.8691Zm202.08,149.1248h73.1964v30.5422h-89.44a25.8479,25.8479,0,0,1-25.848-25.8479V4.8246H374.353V145.9962A7.9532,7.9532,0,0,0,382.3062,153.9494ZM445.5642,4.8246H590.4959V36.2654H535.0982V184.4916H500.9619V36.2654H445.5642Zm175.0351,179.667V4.8246h34.1383v179.667ZM684.331,94.0629C684.331,37.4634,717.87.931,774.1665.931,830.7622.931,864,37.4634,864,94.0629c0,56.8914-32.3393,94.3223-89.8335,94.3223C716.3727,188.3852,684.331,150.9543,684.331,94.0629Zm145.5326,0c0-37.73-17.3676-63.1887-55.6971-63.1887-38.629,0-55.9967,25.4583-55.9967,63.1887,0,38.9285,17.0682,64.6786,55.6972,64.6786C812.7955,158.7415,829.8636,133.2909,829.8636,94.0629ZM94.5,132.6261a12.5626,12.5626,0,0,1-3.9184-10.0243c.1851-3.8446,1.6294-7.8575,13.8715-12.6237l-.0149-.0388c14.434-6.119,44.7712-19.99,44.7712-54.8363C149.21,24.7192,124.2421,0,93.5528,0H0V184.4916H34.3733V34.3707h59.18c11.7357,0,21.2837,9.3021,21.2837,20.7323,0,8.5279-3.9974,14.8346-25.0868,23.7276l.0009.0026c-14.4641,5.8827-32.2763,16.7413-33.5,42.1116a46.99,46.99,0,0,0,13.3667,35.3934c18.1879,19.087,50.6894,26.0887,80.2836,28.13V149.9642C123.4337,147.7947,103.0186,141.5657,94.5,132.6261Z"
            ></path>
          </svg>
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
