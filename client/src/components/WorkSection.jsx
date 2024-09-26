import profileImage from "../assets/profile.jpg"; // Placeholder profile image
import { useNavigate } from "react-router-dom";

const WorkSection = ({ works }) => {
  // Example works data based on the new Mongoose schema

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/dashboard/works");
  };

  return (
    <div className="w-full rounded-md bg-white p-6 shadow-md lg:w-1/3">
      <h3 className="mb-4 text-lg font-bold">Works</h3>
      {works.map((work, index) => (
        <div key={index} className="mb-4 flex items-center gap-4">
          <img
            src={profileImage}
            alt={work.title}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{work.title}</h4>
            <p className="text-gray-500">{work.description}</p>
            <p className="text-gray-400">Pay: ${work.pay}</p>
          </div>
        </div>
      ))}
      <button
        onClick={handleClick}
        className="mt-4 w-full rounded-md bg-[#e5f9e0] py-2 text-[#2f9c95]"
      >
        See All Works
      </button>
    </div>
  );
};

export default WorkSection;
