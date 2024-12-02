import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { ApplicationListElement } from './ApplicationListElement';
import { applications } from '../dummydata/applications';

const Applications = () => {
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
