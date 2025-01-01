import { motion } from 'motion/react';
import {
  User,
  Award,
  Briefcase,
  Mail,
  Edit,
  Clock,
  ExternalLink,
} from 'lucide-react';
import UserDashboardHeader from './UserDashboardHeader';
import { fetchLoggedInUser } from '../query/fetchLoggedInUser';
import { useQuery } from '@tanstack/react-query';

const ProfileDashboard = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Error state
  }

  const ProfileSection = ({ icon: Icon, title, children, onEdit }) => (
    <motion.div
      className="relative w-full overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Edit className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );

  const InfoField = ({ label, value, icon: Icon }) => (
    <div className="group flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
      {Icon && <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-base text-gray-900">
          {value || 'Not specified'}
        </p>
      </div>
    </div>
  );

  const Badge = ({ children, color = 'blue' }) => (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${color === 'blue' ? 'bg-blue-50 text-blue-700' : ''} ${color === 'green' ? 'bg-green-50 text-green-700' : ''} ${color === 'yellow' ? 'bg-yellow-50 text-yellow-700' : ''}`}
    >
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <UserDashboardHeader title="Professional Profile" />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Personal Info Section */}
          <ProfileSection
            icon={User}
            title="Personal Information"
            onEdit={() => {}}
          >
            <div className="space-y-4">
              <InfoField
                label="Full Name"
                value={`${data.firstName} ${data.lastName}`}
              />
              <InfoField label="Username" value={data.userName} />
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </ProfileSection>

          {/* Contact Section */}
          <ProfileSection icon={Mail} title="Contact Details" onEdit={() => {}}>
            <div className="space-y-4">
              <InfoField label="Email Address" value={data.email} />
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">About</p>
                <p className="mt-2 whitespace-pre-line text-gray-700">
                  {data.description || 'No description provided'}
                </p>
              </div>
            </div>
          </ProfileSection>

          {/* Professional Profile Section */}
          <ProfileSection
            icon={Briefcase}
            title="Professional Expertise"
            onEdit={() => {}}
          >
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-500">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.length > 0 ? (
                    data.skills.map((skill, index) => (
                      <Badge key={index} color="blue">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills listed yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-500">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.languages.length > 0 ? (
                    data.languages.map((lang, index) => (
                      <Badge key={index} color="green">
                        {lang}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No languages listed yet</p>
                  )}
                </div>
              </div>
            </div>
          </ProfileSection>

          {/* Achievements Section */}
          <ProfileSection
            icon={Award}
            title="Certifications & Achievements"
            onEdit={() => {}}
          >
            {data.certificates.length > 0 ? (
              <div className="space-y-3">
                {data.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-900">{cert}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center">
                <Award className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm font-medium text-gray-500">
                  No certificates added yet
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Add your professional certifications and achievements
                </p>
              </div>
            )}
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
