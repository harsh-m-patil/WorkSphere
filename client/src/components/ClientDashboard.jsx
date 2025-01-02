import { useEffect, useState } from 'react';
import axios from 'axios';
import ClientProfileSection from './ClientProfileSection';
import ClientSeeWork from './ClientSeeWork';
import ClientSideBar from './ClientSideBar';
import { API_URL } from '../utils/constants';

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');

        const response = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(response.data.data.user);
        setLoading(false);
      } catch (err) {
        console.err(err);
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-[#2f9c95]">Loading user data...</p>
      </div>
    ); // Loading state UI
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ClientSideBar client={client} />
      {/* Main content */}
      <div className="flex w-full flex-col bg-gray-50 p-6">
        <div className="flex justify-between">
          {/* Profile Section*/}
          <ClientProfileSection client={client} />

          {/* path for work posted Section */}
          <ClientSeeWork client={client} />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
