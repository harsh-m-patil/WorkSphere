import { useEffect, useState } from 'react';
import FreelancersSideBar from './FreelancersSideBar';
import NoWorkFound from './NoWorkFound';
import UserCard from './UserCard';
import { SearchBar } from './SearchBar';
import { API_URL } from '../utils/constants';

const Freelancers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/users/freelancers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.data.users);
      })
      .catch((error) => {
        console.error('Error fetching freelancers:', error);
      });
  }, []);

  useEffect(() => {
    setUsers(users);
    setFilteredUsers(users);
  }, [users]);

  const applyFilters = (query = '') => {
    const filtered = users.filter((user) => {
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
            Recommended Users{' '}
            <span className="m-2 rounded-2xl border bg-gray-50 p-2 text-xl">
              {filteredUsers.length}
            </span>
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {filteredUsers.length === 0 ? (
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
