import { useState, useEffect } from 'react';
import OverviewCard from './OverviewCard';
import axios from 'axios';

const OverviewSection = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) throw new Error('User not authenticated');

        const response = await axios.get(
          'http://localhost:3000/api/v1/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data.user); // Set the fetched user data
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Data for the OverviewCard components
  const data = {
    applications: {
      title: 'Total Applications',
      type: 'total',
    },
    rejected: {
      title: 'Applications Rejected',
      data: 30, // Placeholder, update as needed
      type: 'rejected',
    },
    pending: {
      title: 'Pending Applications',
      data: 20, // Placeholder, update as needed
      type: 'pending',
    },
    earning: {
      title: 'Money Earned',
      type: 'earning',
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow shadow-gray-300">
      <h1 className="p-5 text-4xl font-medium">Overview</h1>
      <div className="grid grid-cols-1 justify-start sm:grid-cols-2 md:grid-cols-4">
        {/* Total Applications Card */}
        <OverviewCard
          {...data.applications}
          data={user.noOfApplications} // Pass total applications data
        />
        {/* Rejected Applications Card */}
        <OverviewCard
          {...data.rejected}
          data={data.rejected.data} // Pass rejected applications data (you can fetch this dynamically)
        />
        {/* Pending Applications Card */}
        <OverviewCard
          {...data.pending}
          data={data.pending.data} // Pass pending applications data (you can fetch this dynamically)
        />
        {/* Earnings Card */}
        <OverviewCard
          {...data.earning}
          data={user.balance} // Pass balance data (earnings)
        />
      </div>
    </div>
  );
};

export default OverviewSection;
