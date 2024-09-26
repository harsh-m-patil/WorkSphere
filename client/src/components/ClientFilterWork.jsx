import { useLocation } from "react-router-dom";
import Sidebar from "./UserSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const ClientFilterWork = () => {
  const location = useLocation();
  const { work } = location.state || {};

  const [AppliedUsers, setAppliedUsers] = useState([]);

  useEffect(() => {
    async function fetchAppliedUsers() {
      const response = await axios.post(`${API_URL}/work/getUsersForWork`, {
        workId: work._id,
      });
      setAppliedUsers(response.data.data.workdetails.applied_status);
    }
    fetchAppliedUsers();
  }, [work]);

  const handleAssign = async (user) => {
    const response = await axios.post(
      `${API_URL}/work/assign`,
      {
        workId: work._id,
        freelancerId: user._id,
      },
      { withCredentials: true },
    );

    console.log(response.data.data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-grow p-8">
        <h2 className="mb-6 text-2xl font-bold">Job Details</h2>
        <div className="rounded-md border p-4 shadow">
          <h3 className="text-xl font-semibold">{work.title}</h3>
          <p className="text-gray-600">{work.description}</p>
          <p className="text-gray-500">Level: {work.joblevel}</p>
          <p className="text-gray-500">Pay: ${work.pay}</p>
          <p className="text-gray-500">
            Skills Required: {work.skills_Required.join(", ")}
          </p>
          <p className="text-gray-500">
            Status: {work.active ? "Active" : "Inactive"}
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-bold">Users Who Applied</h2>
        {AppliedUsers.length > 0 ? (
          <div>
            <ul className="mt-4">
              {AppliedUsers.map((user) => (
                <li
                  key={user._id}
                  className="mb-4 flex items-center justify-between rounded-md border p-4 shadow"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      Username: {user.userName}
                    </p>
                    <p className="text-gray-500">Email: {user.email}</p>
                    <p className="text-gray-500">
                      Avg Rating: {user.ratingsAverage}
                    </p>
                    <p className="text-gray-500">
                      No of Ratings Achieved By Other Clients:{" "}
                      {user.noOfRatings}
                    </p>
                  </div>
                  <button
                    className="ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    // Call the assign function
                    onClick={() => handleAssign(user)}
                  >
                    Assign
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No users have applied to this job yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientFilterWork;
