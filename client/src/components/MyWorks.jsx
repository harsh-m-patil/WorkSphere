import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar';
import { MyWorksListElement } from './MyWorksListElement';

const MyWorks = () => {
  const { user } = useSelector((state) => state.auth); // Access works from Redux
  const works = user.works;
  const [filteredWorks, setFilteredWorks] = useState([]);

  useEffect(() => {
    // Filter works with 'accepted' status initially
    const acceptedWorks = works.filter((work) => work);
    setFilteredWorks(acceptedWorks);
  }, [works]);

  const handleSearch = (query) => {
    const filtered = works.filter((work) =>
      work.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorks(filtered);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-50 p-10 shadow">
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-1 flex items-center text-3xl font-extrabold tracking-tight">
          My Works
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-purple-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
            {works.length}
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
              <th className="border border-gray-300 px-4 py-3">Client Name</th>
              <th className="border border-gray-300 px-4 py-3">JobLevel</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorks.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-4 py-3 text-center"
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
    </div>
  );
};

export default MyWorks;
