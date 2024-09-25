import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import UserCard from "../components/UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${API_URL}/users/freelancers`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const json = await res.json();
        setUsers(json.data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Freelancers</h2>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array(5) // Change this number to represent how many skeletons to show
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-lg border p-4 shadow-lg"
              >
                {/* Skeleton Avatar */}
                <div className="mx-auto h-20 w-20 rounded-full bg-gray-300"></div>

                {/* Skeleton Text Lines */}
                <div className="mt-4 space-y-2">
                  <div className="mx-auto h-4 w-3/4 rounded bg-gray-300"></div>
                  <div className="mx-auto h-4 w-1/2 rounded bg-gray-300"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        <p>Error fetching users: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Freelancers</h2>

      {/* User Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p>No freelancers available.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
