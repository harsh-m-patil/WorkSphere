import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { toast } from 'sonner';

const ManageUsers = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState(clients);

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
        setFilteredClients(data.data.users);
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
      setFilteredClients(clients.filter((user) => user._id !== id));
      toast.success('Deleted Client Sucessfully', { position: 'top-center' });

      // setDeleted((prev) => !prev)
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = clients.filter((cl) =>
      cl.userName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  return (
    <div className="p-4">
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-4 flex items-center text-3xl font-extrabold tracking-tight">
          Available Clients -
          <span className="ml-4 rounded-full bg-white px-5 py-2 text-lg font-bold text-cyan-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:shadow-xl">
            {filteredClients.length}
          </span>
        </h2>
      </div>

      <SearchBar onSearch={handleSearch} />

      <table className="w-full table-auto border-collapse rounded-md border border-gray-200 shadow-md">
        <thead className="bg-gray-200 text-gray-900 shadow-md">
          <tr className="border-b">
            <th className="px-6 py-3 text-left font-semibold">ID</th>
            <th className="px-6 py-3 text-left font-semibold">Name</th>
            <th className="px-6 py-3 text-left font-semibold">Email</th>
            <th className="px-6 py-3 text-left font-semibold">CreatedAt</th>
            <th className="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredClients.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                No clients found.
              </td>
            </tr>
          ) : (
            filteredClients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{client.id}</td>
                <td className="px-4 py-2 text-gray-700">{client.userName}</td>
                <td className="px-4 py-2 text-gray-700">{client.email}</td>
                <td className="px-4 py-2 text-gray-700">{client.createdAt}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="transform rounded-lg bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-red-500 hover:to-pink-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95"
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
