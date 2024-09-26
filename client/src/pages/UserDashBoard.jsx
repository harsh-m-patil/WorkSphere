import Sidebar from "../components/UserSideBar";
import ProfileSection from "../components/ProfileSection";
import WorkSection from "../components/WorkSection";
import ReviewsSection from "../components/ReviewsSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Navigate, useNavigate } from "react-router-dom";

function UserDashBoard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data.data.user); // Correctly set the user data
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

  if(user.role === 'admin') {
    navigate("/admin/dashboard")
  }
  if (user.role === "client") {
    navigate("/client/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex w-full flex-col bg-gray-50 p-6">
        <div className="flex justify-between">
          {/* Profile Section */}
          <ProfileSection user={user} />

          {/* Team Section */}
          <WorkSection works={user.works} />
        </div>

        {/* Meeting Section */}
        <ReviewsSection reviews={user.reviews} />
      </div>
    </div>
  );
}

export default UserDashBoard;
