import React, { useState } from "react"; // Import React and useState hook
import Statistics from "../components/UserStats"; // Import the UserStats component for displaying user statistics
import MembersTable from "../components/MembersTable"; // Import the MembersTable component for displaying the user list
import NavBar from "../components/Navbar"; // Import the NavBar component for the main navigation
import DashboardGeneral from "./DashboardGeneral";

// AdminDashboard component to manage the admin interface
const AdminDashboard = () => {
  // State to manage the active section of the dashboard (default is 'users')
  const [selectedSection, setSelectedSection] = useState("dashboard");
  // State to manage the list of users (initially empty)
  const [users, setUsers] = useState([]);
  // State to manage the visibility of the sidebar (default is open)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to add a new user to the users list
  const addUser = (user) => {
    setUsers([...users, user]); // Spread the existing users and add the new user
  };

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the boolean state
  };

  return (
    <div className="min-h-screen flex space-x-2 bg-white p-4">
      {" "}
      {/* Main container with a minimum height and flex layout */}
      {/* Sidebar */}
      <aside
        className={` w-64 z-10 bg-[#dbe1e7] rounded-lg flex flex-col p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full" // Conditional class for showing/hiding the sidebar
        } md:translate-x-0`} // Sidebar remains visible on medium screens and up
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>{" "}
        {/* Dashboard title */}
        <nav className="flex flex-col space-y-4 mt-4">
          {" "}
          {/* Navigation menu */}
          <button
            className={`py-2 px-4 text-left text-[#000066] rounded-lg  ${
              selectedSection === "dashboard"
                ? "bg-primary-light text-white font-bold"
                : " hover:bg-gray-100" // Highlight the button if the section is 'users'
            }`}
            onClick={() => setSelectedSection("dashboard")} // Set the selected section to 'users'
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 text-left text-[#000066] rounded-lg  ${
              selectedSection === "users"
                ? "bg-primary-light text-white font-bold"
                : " hover:bg-gray-100" // Highlight the button if the section is 'users'
            }`}
            onClick={() => setSelectedSection("users")} // Set the selected section to 'users'
          >
            User List
          </button>
          <button
            className={`py-2 px-4 text-left text-[#000066] rounded-lg ${
              selectedSection === "stats"
                ? "bg-primary-light text-white font-bold"
                : " hover:bg-gray-100" // Highlight the button if the section is 'stats'
            }`}
            onClick={() => setSelectedSection("stats")} // Set the selected section to 'stats'
          >
            User Statistics
          </button>
        </nav>
      </aside>
      <main className="sm:flex-1 ">
        {" "}
        {/* Main content area */}
        <NavBar /> {/* Render the NavBar component */}
        <div className="my-4 shadow-xl border-gray-300">
          {" "}
          {/* Padding for the main content */}
          {/* Conditional rendering based on the selected section */}
          {selectedSection === "dashboard" && <DashboardGeneral />}{" "}
          {selectedSection === "users" && <MembersTable />}{" "}
          {/* Render MembersTable for the user list */}
          {selectedSection === "stats" && <Statistics />}{" "}
          {/* Render Statistics for user statistics */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; // Export the AdminDashboard component for use in other parts of the application
