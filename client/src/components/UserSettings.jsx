import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { toast } from 'sonner';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    skills: [],
    languages: [],
    certificates: [],
    firstName: '',
    lastName: '',
  });

  console.log(user);

  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertificate, setNewCertificate] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data?.data?.user;

        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          skills: userData.skills || [],
          languages: userData.languages || [],
          certificates: userData.certificates || [],
        });
      } catch (error) {
        toast.error(`Failed to load user data: ${error.message}`);
        setError('Failed to load user data.');
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
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/users/me`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you absolutely sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Account deleted successfully');
        window.location.href = '/login';
      } catch (error) {
        toast.error(`Failed to delete account: ${error.message}`);
      }
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
      setNewSkill('');
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
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter(
        (language) => language !== languageToRemove
      ),
    }));
  };

  const addCertificate = () => {
    if (newCertificate.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        certificates: [...prevData.certificates, newCertificate],
      }));
      setNewCertificate('');
    }
  };

  const removeCertificate = (certificateToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      certificates: prevData.certificates.filter(
        (certificate) => certificate !== certificateToRemove
      ),
    }));
  };

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="mt-10 text-center text-xl text-red-500">{error}</div>
    );

  return (
    <div className="w-full p-10">
      <div className="mb-6 w-96 transform rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <h2 className="mb-1 flex items-center text-3xl font-extrabold tracking-tight">
          Settings
        </h2>
      </div>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 gap-10 p-10 sm:grid-cols-2"
      >
        {/* Personal Info */}
        <div className="flex flex-col justify-center rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <label className="p-2 text-xl text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="p-2 text-xl text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col justify-center rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <label className="mb-3 text-xl text-gray-700">Skills</label>
          <div className="grid grid-cols-2">
            <div className="p-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="mb-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            <div>
              <ul className="max-h-48 overflow-y-auto">
                {formData.skills.map((skill) => (
                  <li
                    key={skill}
                    className="mb-2 flex justify-between rounded-md bg-gray-100 px-5 py-2"
                  >
                    <span className="text-gray-800">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="flex flex-col justify-center rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <label className="mb-3 text-xl text-gray-700">Languages</label>
          <div className="grid grid-cols-2">
            <div className="p-4">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a new language"
                className="mb-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Add
              </button>
            </div>
            <div>
              <ul className="max-h-48 overflow-y-auto">
                {formData.languages.map((language) => (
                  <li
                    key={language}
                    className="mb-2 flex justify-between rounded-md bg-gray-100 px-5 py-2"
                  >
                    <span className="text-gray-800">{language}</span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="flex flex-col justify-center rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <label className="mb-3 text-xl text-gray-700">Certificates</label>
          <div className="grid grid-cols-2">
            <div className="p-4">
              <input
                type="text"
                value={newCertificate}
                onChange={(e) => setNewCertificate(e.target.value)}
                placeholder="Add a new certificate"
                className="mb-2 w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addCertificate}
                className="transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Add
              </button>
            </div>
            <div>
              <ul className="max-h-48 overflow-y-auto">
                {formData.certificates.map((certificate) => (
                  <li
                    key={certificate}
                    className="mb-2 flex justify-between rounded-md bg-gray-100 px-5 py-2"
                  >
                    <span className="text-gray-800">{certificate}</span>
                    <button
                      type="button"
                      onClick={() => removeCertificate(certificate)}
                      className="transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <button
            type="submit"
            className="transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-10 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
