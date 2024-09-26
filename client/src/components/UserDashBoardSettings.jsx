import { useEffect, useState } from "react";
import Sidebar from "./UserSideBar";
import { API_URL } from "../utils/constants";
import axios from "axios";

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    skills: [],
    languages: [],
    certificates: [],
    firstName: "",
    lastName: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newCertificate, setNewCertificate] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        const userData = response.data?.data?.user;

        setUser(userData);
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          skills: userData.skills || [],
          languages: userData.languages || [],
          certificates: userData.certificates || [],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      skills: formData.skills,
      languages: formData.languages,
      certificates: formData.certificates,
    };

    try {
      const response = await axios.patch(`${API_URL}/users/me`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response", response);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user data.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${API_URL}/users/me`, { withCredentials: true });
        alert("User deleted successfully!");
        // Optionally redirect to a different page after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Failed to delete user.");
      }
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
      setNewSkill(""); // Clear input after adding
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        languages: [...prevData.languages, newLanguage],
      }));
      setNewLanguage(""); // Clear input after adding
    }
  };

  const removeLanguage = (languageToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter(
        (language) => language !== languageToRemove,
      ),
    }));
  };

  const addCertificate = () => {
    if (newCertificate.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        certificates: [...prevData.certificates, newCertificate],
      }));
      setNewCertificate(""); // Clear input after adding
    }
  };

  const removeCertificate = (certificateToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      certificates: prevData.certificates.filter(
        (certificate) => certificate !== certificateToRemove,
      ),
    }));
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="mx-4 flex-1 p-8">
        <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">User Settings</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="Add a new skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="mt-1 rounded-md bg-blue-600 p-2 text-white transition duration-200 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {formData.skills.map((skill) => (
                  <li key={skill} className="flex justify-between">
                    <span className="text-gray-700">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="Add a new language"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="mt-1 rounded-md bg-blue-600 p-2 text-white transition duration-200 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {formData.languages.map((language) => (
                  <li key={language} className="flex justify-between">
                    <span className="text-gray-700">{language}</span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certificates
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCertificate}
                  onChange={(e) => setNewCertificate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="Add a new certificate"
                />
                <button
                  type="button"
                  onClick={addCertificate}
                  className="mt-1 rounded-md bg-blue-600 p-2 text-white transition duration-200 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {formData.certificates.map((certificate) => (
                  <li key={certificate} className="flex justify-between">
                    <span className="text-gray-700">{certificate}</span>
                    <button
                      type="button"
                      onClick={() => removeCertificate(certificate)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="rounded-md bg-green-600 px-4 py-2 text-white transition duration-200 hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
