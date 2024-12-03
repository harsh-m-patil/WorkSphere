import { useState, useEffect } from 'react';
import { IoBagHandle } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { FcBusinessman } from 'react-icons/fc';
import { FcGraduationCap } from 'react-icons/fc';
import axios from 'axios';

function DashboardStatsGrid() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/v1/app/info/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
    <div className="flex w-full gap-4">
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Sales</span>
          <div>
            <strong>
              {stats ? getUserStat('client', stats.userStats) : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
          <HiOutlineUsers className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Customers
          </span>
          <div>
            <strong>
              {stats
                ? getUserStat('freelancer', stats.userStats)
                : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
          <FcBusinessman className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Clients
          </span>
          <div>
            <strong>
              {stats ? getUserStat('client', stats.userStats) : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500">
          <FcGraduationCap className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Jobs</span>
          <div>
            <strong>
              {stats && stats.workStats && stats.workStats.length > 0
                ? stats.workStats[0].totalTasks
                : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="flex flex-1 items-center rounded-sm border border-gray-200 bg-white p-4">
      {children}
    </div>
  );
}
