import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./UserSideBar";
import { useEffect } from "react";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import axios from "axios";

const ClientWorksPosted = () => {
  const location = useLocation();

  // get the client details which was passed by navigate
  const { client } = location.state || {};

  const [WorksByMe, setWorksByMe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientWorks() {
      const response = await axios.post(`${API_URL}/work/myworks`, {
        clientId: client._id,
      });
      console.log(response.data.data.works);
      setWorksByMe(response.data.data.works);
    }
    fetchClientWorks();
  }, [client]);

  const handleGoIn = (work) => {
    // console.log(work);
    // giving work detials to next page which is having only single work details
    navigate("/client/dashboard/works/single", {
      state: { work },
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Works Posted By {client?.firstName} {client?.lastName}
        </h2>

        {/* Check if works are loaded */}
        {WorksByMe.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WorksByMe.map((work) => (
              <div
                key={work._id}
                className="cursor-pointer rounded-md border p-4 shadow hover:bg-gray-100"
                onClick={() => handleGoIn(work)}
              >
                <h3 className="text-xl font-semibold">{work.title}</h3>
                <p className="text-gray-600">{work.description}</p>
                <p className="text-gray-500">Level: {work.joblevel}</p>
                <p className="text-gray-500">Pay: ${work.pay}</p>
                <p className="text-gray-500">
                  Skills Required: {work.skills_Required.join(", ")}
                </p>
                <p className="text-gray-500">
                  No.of Freelancers Applied: {work.applied_status.length}
                </p>
                <p className="text-gray-500">
                  Status: {work.active ? "Active" : "Inactive"}{" "}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No works posted by this client yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientWorksPosted;
