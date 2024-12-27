import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientSideBar from './ClientSideBar';
import { API_URL } from '../../utils/constants';

const ClientWorksPosted = () => {
  const location = useLocation();

  // Get the client details passed by navigate
  const { client } = location.state || {};

  const [WorksByMe, setWorksByMe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientWorks() {
      const response = await axios.post(`${API_URL}/work/myworks`, {
        clientId: client._id,
      });
      console.log(response.data.data.works);
      setWorksByMe(response.data.data.works);
    }

    fetchClientWorks();
  }, [client]);

  const handleGoIn = (work) => {
    navigate('/client/dashboard/works/single', {
      state: { work },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Bar */}
      <ClientSideBar client={client} />
      {/* Main content */}
      <div className="flex-grow p-10">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Works Posted By {client?.firstName} {client?.lastName}
        </h2>

        {/* Check if works are loaded */}
        {WorksByMe.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {WorksByMe.map((work) => (
              <div
                key={work._id}
                className="group cursor-pointer rounded-lg border border-gray-200 bg-slate-200 p-6 shadow-md transition-shadow hover:shadow-lg"
                onClick={() => handleGoIn(work)}
              >
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{work.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    <strong>Level:</strong> {work.joblevel}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Pay:</strong> ${work.pay}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Skills Required:</strong>{' '}
                    {work.skills_Required.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Freelancers Applied:</strong>{' '}
                    {work.applied_status.length}
                  </p>
                  <p
                    className={`text-sm font-medium ${work.active ? 'text-green-600' : 'text-red-600'}`}
                  >
                    <strong>Status:</strong>{' '}
                    {work.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No works posted by this client yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientWorksPosted;
