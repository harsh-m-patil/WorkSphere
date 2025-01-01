import WorksSideBar from './WorksSideBar';
import WorkCard from './WorkCard';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';
import NoWorkFound from './NoWorkFound';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../query/fetchWorks';

const Works = () => {
  const [filteredWorks, setFilteredWorks] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['works'],
    queryFn: fetchWorks,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setFilteredWorks(data);
    }
  }, [data]);

  const [filters, setFilters] = useState({
    joblevel: '',
    pay: '',
    active: '',
    skills: '',
  });

  const applyFilters = (query = '') => {
    if (!data) return;

    const filtered = data.filter((work) => {
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
              {filteredWorks?.length}
            </span>
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Works section */}
        <div className="grid w-full grid-cols-1 place-items-center items-center gap-x-2 gap-y-10 px-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {isLoading ? (
            <h1 className="pt-20 text-center text-4xl">Loading</h1>
          ) : isError ? (
            <h1 className="pt-20 text-center text-4xl text-red-500">
              Error: {error?.message || 'Something went wrong'}
            </h1>
          ) : filteredWorks.length === 0 ? (
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
