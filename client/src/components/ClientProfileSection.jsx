// import profileImage from "../assets/profile.jpg"; // Placeholder profile image
import { useEffect, useState } from 'react';
import OverviewCard from './OverviewCard';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const ClientProfileSection = ({ client }) => {
  const [myworks, setmyWorks] = useState([]);

  useEffect(() => {
    async function fetchMyWorks() {
      const response = await axios.post(`${API_URL}/work/myworks`, {
        clientId: client._id,
      });
      console.log(response.data.data.works);
      setmyWorks(response.data.data.works);
    }

    fetchMyWorks();
  }, [client._id]);

  return (
    <div className="w-full rounded-md bg-white p-6 shadow-md lg:flex lg:space-x-6">
      {/* Profile Section */}
      <div className="p-4 lg:w-1/2">
        <div className="flex items-center space-x-4">
          {/* Profile Photo */}
          <img
            src="/vite.svg"
            alt={client.firstName}
            className="h-16 w-16 rounded-full object-cover"
          />
          {/* Client Information */}
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {client.firstName} {client.lastName}
            </h2>
            <p className="text-sm text-gray-600">@{client.userName}</p>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700">About</h3>
          <p className="text-sm text-gray-600">
            {client.description || 'No description provided'}
          </p>
        </div>

        {/* Ratings Section */}
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700">Ratings</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-800">
              {client.ratingsAverage}
            </span>
            <span className="text-sm text-gray-500">
              ({client.noOfRatings} ratings)
            </span>
          </div>
        </div>

        {/* Balance and Role */}
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700">Account Info</h3>
          <p className="text-sm text-gray-600">Role: {client.role}</p>
        </div>
      </div>
      <div className="rounded-md bg-gray-50 p-5 shadow-inner lg:w-1/2">
        <OverviewCard title="Balance" data={client.balance} type="earning" />
        <OverviewCard
          title="No.of Jobs Posted"
          data={myworks.length}
          type="total"
        />
      </div>
    </div>
  );
};

export default ClientProfileSection;
