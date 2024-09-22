import profileImage from "../assets/profile.jpg";
const UserCard = ({ user }) => {
  return (
    <div className="max-w-80 rounded-lg border-gray-200 bg-white shadow">
      <a href="#">
        <img className="rounded-t-lg" src={profileImage} />
      </a>
      <h2>{user.userName}</h2>
      <h2>{user.skills.join(" ")}</h2>
      <h2>{user.ratingsAverage}</h2>
    </div>
  );
};

export default UserCard;
