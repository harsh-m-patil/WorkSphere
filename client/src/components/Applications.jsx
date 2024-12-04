import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { ApplicationListElement } from './ApplicationListElement';

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
        <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="mb-1 flex animate-pulse items-center text-3xl font-extrabold tracking-tight">
            My Applications
            <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-purple-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
              {filteredAppls?.length}
            </span>
          </h2>
        </div>
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
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-1 flex items-center text-3xl font-extrabold tracking-tight">
          My Applications
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-purple-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
            {filteredAppls?.length}
          </span>
        </h2>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-3">ID</th>
              <th className="border border-gray-300 px-4 py-3">Title</th>
              <th className="border border-gray-300 px-4 py-3">Pay</th>
              <th className="border border-gray-300 px-4 py-3">Status</th>
              <th className="border border-gray-300 px-4 py-3">Action</th>
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
