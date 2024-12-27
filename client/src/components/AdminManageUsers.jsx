// src/components/Users.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { toast } from 'sonner';
import { API_URL } from '../utils/constants';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  // const [deleted, setDeleted] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/users/freelancers`);
      const data = await response.json();
      setUsers(data.data.users);
      setFilteredUsers(data.data.users);
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the user from the state if deletion is successful
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(users.filter((user) => user.id !== id));
      // setDeleted((prev) => !prev);

      toast.success('Deleted Freelancer Sucessfully', {
        position: 'top-center',
      });

      console.error('Failed to delete the user:', response.statusText);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = users.filter((cl) => {
      const matchesUserName = cl.firstName
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesId = cl._id === query.toLowerCase();
      return matchesUserName || matchesId;
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-6">
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-4 flex items-center text-3xl font-extrabold tracking-tight">
          Available Freelancers -
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-cyan-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
            {filteredUsers.length}
          </span>
        </h2>
      </div>
      <SearchBar onSearch={handleSearch} />
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-700">Manage Users</h2> */}
      <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
        <thead className="bg-gray-200 text-gray-900 shadow-md">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">ID</th>
            <th className="px-6 py-3 text-left font-semibold">Name</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">CreatedAt</th>
            <th className="px-6 py-3 text-left font-semibold">Earnings</th>
            <th className="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2 text-gray-700">{user.id}</td>
              <td className="px-4 py-2 text-gray-700">{user.firstName}</td>
              <td className="px-4 py-2 text-gray-700">{user.email}</td>
              <td className="px-4 py-2 text-gray-700">{user.createdAt}</td>
              <td className="px-4 py-2 text-gray-700">{user.balance}</td>
              <td className="px-4 py-2 text-gray-700">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="transform rounded-lg bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-red-500 hover:to-pink-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
