import { useState } from 'react';
import NoWorkFound from './NoWorkFound';
import WorkCard from './WorkCard';
import { SearchBar } from './SearchBar';

export const SideWorks = ({ works }) => {
  const [filteredWorks, setFilteredWorks] = useState(works);

  const handleSearch = (query) => {
    const filtered = works.filter((work) =>
      work.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredWorks(filtered);
  };

  return (
    <div className="col-span-4 hidden h-full overflow-y-auto border-r px-10 pb-10 scrollbar-hide lg:block 2xl:col-span-3">
      <div className="sticky top-0 mb-3 bg-white pt-10">
        <h1 className="text-center text-2xl">Recommended Works</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-rows-1 gap-9">
        {filteredWorks.length === 0 ? (
          <NoWorkFound />
        ) : (
          filteredWorks.map((work, index) => (
            <WorkCard work={work} key={work._id} index={index} />
          ))
        )}
      </div>
    </div>
  );
};
