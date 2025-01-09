import { useState, useEffect } from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import { FcBusinessman } from 'react-icons/fc';
import axios from 'axios';
import PayChart from './AdminPayChart';
import { API_URL } from '../utils/constants';

function Analytics() {
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

  // Helper function to get new users stat by type (client, freelancer)
  const getUserStat = (type, statArray) => {
    const stat = statArray.find((item) => item._id === type);
    return stat ? stat.newUsers : 0;
  };

  return (
    <div className="grid grid-cols-2 p-10">
      <div className="flex w-full flex-col gap-10 p-1 pl-20">
        <BoxWrapper bgColor="bg-orange-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
            <HiOutlineUsers className="text-4xl text-white" />
          </div>
          <div className="pl-6">
            <span className="text-lg font-light text-gray-500">
              New Customers
            </span>
            <div>
              <strong className="text-3xl">
                {stats
                  ? getUserStat('freelancer', stats.newUserStats)
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
              New Clients
            </span>
            <div>
              <strong className="text-3xl">
                {stats
                  ? getUserStat('client', stats.newUserStats)
                  : 'Loading...'}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div>
        <PayChart />
      </div>
    </div>
  );
}

export default Analytics;

function BoxWrapper({ children, bgColor }) {
  return (
    <div
      className={`flex h-80 w-80 flex-shrink-0 items-center rounded-xl border border-gray-200 ${bgColor} transform p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
    >
      {children}
    </div>
  );
}
