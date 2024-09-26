import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/app/info/users",
          {
            withCredentials: true,
          },
        );
        setStats(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // Helper function to get new users stat by type (client, freelancer)
  const getUserStat = (type, statArray) => {
    const stat = statArray.find((item) => item._id === type);
    return stat ? stat.newUsers : 0;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="p-4">
          <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">Analytics Overview</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-white p-4 shadow-md">
                <h2 className="text-xl font-bold">New Clients</h2>
                <p className="mt-4 text-2xl font-bold">
                  {stats
                    ? getUserStat("client", stats.newUserStats)
                    : "Loading..."}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                <h2 className="text-xl font-bold">New Freelancers</h2>
                <p className="mt-4 text-2xl font-bold">
                  {stats
                    ? getUserStat("freelancer", stats.newUserStats)
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
