import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { toast } from 'sonner';
import UserDashboardHeader from './UserDashboardHeader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchLoggedInUser } from '../query/fetchLoggedInUser';

const UserSettings = () => {
  const [newSkill, setNewSkill] = useState('');
  const queryClient = useQueryClient();
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertificate, setNewCertificate] = useState('');

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    skills: user?.skills || [],
    languages: user?.languages || [],
    certificates: user?.certificates || [],
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem('token');
      return axios.patch(`${API_URL}/users/me`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      return axios.delete(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success('Account deleted successfully');
      window.location.href = '/login';
    },
    onError: (error) => {
      toast.error(`Failed to delete account: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    updateUserMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      skills: formData.skills,
      languages: formData.languages,
      certificates: formData.certificates,
    });
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you absolutely sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      deleteUserMutation.mutate();
    }
  };

  // List management functions
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

  // Update formData when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        skills: user.skills || [],
        languages: user.languages || [],
        certificates: user.certificates || [],
      });
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="mt-10 text-center text-xl text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="mt-12 w-full p-3 sm:m-0 sm:p-10">
      <UserDashboardHeader title="Settings" />
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 gap-6 p-10 sm:grid-cols-2 lg:gap-10"
      >
        {/* Personal Info */}
        <div className="flex flex-col justify-center rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="mb-3 flex flex-col items-center justify-between sm:flex-row">
            <label className="p-2 text-xl text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-3 flex flex-col items-center justify-between sm:flex-row">
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
          <label className="mb-3 text-center text-lg text-gray-700 md:text-xl">
            Skills
          </label>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full space-y-2 p-2 sm:w-1/2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="w-full transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-10"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            <div className="w-full sm:w-1/2">
              <ul className="max-h-48 space-y-2 overflow-y-auto">
                {formData.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex flex-col items-center justify-between gap-2 rounded-md bg-gray-100 p-2 sm:flex-row"
                  >
                    <span className="text-center text-gray-800 sm:text-left">
                      {skill}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-10"
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
          <label className="mb-3 text-center text-lg text-gray-700 md:text-xl">
            Languages
          </label>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full space-y-2 p-2 sm:w-1/2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a new language"
                className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addLanguage}
                className="w-full transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-10"
              >
                Add
              </button>
            </div>
            <div className="w-full sm:w-1/2">
              <ul className="max-h-48 space-y-2 overflow-y-auto">
                {formData.languages.map((language) => (
                  <li
                    key={language}
                    className="flex flex-col items-center justify-between gap-2 rounded-md bg-gray-100 p-2 sm:flex-row"
                  >
                    <span className="text-center text-gray-800 sm:text-left">
                      {language}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-10"
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
          <label className="mb-3 text-center text-lg text-gray-700 md:text-xl">
            Certificates
          </label>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full space-y-2 p-2 sm:w-1/2">
              <input
                type="text"
                value={newCertificate}
                onChange={(e) => setNewCertificate(e.target.value)}
                placeholder="Add a new certificate"
                className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addCertificate}
                className="w-full transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-10"
              >
                Add
              </button>
            </div>
            <div className="w-full sm:w-1/2">
              <ul className="max-h-48 space-y-2 overflow-y-auto">
                {formData.certificates.map((certificate) => (
                  <li
                    key={certificate}
                    className="flex flex-col items-center justify-between gap-2 rounded-md bg-gray-100 p-2 sm:flex-row"
                  >
                    <span className="text-center text-gray-800 sm:text-left">
                      {certificate}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCertificate(certificate)}
                      className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-10"
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
        <div className="flex flex-col justify-between gap-4 rounded-xl border bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:flex-row">
          <button
            type="submit"
            className="w-full transform rounded-xl bg-gradient-to-r from-sky-300 via-blue-500 to-blue-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-10"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full transform rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-red-600 p-2 px-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-10"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
