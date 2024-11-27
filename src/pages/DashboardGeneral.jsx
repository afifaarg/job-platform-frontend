import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import StatisticsCards from "../components/StatisticscCards";
import MembersTable from "../components/MembersTable";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const usersData = [
  {
    uniqueId: "U1001",
    name: "Alice Johnson",
    experience: 8,
    joinedDate: "2020-03-15",
  },
  {
    uniqueId: "U1002",
    name: "Bob Smith",
    experience: 3,
    joinedDate: "2022-07-08",
  },
  {
    uniqueId: "U1003",
    name: "Charlie Brown",
    experience: 5,
    joinedDate: "2021-01-10",
  },
  {
    uniqueId: "U1004",
    name: "Diana Prince",
    experience: 10,
    joinedDate: "2018-06-24",
  },
  {
    uniqueId: "U1005",
    name: "Edward Carter",
    experience: 2,
    joinedDate: "2023-02-11",
  },
  {
    uniqueId: "U1006",
    name: "Fiona Davis",
    experience: 6,
    joinedDate: "2019-09-30",
  },
  {
    uniqueId: "U1007",
    name: "George Evans",
    experience: 1,
    joinedDate: "2023-11-01",
  },
  {
    uniqueId: "U1008",
    name: "Hannah White",
    experience: 7,
    joinedDate: "2017-04-18",
  },
  {
    uniqueId: "U1009",
    name: "Ian Black",
    experience: 4,
    joinedDate: "2021-12-05",
  },
  {
    uniqueId: "U1010",
    name: "Julia Green",
    experience: 9,
    joinedDate: "2015-08-22",
  },
];

// Dummy data
const orgsData = [
  {
    id: 1,
    name: "Tech Solutions",
    industry: "Technology",
    joinedDate: "2020-05-14",
    color: "#000066",
    jobs: [
      {
        id: "1a",
        title: "Software Engineer",
        status: "active",
        org: "Tech Solutions",
        redirects: 120,
      },
      {
        id: "1b",
        title: "Project Manager",
        status: "inactive",
        org: "Tech Solutions",
        redirects: 45,
      },
    ],
  },
  {
    id: 2,
    name: "Health First",
    industry: "Healthcare",
    joinedDate: "2019-03-01",
    color: "#333399",
    jobs: [
      {
        id: "2a",
        title: "Nurse",
        status: "active",
        redirects: 200,
        org: "Health First",
      },
      {
        id: "2b",
        title: "Doctor",
        status: "expired",
        redirects: 150,
        org: "Health First",
      },
      {
        id: "2c",
        title: "Lab Technician",
        status: "active",
        redirects: 80,
        org: "Health First",
      },
    ],
  },
  {
    id: 3,
    name: "EduCorp",
    industry: "Education",
    joinedDate: "2021-07-20",
    color: "#6666CC",
    jobs: [
      {
        id: "3a",
        title: "Teacher",
        status: "active",
        redirects: 100,
        org: "EduCorp",
      },
      {
        id: "3b",
        title: "Counselor",
        status: "inactive",
        redirects: 30,
        org: "EduCorp",
      },
    ],
  },
  {
    id: 4,
    name: "EcoBuild",
    industry: "Construction",
    joinedDate: "2022-02-15",
    color: "#9999FF",
    jobs: [
      {
        id: "4a",
        title: "Site Engineer",
        status: "active",
        org: "EcoBuild",
        redirects: 60,
      },
      {
        id: "4b",
        title: "Safety Officer",
        status: "expired",
        org: "EcoBuild",
        redirects: 40,
      },
    ],
  },
  {
    id: 5,
    name: "MediaWorks",
    industry: "Media",
    joinedDate: "2018-11-10",
    color: "#CCCCFF",
    jobs: [
      {
        id: "5a",
        title: "Video Editor",
        status: "active",
        org: "MediaWorks",
        redirects: 70,
      },
      {
        id: "5b",
        title: "Content Writer",
        status: "inactive",
        org: "MediaWorks",
        redirects: 50,
      },
    ],
  },
];

export default function DashboardGeneral() {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState(orgsData);
  const [activeTabDashbaord, setActiveTabDashbaord] = useState(1);
  useEffect(() => {
    axios
      .post(
        "https://job-platform-api-1.onrender.com/backendAPI/fetchUsersList/"
      )
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data.user_data;
          setUsers(userData);
          console.log(userData);
          localStorage.setItem(
            "allUsers",
            JSON.stringify(response.data.user_data.all_users)
          );
        }
      })
      .catch((error) => {
        alert("Invalid credentials. Please try again.");
      });

    const storedUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
  }, []);

  // Calculate stats
  const totalUsers = users.length;
  const totalOrganizations = organizations.length;
  const activeOrganizations = organizations.filter((org) =>
    org.jobs.some((job) => job.status === "active")
  ).length;
  const totalJobs = organizations.reduce(
    (total, org) => total + org.jobs.length,
    0
  );
  const jobRedirects = organizations
    .flatMap((org) => org.jobs)
    .reduce((total, job) => total + job.redirects, 0);

  // Generate dummy data for charts
  // Generate jobs per month (dummy data)
  const jobsPerMonthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Jobs Posted",
        data: [45, 60, 80, 55, 70, 90, 85, 75, 60, 95, 100, 110], // Hardcoded data for the number of jobs posted per month
        backgroundColor: "#000066",
        borderColor: "#000066",
        borderWidth: 2,
      },
    ],
  };

  // Generate organizations per month (dummy data)
  const orgsPerMonthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Organizations Registered",
        data: [3, 5, 4, 7, 6, 9, 8, 10, 12, 15, 14, 18], // Hardcoded data for the number of organizations registered per month
        backgroundColor: "#000066",
        borderColor: "#000066",
        borderWidth: 2,
      },
    ],
  };
  const colors = orgsData.map((org) => org.color);
  // Jobs per industry
  const jobsPerIndustryData = {
    labels: [...new Set(organizations.map((org) => org.industry))],
    datasets: [
      {
        label: "Jobs by Industry",
        data: [50, 30, 15, 25, 10], // Hardcoded data for jobs by industry
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const filteredJobs = organizations.flatMap((org) => org.jobs);
  const TABS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "In-active", value: "inactive" },
    { label: "Expired", value: "expired" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const filteredRows = filteredJobs.filter((row) => {
    const matchesSearch = row.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = activeTab === "all" || row.status === activeTab;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const displayedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const industryCounts = orgsData.reduce((acc, org) => {
    acc[org.industry] = (acc[org.industry] || 0) + 1;
    return acc;
  }, {});

  const industries = Object.keys(industryCounts);
  const counts = Object.values(industryCounts);

  const chartData = {
    labels: industries,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const optionsOrg = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const industry = industries[tooltipItem.dataIndex];
            const count = counts[tooltipItem.dataIndex];
            return `${industry}: ${count}`;
          },
        },
      },
    },
  };
  return (
    <>
      <div className="w-full">
        <StatisticsCards />
      </div>
      <div className=" min-h-screen p-4 text-gray-800">
        {/* Summary Cards */}

        <div className="flex bg-white border-b-2 mt-4  border-gray-300">
          <span
            onClick={() => setActiveTabDashbaord(1)}
            className={`px-4 cursor-pointer py-2 mr-2 ${
              activeTabDashbaord === 1
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-gray-800 font-bold"
            }`}
          >
            Users Metrics
          </span>
          <span
            onClick={() => setActiveTabDashbaord(2)}
            className={`px-4 cursor-pointer py-2 mr-2 ${
              activeTabDashbaord === 2
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-gray-800 font-bold"
            }`}
          >
            Organization Metrics
          </span>
          <span
            onClick={() => setActiveTabDashbaord(3)}
            className={`px-4 cursor-pointer py-2 mr-2 ${
              activeTabDashbaord === 3
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-gray-800 font-bold"
            }`}
          >
            Jobs Metrics
          </span>
        </div>

        {/* Users Section */}
        {activeTabDashbaord == 1 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-4 py-8 rounded-lg shadow-md max-h-96">
                <h4 className="text-lg font-semibold">Users per Month</h4>
                <Line data={jobsPerMonthData} options={options} />
              </div>
            </div>
            <div className="mt-4 bg-white shadow-lg rounded-xl p-4">
              <h4 className="text-xl capitalize py-2 font-semibold">
                Users List{" "}
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Years of Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unique ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {usersData.map((user) => (
                      <tr key={user.uniqueId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.experience} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.uniqueId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Organizations Section */}
        {activeTabDashbaord == 2 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg py-8 shadow-md max-h-96">
                <h4 className="text-lg font-semibold">
                  Organizations per Month
                </h4>
                <Line data={orgsPerMonthData} options={options} />
              </div>
              <div className="bg-white p-4 rounded-lg py-8 shadow-md max-h-96">
                <h4 className="text-lg font-semibold">
                  Organizations Registered
                </h4>
                <Doughnut data={chartData} options={optionsOrg} />
              </div>
            </div>
            <div className="mt-4 bg-white shadow-lg rounded-xl p-4">
              <h4 className="text-xl capitalize py-2 font-semibold">
                Organizations List{" "}
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Number Posted Jobs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {orgsData.map((org) => (
                      <tr key={org.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {org.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {org.industry}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {org.jobs?.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(org.joinedDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {activeTabDashbaord == 3 && (
          <div className="mb-8 mt-4  bg-white rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg py-8 shadow-md max-h-96">
                <h4 className="text-lg font-semibold">Jobs per Month</h4>
                <Bar
                  className="h-80"
                  data={jobsPerMonthData}
                  options={options}
                />
              </div>
              <div className="bg-white p-4 rounded-lg py-8 shadow-md max-h-96">
                <h4 className="text-lg font-semibold">Jobs by Industry</h4>
                <Doughnut data={jobsPerIndustryData} options={options} />
              </div>
            </div>
            {/* Jobs Table with Filter */}
            <div className="w-full h-full mt-8 bg-gray-50 shadow-lg rounded-lg">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                      Jobs list
                    </h1>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex gap-2">
                    {TABS.map(({ label, value }) => (
                      <button
                        key={value}
                        className={`py-2 px-4 rounded-lg ${
                          activeTab === value
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => {
                          setActiveTab(value);
                          setCurrentPage(1);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Job"
                    value={searchTerm}
                    className="border border-gray-300 rounded-lg p-2 w-full sm:w-72"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Redirects
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedRows.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.org}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span
                            className={`text-sm mx-auto text-center ${
                              job.status === "active"
                                ? "bg-green-100 border px-1 rounded-xl border-green-500 text-green-500"
                                : job.status === "inactive"
                                ? " bg-yellow-100 border px-1 rounded-xl border-yellow-500 text-yellow-500"
                                : "bg-red-100 border px-1 rounded-xl border-red-500 text-red-500"
                            }`}
                          >
                            {job.status.charAt(0).toUpperCase() +
                              job.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.redirects}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
