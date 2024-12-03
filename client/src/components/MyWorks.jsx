import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SearchBar } from './SearchBar';
import { MyWorksListElement } from './MyWorksListElement';

const MyWorks = () => {
  const { user } = useSelector((state) => state.auth); // Access works from Redux
  const works = user.works;
  console.log(works);
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
      <h1 className="text-3xl font-bold text-gray-700">My Works</h1>
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
