import { useState, useEffect } from 'react';
import OverviewCard from './OverviewCard';
import axios from 'axios';
import UserDashboardHeader from './UserDashboardHeader';
import { API_URL } from '../../utils/constants';

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

        const response = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.data.user); // Set the fetched user data
        setLoading(false);
      } catch (err) {
        console.err(err);
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
    pending: {
      title: 'Rejected Or Pending',
      data: 30, // Placeholder, update as needed
      type: 'rejected',
    },
    accepted: {
      title: 'Accepted Applications',
      data: 20, // Placeholder, update as needed
      type: 'pending',
    },
    earning: {
      title: 'Money Earned',
      type: 'earning',
    },
  };

  if (loading) {
    <div className="rounded-2xl bg-white p-5 shadow shadow-gray-300">
      <h1 className="p-5 text-4xl font-medium">Overview</h1>
      <div className="grid animate-pulse grid-cols-1 justify-start sm:grid-cols-2 md:grid-cols-4">
        {/* Total Applications Card */}
        <OverviewCard
          {...data.applications}
          data={0} // Pass total applications data
        />
        {/* Rejected Applications Card */}
        <OverviewCard
          {...data.pending}
          data={0} // Pass rejected applications data (you can fetch this dynamically)
        />
        {/* Pending Applications Card */}
        <OverviewCard
          {...data.accepted}
          data={0} // Pass pending applications data (you can fetch this dynamically)
        />
        {/* Earnings Card */}
        <OverviewCard
          {...data.earning}
          data={0} // Pass balance data (earnings)
        />
      </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow shadow-gray-300">
      <UserDashboardHeader title="My Profile" />
      <div className="grid grid-cols-1 justify-start sm:grid-cols-2 md:grid-cols-4">
        {/* Total Applications Card */}
        <OverviewCard
          {...data.applications}
          data={user.noOfApplications} // Pass total applications data
        />
        {/* Rejected Applications Card */}
        <OverviewCard
          {...data.pending}
          data={`${user.noOfApplications - user.works?.length}`} // Pass rejected applications data (you can fetch this dynamically)
        />
        {/* Pending Applications Card */}
        <OverviewCard
          {...data.accepted}
          data={user.works?.length} // Pass pending applications data (you can fetch this dynamically)
        />
        {/* Earnings Card */}
        <OverviewCard
          {...data.earning}
          data={`$ ${user.balance}`} // Pass balance data (earnings)
        />
      </div>
    </div>
  );
};

export default OverviewSection;
