import { useEffect, useState } from "react";
import Sidebar from "../components/UserSideBar";
import profileImage from "../assets/profile.jpg";
import axios from "axios";
import { API_URL } from "../utils/constants";
import ClientProfileSection from "../components/ClientProfileSection";
import ClientSeeWork from "../components/ClientSeeWork";
import { useNavigate } from "react-router-dom";
import ClientSideBar from "../components/ClientSideBar";

const ClientDashBoard = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        setClient(response.data.data.user); // Correctly set the user data
        // console.log("User data:",user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-[#2f9c95]">Loading user data...</p>
      </div>
    ); // Loading state UI
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ClientSideBar />

      {/* Main content */}
      <div className="flex w-full flex-col bg-gray-50 p-6">
        <div className="flex justify-between">
          {/* Profile Section*/}
          <ClientProfileSection client={client} />

          {/* path for work posted Section */}
          <ClientSeeWork client={client} />
        </div>
      </div>
    </div>
  );
};

export default ClientDashBoard;
