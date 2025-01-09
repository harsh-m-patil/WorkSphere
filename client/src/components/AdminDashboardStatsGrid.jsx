import { useState, useEffect } from 'react';
import { IoBagHandle } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { FcBusinessman } from 'react-icons/fc';
import { FcGraduationCap } from 'react-icons/fc';
import axios from 'axios';
import { API_URL } from '../utils/constants.js';

function DashboardStatsGrid() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/app/info/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <BoxWrapper bgColor="bg-sky-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500">
          <IoBagHandle className="text-4xl text-white" />
        </div>
        <div className="pl-6">
          <span className="text-lg font-light text-gray-500">
            Total Earnings
          </span>
          <div>
            <strong className="text-3xl">
              ${' '}
              {stats && stats.workStats && stats.workStats.length > 0
                ? (stats.workStats[0].totalPay * 0.1).toFixed(2) // Calculate 10% and format to 2 decimal places
                : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper bgColor="bg-orange-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
          <HiOutlineUsers className="text-4xl text-white" />
        </div>
        <div className="pl-6">
          <span className="text-lg font-light text-gray-500">
            Total Freelancers
          </span>
          <div>
            <strong className="text-3xl">
              {stats
                ? getUserStat('freelancer', stats.userStats)
                : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper bgColor="bg-green-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <FcBusinessman className="text-4xl text-white" />
        </div>
        <div className="pl-6">
          <span className="text-lg font-light text-gray-500">
            Total Clients
          </span>
          <div>
            <strong className="text-3xl">
              {stats ? getUserStat('client', stats.userStats) : 'Loading...'}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper bgColor="bg-purple-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
          <FcGraduationCap className="text-4xl text-white" />
        </div>
        <div className="pl-6">
          <span className="text-lg font-light text-gray-500">Total Jobs</span>
          <div>
            <strong className="text-3xl">
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

function BoxWrapper({ children, bgColor }) {
  return (
    <div
      className={`flex h-40 w-80 flex-shrink-0 items-center rounded-xl border border-gray-200 ${bgColor} transform p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
    >
      {children}
    </div>
  );
}
