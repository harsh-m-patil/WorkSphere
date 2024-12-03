// src/components/Users.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  // const [deleted, setDeleted] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/api/v1/users/freelancers');
      const data = await response.json();
      console.log(data);
      setUsers(data.data.users);
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the user from the state if deletion is successful
      setUsers(users.filter((user) => user.id !== id));
      // setDeleted((prev) => !prev);

      console.error('Failed to delete the user:', response.statusText);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">
        Manage Users
        <span className="rounded-xl bg-white px-3">{users.length}</span>
      </h2>
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-700">Manage Users</h2> */}
      <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-gray-600">Earnings</th>
            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="px-4 py-2 text-gray-700">{user.id}</td>
              <td className="px-4 py-2 text-gray-700">{user.firstName}</td>
              <td className="px-4 py-2 text-gray-700">{user.email}</td>
              <td className="px-4 py-2 text-gray-700">{user.balance}</td>
              <td className="px-4 py-2 text-gray-700">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
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
