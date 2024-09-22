import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import UserCard from "../components/UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${API_URL}/users/freelancers`);
        const json = await res.json();
        setUsers(json.data.users); // Assuming the correct path
        console.log(json.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      {/* User Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
