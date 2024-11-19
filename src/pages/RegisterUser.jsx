import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const phoneChangeHandler = (phoneValue) => {
    setMobileNumber(phoneValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword || !mobileNumber) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Error: Passwords do not match.");
      return;
    }

    setError("");

    axios
      .post(
        "http://127.0.0.1:8000/backendAPI/users/",
        {
          email,
          username,
          password,
          phone: mobileNumber,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          alert("Account created successfully! Please log in.");
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Failed to create an account. Please try again.");
      });
  };

  return (
    <>
      <div className="flex justify-start items-center space-x-6 px-5 py-3 bg-white shadow-md w-full fixed top-0">
        <a href="#" className="flex text-[#000066] text-xl font-bold">
          EMPLOYEEID
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-[#000066] hover:font-semibold">
            About Us
          </a>
          <a href="#" className="text-[#000066] hover:font-semibold">
            Contact Us
          </a>
        </div>
      </div>

      <div className="flex mt-2 items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg md:max-w-2xl bg-white rounded-xl mt-4 p-6 md:p-10 shadow-lg">
          <h2 className="mb-5 text-2xl md:text-3xl font-bold text-center">
            Sign Up
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-center font-bold">{error}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-left text-sm md:text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="w-full mt-1 p-2 rounded-lg border text-[#02295a] text-sm md:text-[15px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-left mb-1 text-sm md:text-lg"
                >
                  Mobile Number
                </label>
                <PhoneInput
                  country={"in"} // Set a default country
                  value={mobileNumber}
                  onChange={phoneChangeHandler}
                  inputClass={`min-w-full max-w-full mt-12 py-[18px] rounded-lg border text-[#02295a] text-sm md:text-[15px]`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-left  py-text-sm md:text-lg"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                required
                className="w-full mt-1 p-2 rounded-lg border text-[#02295a] text-sm md:text-[15px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-left text-sm md:text-lg"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="w-full mt-1 p-2 rounded-lg border text-[#02295a] text-sm md:text-[15px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-left text-sm md:text-lg"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="w-full mt-1 p-2 rounded-lg border text-[#02295a] text-sm md:text-[15px]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-5 font-bold text-[#000066] border-2 border-[#000066] rounded-lg transition duration-300 hover:bg-[#000066] hover:text-white"
            >
              Sign Up
            </button>
          </form>
          <hr className="my-5 border-gray-300" />
          <Link
            to="/"
            className="block text-center p-3 font-medium text-[#000066] hover:underline hover:font-bold"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </>
  );
}
