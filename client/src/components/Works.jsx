import WorksSideBar from './WorksSideBar';
import WorkCard from './WorkCard';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';
import NoWorkFound from './NoWorkFound';
import { API_URL } from '../utils/constants';

const Works = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);

  useEffect(() => {
    setFilteredWorks(works);
  }, [works]);

  useEffect(() => {
    fetch(`${API_URL}/work`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWorks(data.data.works);
      })
      .catch((error) => {
        console.error('Error fetching works:', error);
      });
  }, []);

  const [filters, setFilters] = useState({
    joblevel: '',
    pay: '',
    active: '',
    skills: '',
  });

  const applyFilters = (query = '') => {
    const filtered = works.filter((work) => {
      const matchesSearch = work.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesSkills = work.skills_Required
        .join()
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesSkills || matchesSearch;
    });

    setFilteredWorks(filtered);
  };

  const handleSearch = (query) => {
    applyFilters(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    applyFilters();
  };

  return (
    <div className="flex">
      <WorksSideBar filters={filters} setFilters={handleFilterChange} />
      <div className="w-full p-4 sm:p-10">
        {/* Header section */}
        <div className="py-3">
          <h1 className="py-3 text-2xl font-medium sm:text-3xl">
            Recommended Jobs
            <span className="m-2 rounded-2xl border bg-gray-50 p-2 text-xl">
              {filteredWorks.length}
            </span>
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Works section */}
        <div className="grid w-full grid-cols-1 place-items-center items-center gap-x-2 gap-y-10 px-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredWorks.length === 0 ? (
            <NoWorkFound />
          ) : (
            filteredWorks.map((work, index) => (
              <WorkCard work={work} key={work._id} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Works;
