import React, { useState } from "react"; // Import React and useState hook
import Statistics from "../components/UserStats"; // Import the UserStats component for displaying user statistics
import MembersTable from "../components/MembersTable"; // Import the MembersTable component for displaying the user list
import NavBar from "../components/Navbar"; // Import the NavBar component for the main navigation

// AdminDashboard component to manage the admin interface
const AdminDashboard = () => {
  // State to manage the active section of the dashboard (default is 'users')
  const [selectedSection, setSelectedSection] = useState("users");
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
    <div className="min-h-screen flex bg-secondary">
      {" "}
      {/* Main container with a minimum height and flex layout */}
      {/* Sidebar */}
      <aside
        className={`py-8 w-64 z-10 bg-primary-dark text-white flex flex-col p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full" // Conditional class for showing/hiding the sidebar
        } md:translate-x-0`} // Sidebar remains visible on medium screens and up
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>{" "}
        {/* Dashboard title */}
        <nav className="flex flex-col space-y-4 mt-4">
          {" "}
          {/* Navigation menu */}
          <button
            className={`py-2 px-4 text-left rounded-lg hover:bg-primary-light ${
              selectedSection === "users" ? "bg-primary-light" : "" // Highlight the button if the section is 'users'
            }`}
            onClick={() => setSelectedSection("users")} // Set the selected section to 'users'
          >
            User List
          </button>
          <button
            className={`py-2 px-4 text-left rounded-lg hover:bg-primary-light ${
              selectedSection === "stats" ? "bg-primary-light" : "" // Highlight the button if the section is 'stats'
            }`}
            onClick={() => setSelectedSection("stats")} // Set the selected section to 'stats'
          >
            User Statistics
          </button>
        </nav>
      </aside>
      <main className="sm:flex-1 bg-secondary-light">
        {" "}
        {/* Main content area */}
        <NavBar /> {/* Render the NavBar component */}
        <div className="p-6">
          {" "}
          {/* Padding for the main content */}
          {/* Conditional rendering based on the selected section */}
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
