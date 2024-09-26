import { FiHome, FiFolder, FiCheckSquare, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/user/dashboard");
  };

  const handleAppClick = () => {
    navigate("/user/dashboard/applications");
  };

  const handleWorkClick = () => {
    navigate("/user/dashboard/works");
  };
  return (
    <div className="sticky top-4 h-[calc(100vh-4rem)] w-64 border-r bg-white p-6">
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={FiHome} label="Home" onClick={handleHomeClick} />
        <SidebarItem
          icon={FiFolder}
          label="Applications"
          onClick={handleAppClick}
        />
        <SidebarItem
          icon={FiCheckSquare}
          label="Works"
          onClick={handleWorkClick}
        />
        <SidebarItem icon={FiSettings} label="Settings" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, onClick }) => (
  <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100">
    <Icon className="text-xl" />
    <span className="font-medium" onClick={onClick}>
      {label}
    </span>
  </div>
);

export default Sidebar;
