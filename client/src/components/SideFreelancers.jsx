import { useState } from 'react';
import { SearchBar } from './SearchBar';
import NoWorkFound from './NoWorkFound';
import UserCard from './UserCard';

const SideFreelancers = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (query) => {
    const filtered = users.filter((user) => {
      return user.userName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(filtered);
  };
  return (
    <div>
      <div className="hidden h-full w-fit overflow-y-auto border-r px-10 pb-10 scrollbar-hide md:block">
        <div className="sticky top-0 mb-3 bg-white pt-10">
          <h1 className="text-center text-2xl"> Recommended Users </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-rows-1 gap-9">
          {filteredUsers.length === 0 ? (
            <NoWorkFound />
          ) : (
            filteredUsers.map((user, index) => (
              <UserCard user={user} key={index + user._id} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SideFreelancers;
