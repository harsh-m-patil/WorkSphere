import Sidebar from "../components/UserSideBar";
import ProfileSection from "../components/ProfileSection";
import WorkSection from "../components/WorkSection";
import ReviewsSection from "../components/ReviewsSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

function UserDashBoard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

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
          <WorkSection />
        </div>

        {/* Meeting Section */}
        <ReviewsSection reviews={user.reviews} />
      </div>
    </div>
  );
}

export default UserDashBoard;
