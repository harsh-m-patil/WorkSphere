import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [clients, setClients] = useState([]);

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/users/clients'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // console.log('Fetched clients data:', data); // Debugging
        setClients(data.data.users); // Adjust this path based on the actual API structure
        // console.log(data)
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Handle delete client
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
      setClients(clients.filter((user) => user._id !== id));
      // setDeleted((prev) => !prev)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">
        Manage Clients
        <span className="rounded-xl bg-white px-3">{clients.length}</span>
      </h2>
      <table className="w-full table-auto border-collapse rounded-md border border-gray-200 shadow-md">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                No clients found.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{client.id}</td>
                <td className="px-4 py-2 text-gray-700">{client.userName}</td>
                <td className="px-4 py-2 text-gray-700">{client.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
