import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Award, Briefcase, Mail } from 'lucide-react';

const ProfileDashboard = () => {
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

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:3000/api/v1/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data', err);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="animate-pulse text-xl text-gray-600">
          Loading profile...
        </div>
      </div>
    );
  }

  const ProfileSection = ({ icon: Icon, title, children }) => (
    <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <div className="mb-4 flex items-center space-x-3">
        <Icon className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Personal Info Section */}
        <ProfileSection icon={User} title="Personal Details">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="text-lg font-medium">{user.firstName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="text-lg font-medium">{user.lastName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium">{user.userName || 'N/A'}</p>
            </div>
          </div>
        </ProfileSection>

        {/* Contact Section */}
        <ProfileSection icon={Mail} title="Contact Information">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-md text-gray-700">
                {user.description || 'No description provided'}
              </p>
            </div>
          </div>
        </ProfileSection>

        {/* Skills & Languages Section */}
        <ProfileSection icon={Briefcase} title="Professional Profile">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2">
                {user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed</p>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">Languages</p>
              <div className="flex flex-wrap gap-2">
                {user.languages.length > 0 ? (
                  user.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No languages listed</p>
                )}
              </div>
            </div>
          </div>
        </ProfileSection>

        {/* Certificates Section */}
        <ProfileSection icon={Award} title="Achievements">
          <div>
            <p className="mb-2 text-sm text-gray-500">Certificates</p>
            {user.certificates.length > 0 ? (
              <ul className="space-y-2">
                {user.certificates.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 rounded-md bg-gray-100 p-2"
                  >
                    <Award size={20} className="text-yellow-600" />
                    <span className="text-md text-gray-800">{cert}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No certificates earned</p>
            )}
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default ProfileDashboard;
