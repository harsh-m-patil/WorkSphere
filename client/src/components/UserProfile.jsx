import profileImage from "../assets/profile.jpg";
import { useParams } from "react-router-dom";
import Review from "./Review";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "../utils/fetchUser";

const UserProfile = () => {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["id", id],
    queryFn: fetchUser,
  });

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Error fetching user</h1>
        <p className="text-gray-500">
          There was an error loading the user profile.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="loader h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-300"></div>
        <h1 className="mt-4 text-lg">Loading user profile...</h1>
      </div>
    );
  }

  const user = data.data.user;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* User Profile Information */}
      <div className="top-4 z-[-1] flex w-full flex-col items-center justify-center gap-y-6 border-r border-gray-300 p-2 py-4 lg:sticky lg:h-screen lg:w-1/3">
        <img
          src={user.profile || profileImage}
          alt={`${user.userName}'s profile`}
          className="h-72 w-72 rounded-full object-cover shadow-lg"
        />
        <div className="w-full max-w-sm rounded-md border border-gray-300 bg-white p-6 shadow-lg">
          <h1 className="text-lg font-semibold">
            Username: <span className="text-gray-700">{user.userName}</span>
          </h1>
          <h2 className="text-md text-gray-600">
            Full Name:{" "}
            <span>{`${user.firstName + (user.LastName || "")}` || "N/A"}</span>
          </h2>
          <h2 className="text-md text-gray-600">
            Rating: <span>{user.ratingsAverage || "N/A"}</span>
          </h2>
          <div className="mt-4">
            <ul className="mt-2 flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                  >
                    {skill}
                  </li>
                ))
              ) : (
                <span>None</span>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-md font-semibold">Certificates:</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {user.certificates?.length > 0 ? (
                user.certificates.map((cert, index) => (
                  <li
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
                  >
                    {cert}
                  </li>
                ))
              ) : (
                <span>None</span>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-md font-semibold">Languages:</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {user.languages?.length > 0 ? (
                user.languages.map((lang, index) => (
                  <li
                    key={index}
                    className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700"
                  >
                    {lang}
                  </li>
                ))
              ) : (
                <span>None</span>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="flex-1 p-10">
        <h2 className="mb-4 text-xl font-bold">User Reviews</h2>
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))
        ) : (
          <p className="text-gray-500">No reviews available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
