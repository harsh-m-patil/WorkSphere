import WorksSideBar from './WorksSideBar';
import { SearchBar } from './SearchBar';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../query/fetchWorks';
import WorkGrid from './WorkGrid';

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
        {/*<div className="grid w-full grid-cols-1 place-items-center items-center gap-x-2 gap-y-10 px-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">*/}
        <WorkGrid
          isLoading={isLoading}
          error={error}
          isError={isError}
          filteredWorks={filteredWorks}
        />
      </div>
    </div>
  );
};

export default Works;
