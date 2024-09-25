import { FiMoreHorizontal } from "react-icons/fi";
import profileImage from "../assets/profile.jpg"; // Placeholder profile image

const ProfileSection = ({ user }) => {
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
          <h3 className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</h3>
          <p className="text-gray-500">{user.userName}</p>
        </div>
        <div className="ml-auto">
          <FiMoreHorizontal className="text-xl" />
        </div>
      </div>

      {/* Chat */}
      <div>
        <p className="mb-4 text-gray-700">{user.description}</p>

        <div className="mb-4 rounded-lg p-2">
          <h2>Skills</h2>
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
      </div>
    </div>
  );
};

export default ProfileSection;
