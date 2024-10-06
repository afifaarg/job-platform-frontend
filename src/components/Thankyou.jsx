import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

/**
 * Thankyou Component
 *
 * This component is displayed after a successful registration.
 * It informs the user that their registration has been completed
 * successfully and provides a button to navigate back to the
 * sign-in page.
 */
export default function Thankyou() {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle button click for navigating to the sign-in page
  const handleSignInClick = () => {
    navigate("/"); // Navigate to the sign-in page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Thank You!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Your registration has been completed successfully.
      </p>
      <button
        onClick={handleSignInClick}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go to Sign In
      </button>
    </div>
  );
}
