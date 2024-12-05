// src/components/Jobs.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { toast } from 'sonner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/work');
        const data = await response.json();

        setJobs(data.data.works); // Update the jobs state with the fetched data
        setFilteredJobs(data.data.works);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchJobs();
  }, []);

  // Function to delete a job
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/work/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the jobs list after deletion
      setJobs(jobs.filter((job) => job._id !== id));
      setFilteredJobs(jobs.filter((job) => job._id !== id));

      toast.success('Deleted Job Sucessfully', { position: 'top-center' });
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (query) => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="p-6">
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-4 flex items-center text-3xl font-extrabold tracking-tight">
          Available Jobs -
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-cyan-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
            {jobs.length}
          </span>
        </h2>
      </div>

      <SearchBar onSearch={handleSearch} />
      {filteredJobs.length > 0 ? (
        <table className="min-w-full overflow-scroll rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200 text-gray-900 shadow-md">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Job ID</th>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Client</th>
              <th className="px-6 py-3 text-left font-semibold">Pay</th>
              <th className="px-6 py-3 text-left font-semibold">Assigned</th>
              <th className="px-6 py-3 text-left font-semibold">CreatedAt</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="px-4 py-2 text-gray-700">{job._id}</td>
                <td className="px-4 py-2 text-gray-700">{job.title}</td>
                <td className="px-4 py-2 text-gray-700">
                  {job.client_id ? job.client_id?.userName : 'Deleted User'}
                </td>
                <td className="px-4 py-2 text-gray-700">{job.pay}</td>
                <td className="px-4 py-2 text-gray-700">
                  {job.freelancer_id
                    ? job.freelancer_id
                    : 'UnAssigned'}
                </td>
                <td className="px-4 py-2 text-gray-700">{job.createdAt}</td>
                <td className="px-4 py-2 text-gray-700">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="transform rounded-lg bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-red-500 hover:to-pink-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No jobs available.</div>
      )}
    </div>
  );
};

export default Jobs;
