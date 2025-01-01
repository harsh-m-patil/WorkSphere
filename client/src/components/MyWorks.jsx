import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar';
import { MyWorksListElement } from './MyWorksListElement';
import UserDashboardHeader from './UserDashboardHeader';

const MyWorks = () => {
  const { user } = useSelector((state) => state.auth);
  const works = user.works;
  const [filteredWorks, setFilteredWorks] = useState([]);

  useEffect(() => {
    const acceptedWorks = works.filter((work) => work);
    setFilteredWorks(acceptedWorks);
  }, [works]);

  const handleSearch = (query) => {
    const filtered = works.filter((work) =>
      work.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorks(filtered);
  };

  // Custom component for mobile view of work items
  const MobileWorkCard = ({ work }) => (
    <div className="mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow">
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">ID:</span>
        <span>{work._id}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">Title:</span>
        <span className="text-right">{work.title}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">Pay:</span>
        <span>{work.pay}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">Client:</span>
        <span>{work.clientName}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span className="font-semibold">Level:</span>
        <span>{work.jobLevel}</span>
      </div>
    </div>
  );

  return (
    <div className="mt-12 flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-4 shadow sm:gap-6 sm:p-6 md:p-10">
      {/* Header */}
      <div className="px-2">
        <UserDashboardHeader title="My Works" array={filteredWorks} />
      </div>

      {/* Search Bar */}
      <div className="px-2">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Desktop View - Table */}
      <div className="hidden overflow-x-auto rounded-lg shadow md:block">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700 lg:text-lg">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold lg:px-6 lg:py-3">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold lg:px-6 lg:py-3">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right font-semibold lg:px-6 lg:py-3">
                Pay
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold lg:px-6 lg:py-3">
                Client Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold lg:px-6 lg:py-3">
                Job Level
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredWorks.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-2 text-center lg:px-6 lg:py-3"
                >
                  No Works Found
                </td>
              </tr>
            ) : (
              filteredWorks.map((work) => (
                <MyWorksListElement appl={work} key={work._id} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="px-2 md:hidden">
        {filteredWorks.length === 0 ? (
          <div className="rounded-lg border border-gray-300 bg-white py-4 text-center">
            No Works Found
          </div>
        ) : (
          filteredWorks.map((work) => (
            <MobileWorkCard key={work._id} work={work} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyWorks;
