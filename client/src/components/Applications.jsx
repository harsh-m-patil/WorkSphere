import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { ApplicationListElement } from './ApplicationListElement';

const Applications = () => {
  const applications = [
    {
      _id: 1,
      title: 'Website Development for E-commerce Store',
      pay: 1500,
      status: 'Accepted',
    },
    {
      _id: 2,
      title: 'Mobile App Design (UI/UX)',
      pay: 800,
      status: 'Pending',
    },
    {
      _id: 3,
      title: 'SEO Optimization for Blog Website',
      pay: 600,
      status: 'Rejected',
    },
    {
      _id: 4,
      title: 'Social Media Marketing Campaign',
      pay: 500,
      status: 'Pending',
    },
    {
      _id: 5,
      title: 'Logo Design for Tech Startup',
      pay: 200,
      status: 'Accepted',
    },
    {
      _id: 6,
      title: 'Custom WordPress Plugin Development',
      pay: 1200,
      status: 'Rejected',
    },
    {
      _id: 7,
      title: 'Data Analysis for Financial Report',
      pay: 1000,
      status: 'Pending',
    },
    {
      _id: 8,
      title: 'Email Marketing Campaign Setup',
      pay: 300,
      status: 'Accepted',
    },
    {
      _id: 9,
      title: 'Content Writing for Travel Blog',
      pay: 400,
      status: 'Pending',
    },
    {
      _id: 10,
      title: 'Video Editing for Promotional Video',
      pay: 700,
      status: 'Accepted',
    },
  ];

  const [filteredAppls, setFilteredAppls] = useState(applications);

  const cancelApplication = (id) => {
    alert(`Application with ID ${id} has been canceled.`);
    // Add actual logic to cancel the application here
  };

  const handleSearch = (query) => {
    const filtered = applications.filter((appl) =>
      appl.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAppls(filtered);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-50 p-10 shadow">
        <h1 className="text-3xl font-bold text-gray-700">Applications</h1>
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
                    colSpan="4"
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
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Applications;
