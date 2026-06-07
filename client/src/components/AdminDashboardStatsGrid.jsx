import { useState, useEffect } from 'react';
import { IoBagHandle } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { FcBusinessman } from 'react-icons/fc';
import { FcGraduationCap } from 'react-icons/fc';
import { FaDollarSign, FaRupeeSign } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../utils/constants.js';

function DashboardStatsGrid() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch user stats
        const userResponse = await axios.get(`${API_URL}/app/info/users`, {
          headers,
        });

        // Fetch revenue data
        const revenueResponse = await axios.get(`${API_URL}/app/revenue`, {
          headers,
        });

        setStats(userResponse.data.data);
        setRevenue(revenueResponse.data.totalRevenue);
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
    <div className="flex flex-wrap justify-center gap-6">
      <BoxWrapper bgColor="bg-blue-50">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Worth of Jobs
            </span>
            <div className="text-xl font-bold text-gray-700">
              ₹{' '}
              {stats && stats.workStats && stats.workStats.length > 0
                ? stats.workStats[0].totalPay
                : 'Loading...'}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <IoBagHandle className="text-2xl text-blue-600" />
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper bgColor="bg-green-50">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Revenue from subscribers
            </span>
            <div className="text-xl font-bold text-gray-700">
              ₹ {revenue !== null ? revenue.toLocaleString() : 'Loading...'}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <FaRupeeSign className="text-2xl text-green-600" />
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper bgColor="bg-purple-50">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Freelancers
            </span>
            <div className="text-xl font-bold text-gray-700">
              {stats
                ? getUserStat('freelancer', stats.userStats)
                : 'Loading...'}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <FcGraduationCap className="text-2xl" />
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper bgColor="bg-orange-50">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Clients
            </span>
            <div className="text-xl font-bold text-gray-700">
              {stats ? getUserStat('client', stats.userStats) : 'Loading...'}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <FcBusinessman className="text-2xl" />
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper bgColor="bg-yellow-50">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">
              Total Active Jobs
            </span>
            <div className="text-xl font-bold text-gray-700">
              {stats && stats.workStats && stats.workStats.length > 0
                ? stats.workStats[0].totalTasks
                : 'Loading...'}
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <HiOutlineUsers className="text-2xl text-yellow-600" />
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children, bgColor }) {
  return (
    <div
      className={`flex h-40 w-80 flex-shrink-0 items-center rounded-xl border border-gray-200 ${bgColor} transform p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
    >
      {children}
    </div>
  );
}

export default DashboardStatsGrid;
