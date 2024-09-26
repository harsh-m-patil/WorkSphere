import { FiMoreHorizontal } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import profileImage from "../assets/profile.jpg"; // Placeholder profile image
import { API_URL } from "../utils/constants"; // Assuming you have a constants file

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true, // If using cookies for authentication
        });
        const userData = response.data.data.user; // Adjust according to your response structure

        // Set the user and initialize updatedUser state
        setUser(userData);
        setUpdatedUser({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          description: userData.description,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const getChangedData = () => {
    const changedData = {};
    Object.keys(updatedUser).forEach((key) => {
      if (JSON.stringify(updatedUser[key]) !== JSON.stringify(user[key])) {
        changedData[key] = updatedUser[key];
      }
    });
    return changedData;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const changedData = getChangedData();

    if (Object.keys(changedData).length === 0) {
      setEditMode(false); // No changes were made, exit edit mode
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(`${API_URL}/users/me`, changedData, {
        headers: {
          "Content-Type": "application/json", // Explicitly setting the Content-Type to JSON
        },
        withCredentials: true, // If using cookies for authentication
      });

      // Handle success (e.g., update UI or show a success message)
      setEditMode(false);
      console.log("Profile updated successfully", response.data);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message,
      );
      setError(
        error.response ? error.response.data : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  // Show a loading state or error message if user data hasn't loaded yet
  if (!user) {
    return <div className="text-center">Loading user data...</div>;
  }

  return (
    <div className="w-full rounded-md bg-white p-6 shadow-md lg:w-2/3">
      {/* Profile */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={profileImage}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          {editMode ? (
            <>
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleChange}
                className="border-b-2 text-lg font-bold"
              />
              <input
                type="text"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleChange}
                className="border-b-2 text-lg font-bold"
              />
            </>
          ) : (
            <h3 className="text-lg font-bold">
              {`${user.firstName} ${user.lastName}`}{" "}
              <span className="ml-1 rounded-3xl bg-teal-100 p-1 px-2">
                {user.ratingsAverage}
              </span>
            </h3>
          )}
          {editMode ? (
            <input
              type="text"
              name="userName"
              value={updatedUser.userName || ""}
              onChange={handleChange}
              className="border-b-2 text-gray-500"
            />
          ) : (
            <p className="text-gray-500">{user.userName}</p>
          )}
        </div>
        <div className="ml-auto">
          <FiMoreHorizontal
            className="cursor-pointer text-xl"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        {editMode ? (
          <textarea
            name="description"
            value={updatedUser.description}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-2 text-gray-700"
          />
        ) : (
          <p className="mb-4 text-gray-700">{user.description}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <h2>Email</h2>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            className="w-full border-b-2"
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h2>Skills</h2>
        <p>{user.skills.join(", ") || "No skills listed"}</p>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <h2>Languages</h2>
        <p>{user.languages.join(", ") || "No languages listed"}</p>
      </div>

      {/* Certificates */}
      <div className="mb-4">
        <h2>Certificates</h2>
        <p>
          {user.certificates.length > 0
            ? user.certificates.join(", ")
            : "No certificates listed"}
        </p>
      </div>

      {editMode && (
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => setEditMode(false)}
            className="rounded-md bg-gray-200 px-4 py-2 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`rounded-md bg-[#2F9C95] px-4 py-2 text-white ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Updating..." : "Save"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
