import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { API_URL } from '../utils/constants';

export default function TransactionChart() {
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

  // Map the monthly user and job stats into the data format required for the chart
  const chartData = stats
    ? stats.monthlyWorkStats.map((item) => ({
        name: `${item._id.month}-${item._id.year}`, // Use month-year for the label
        users: item.monthlyUsers, // The number of users for the month
        jobs: item.totalJobs, // The number of jobs for the month
        freelancers: item.monthlyUsers, // Assuming freelancers is equivalent to users in this case
        totalPay: item.totalPay, // Total pay for the month
      }))
    : [];

  return (
    <div
      style={{ height: '600px', width: '100%' }}
      className="rounded-sm border border-gray-200 bg-white p-8"
    >
      <strong className="text-2xl font-medium text-gray-700">
        Freelancers vs Jobs
      </strong>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData} // Use dynamically fetched data
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jobs" fill="#6C63FF" /> {/* Purple Blue for Jobs */}
          <Bar dataKey="freelancers" fill="#FFC75F" />{' '}
          {/* Soft Yellow for Freelancers */}
          {/* <Bar dataKey="totalPay" fill="#ff7300" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
