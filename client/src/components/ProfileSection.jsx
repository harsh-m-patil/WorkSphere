import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import profileImage from "../assets/profile.jpg"; // Placeholder profile image
import { API_URL } from "../utils/constants"; // Assuming you have a constants file

const ProfileSection = ({ user }) => {
  const localUser = user;
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    description: user.description,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <h3 className="text-lg font-bold">{`${localUser.firstName} ${localUser.lastName}`}</h3>
          )}
          {editMode ? (
            <input
              type="text"
              name="userName"
              value={updatedUser.userName}
              onChange={handleChange}
              className="border-b-2 text-gray-500"
            />
          ) : (
            <p className="text-gray-500">{localUser.userName}</p>
          )}
        </div>
        <div className="ml-auto">
          <FiMoreHorizontal
            className="text-xl"
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
          <p className="mb-4 text-gray-700">{localUser.description}</p>
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
          <p>{localUser.email}</p>
        )}
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
