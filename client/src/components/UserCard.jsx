import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profile.jpg";
import Pill from "./Pill";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user/${user._id}`);
  };

  return (
    <div className="max-w-sm overflow-hidden rounded border-gray-200 bg-white shadow-lg">
      <a onClick={handleProfileClick}>
        <img
          className="h-3/4 w-full rounded-t object-cover"
          src={profileImage}
        />
      </a>
      <div className="w-full rounded-b-lg px-4 py-2">
        <div className="mb-2 flex justify-between text-lg font-bold text-gray-700">
          @{user.userName}
          <span>{user.ratingsAverage}</span>
        </div>
        <div className="pt-1">
          {user.skills &&
            user.skills.map((skill) => <Pill key={skill} skill={skill} />)}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
