// src/components/Jobs.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/work');
        const data = await response.json();

        console.log('Fetched Jobs:', data); // Add this to see the fetched jobs
        setJobs(data.data.works); // Update the jobs state with the fetched data
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
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">
        Manage Jobs
        <span className="rounded-xl bg-white px-3">{jobs.length}</span>
      </h2>
      {jobs.length > 0 ? (
        <table className="min-w-full overflow-scroll rounded-lg bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Job ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Client</th>
              <th className="px-4 py-2 text-left text-gray-600">Pay</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="px-4 py-2 text-gray-700">{job._id}</td>
                <td className="px-4 py-2 text-gray-700">{job.title}</td>
                <td className="px-4 py-2 text-gray-700">
                  {job.client_id ? job.client_id?.userName : "Deleted User"}
                </td>
                <td className="px-4 py-2 text-gray-700">{job.pay}</td>
                <td className="px-4 py-2 text-gray-700">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
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
