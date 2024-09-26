import { useEffect, useState } from "react";
import Sidebar from "../components/UserSideBar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { FaStar, FaUser } from "react-icons/fa"; // Importing icons

const UserDashboardReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        // Adjust to retrieve reviews
        setReviews(response.data?.data?.user?.reviews || []); // Optional chaining to safely access reviews
      } catch (error) {
        console.error("Error fetching user reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-[#2f9c95]">Loading user data...</p>
      </div>
    ); // Loading state UI
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    ); // Error state UI
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">
          My Reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-lg text-gray-500">No reviews available</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
              >
                <h3 className="mb-3 text-2xl font-bold text-gray-800">
                  Review by: {review.client.userName || "Unknown User"}
                </h3>
                <p className="mb-4 text-gray-600">
                  {review.review || "No review content available"}
                </p>

                <div className="mb-3 flex items-center text-gray-500">
                  <FaStar className="mr-2 text-yellow-500" />
                  <span>Rating: {review.rating || "N/A"}</span>
                </div>

                <div className="mt-2 text-xs text-gray-400">
                  <span>
                    Created at: {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardReviews;
