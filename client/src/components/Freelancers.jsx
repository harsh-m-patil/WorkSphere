import { useEffect, useState } from 'react';
import FreelancersSideBar from './FreelancersSideBar';
import NoWorkFound from './NoWorkFound';
import UserCard from './UserCard';
import { SearchBar } from './SearchBar';
import { fetchFreelancers } from '../query/fetchFreelancers';
import { useQuery } from '@tanstack/react-query';

const Freelancers = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['freelancers'],
    queryFn: fetchFreelancers,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setFilteredUsers(data);
    }
  }, [data]);

  const applyFilters = (query = '') => {
    if (!data) return;
    const filtered = data.filter((user) => {
      const mathcesSearch = user.userName
        .toLowerCase()
        .includes(query.toLowerCase());

      return mathcesSearch;
    });

    setFilteredUsers(filtered);
  };

  const handleSearch = (query) => {
    applyFilters(query);
  };
  return (
    <div className="flex">
      <FreelancersSideBar />
      <div className="w-full p-10">
        {/* Header section */}
        <div className="py-3">
          <h1 className="py-3 text-3xl font-medium">
            Recommended Users
            <span className="m-2 rounded-2xl border bg-gray-50 p-2 text-xl">
              {filteredUsers?.length}
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
          ) : filteredUsers?.length === 0 ? (
            <NoWorkFound />
          ) : (
            filteredUsers.map((user, index) => (
              <UserCard user={user} key={user._id} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Freelancers;
