import WorksSideBar from './WorksSideBar';
import WorkCard from './WorkCard';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NoWorkFound from './NoWorkFound';

const Works = () => {
  const works = useSelector((state) => state.work);
  const [filteredWorks, setFilteredWorks] = useState([]);

  useEffect(() => {
    setFilteredWorks(works);
  }, [works]);

  const [filters, setFilters] = useState({
    joblevel: '',
    pay: '',
    active: '',
    skills: '',
  });

  const applyFilters = (query = '') => {
    const filtered = works.filter((work) => {
      const matchesJobLevel = filters.joblevel
        ? work.joblevel === filters.joblevel
        : true;
      const matchesPay = filters.pay ? work.pay >= +filters.pay : true;
      const matchesActive = filters.active
        ? work.active === (filters.active === 'true')
        : true;
      const matchesSkills = filters.skills
        ? work.skills_Required.some((skill) =>
            skill.toLowerCase().includes(filters.skills.toLowerCase())
          )
        : true;
      const matchesSearch = work.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return (
        matchesJobLevel &&
        matchesPay &&
        matchesActive &&
        matchesSkills &&
        matchesSearch
      );
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
      <div className="w-full p-10">
        {/* Header section */}
        <div className="py-3">
          <h1 className="py-3 text-3xl font-medium">
            Recommended Jobs{' '}
            <span className="m-2 rounded-2xl border bg-gray-50 p-2 text-xl">
              {filteredWorks.length}
            </span>
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Works section */}
        <div className="mx-auto grid w-full grid-cols-1 gap-10 px-10 sm:grid-cols-2 md:grid-cols-4">
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
