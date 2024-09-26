import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";

const Dashboard = () => {
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

  // Helper function to get stats by type (client, freelancer)
  const getUserStat = (type, statArray) => {
    const stat = statArray.find((item) => item._id === type);
    return stat ? stat.totalUsers : 0;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        {/* <Navbar /> */}
        <div className="p-4"></div>
        <div className="p-6">
          <h1 className="mb-6 text-3xl font-bold">Dashboard Overview</h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-bold">Total Clients</h2>
              <p className="mt-4 text-2xl font-bold">
                {stats ? getUserStat("client", stats.userStats) : "Loading..."}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-bold">Total Freelancers</h2>
              <p className="mt-4 text-2xl font-bold">
                {stats
                  ? getUserStat("freelancer", stats.userStats)
                  : "Loading..."}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h2 className="text-xl font-bold">Total Tasks</h2>
              <p className="mt-4 text-2xl font-bold">
                {stats && stats.workStats && stats.workStats.length > 0
                  ? stats.workStats[0].totalTasks
                  : "Loading..."}
              </p>
            </div>
          </div>

          {/* Placeholder for Recent Activities */}
          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">Recent Activities</h2>
            <ul className="rounded-lg bg-white p-4 shadow-md">
              <li className="border-b py-2">
                This section can be updated once more data is available.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
