import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function PayChart() {
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

  // Map the monthly user and job stats into the data format required for the chart
  const chartData = stats
    ? stats.monthlyWorkStats.map((item) => ({
        name: `${item._id.month}-${item._id.year}`, // Use month-year for the label
        users: item.monthlyUsers, // The number of users for the month
        jobs: item.totalJobs, // The number of jobs for the month
        customers: item.monthlyUsers, // Assuming customers is equivalent to users in this case
        totalPay: item.totalPay, // Total pay for the month
      }))
    : [];

  return (
    <>
      <div
        style={{ height: '700px', width: '100%' }}
        className="rounded-sm border border-gray-200 bg-white p-7"
      >
        <strong className="text-2xl font-normal text-gray-700">
          Total pay given to freelancers each month in $
        </strong>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData} // Use dynamically fetched data
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Replace Bar with Line */}
            <Line type="monotone" dataKey="totalPay" stroke="#ff7300" />
            {/* You can add more Line components for other metrics like jobs, customers */}
            {/* <Line type="monotone" dataKey="jobs" stroke="#0ea5e9" /> */}
            {/* <Line type="monotone" dataKey="customers" stroke="#0ea580" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
