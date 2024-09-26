import { useEffect, useState } from "react";
import Sidebar from "../components/UserSideBar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { FaDollarSign, FaUser, FaBriefcase } from "react-icons/fa"; // Importing icons

const UserDashboardWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchWork() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        setWorks(response.data?.data?.user?.works || []); // Optional chaining to safely access works
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load works. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchWork();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-[#2f9c95]">Loading user data...</p>
      </div>
    ); // Loading state UI
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    ); // Error state UI
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">My Works</h2>
        {works.length === 0 ? (
          <p className="text-lg text-gray-500">No works available</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <div
                key={work._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
              >
                <h3 className="mb-3 text-2xl font-bold text-gray-800">
                  {work.title || "Untitled Work"}
                </h3>
                <p className="mb-4 text-gray-600">
                  {work.description || "No description available"}
                </p>

                <div className="mb-3 flex items-center justify-between text-gray-500">
                  <div className="flex items-center">
                    <FaBriefcase className="mr-2" />
                    <span>Job Level: {work.joblevel || "Unknown"}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2" />
                    <span>Pay: ${work.pay || "N/A"}</span>
                  </div>
                </div>

                <div className="mb-3 flex items-center text-sm text-gray-500">
                  <span
                    className={`mr-2 ${work.active ? "text-green-600" : "text-red-500"}`}
                  >
                    Status: {work.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <FaUser className="mr-2" />
                  <span>
                    Client: {work.client_id.userName || "Unknown Client"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardWorks;
