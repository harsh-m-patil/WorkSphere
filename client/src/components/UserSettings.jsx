import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    description: '',
    skills: [],
    languages: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    async function fetchUserData() {
      try {
        const response = await axios.get('/api/v1/users/me');
        setUser(response.data.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data', err);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('/api/v1/users/me', user);
      setUser(response.data.data.user);
      alert('Profile updated successfully');
      navigate('/profile'); // redirect to profile page or anywhere else
    } catch (err) {
      console.error('Error updating profile', err);
      alert('Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-3xl font-semibold text-gray-800">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  placeholder={user.firstName || 'Enter your first name'}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder={user.lastName || 'Enter your last name'}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                placeholder={user.userName || 'Enter your username'}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder={user.email || 'Enter your email'}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={user.description}
                onChange={handleChange}
                placeholder={
                  user.description || 'Write a brief description about yourself'
                }
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={user.skills.join(', ')}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'skills',
                      value: e.target.value.split(', '),
                    },
                  })
                }
                placeholder={
                  user.skills.length > 0
                    ? user.skills.join(', ')
                    : 'Enter your skills'
                }
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                type="text"
                name="languages"
                value={user.languages.join(', ')}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'languages',
                      value: e.target.value.split(', '),
                    },
                  })
                }
                placeholder={
                  user.languages.length > 0
                    ? user.languages.join(', ')
                    : 'Enter languages you know'
                }
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certificates
              </label>
              <input
                type="text"
                name="certificates"
                value={user.certificates.join(', ')}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'certificates',
                      value: e.target.value.split(', '),
                    },
                  })
                }
                placeholder={
                  user.certificates.length > 0
                    ? user.certificates.join(', ')
                    : 'Enter your certificates'
                }
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
