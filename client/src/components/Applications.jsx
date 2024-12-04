import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { ApplicationListElement } from './ApplicationListElement';
import UserDashboardHeader from './UserDashboardHeader';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredAppls, setFilteredAppls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('id'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) throw new Error('User not authenticated');

        const response = await axios.get(
          'http://localhost:3000/api/v1/users/applications',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );

        setApplications(response.data.data.works || []); // Update applications from API
        setFilteredAppls(response.data.data.works || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const cancelApplication = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      await axios.delete(
        `http://localhost:3000/api/v1/users/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Application with ID ${id} has been canceled.`);
      setApplications((prev) => prev.filter((appl) => appl._id !== id));
      setFilteredAppls((prev) => prev.filter((appl) => appl._id !== id));
    } catch (err) {
      alert(`Failed to cancel application: ${err.message}`);
    }
  };

  const handleSearch = (query) => {
    const filtered = applications.filter((appl) =>
      appl.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAppls(filtered);
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-50 p-10 shadow">
        <UserDashboardHeader title="My Applications" array={filteredAppls} />
        <SearchBar onSearch={handleSearch} />
        <div className="flex w-full place-items-center justify-center overflow-x-auto rounded-lg shadow">
          <h1 className="3xl text-center">Loading Data</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-50 p-10 shadow">
      <UserDashboardHeader title="My Applications" array={filteredAppls} />
      <SearchBar onSearch={handleSearch} />
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200 text-lg uppercase text-gray-700">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left font-semibold">
                ID
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left font-semibold">
                Title
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left font-semibold">
                Pay
              </th>
              <th className="border border-gray-300 px-6 py-3 text-center font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-6 py-3 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppls.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  No Applications Found
                </td>
              </tr>
            ) : (
              filteredAppls.map((appl) => (
                <ApplicationListElement
                  appl={appl}
                  key={appl._id}
                  cancelApplication={cancelApplication}
                  userId={id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
