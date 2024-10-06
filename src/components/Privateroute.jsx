import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Privateroute component to protect routes based on authentication and user roles.
 *
 * @param {Object} props - The component props.
 * @param {React.Component} props.element - The component to be rendered if authorized.
 * @param {string} [props.requiredRole] - The required user role to access the route.
 * @param {Object} rest - Additional props to be passed to the component.
 * @returns {JSX.Element} The rendered component or an access denied message.
 */
export function Privateroute({ element: Component, requiredRole, ...rest }) {
  const isAuthenticated = Boolean(localStorage.getItem("access")); // Check for access token in localStorage
  const userRole = localStorage.getItem("userRole"); // Get user role from localStorage

  // If not authenticated, display access denied message
  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You need to be logged in to view this page.</p>
        <button
          onClick={() => window.history.back()} // Go back to the previous page
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  // If requiredRole is provided, check if the user's role matches
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // Render the component if authenticated and authorized
  return <Component {...rest} />;
}
