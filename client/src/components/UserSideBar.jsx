import { FiHome, FiFolder, FiCheckSquare, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="sticky top-4 h-[calc(100vh-4rem)] w-64 border-r bg-white p-6">
      <nav className="flex flex-col gap-4">
        <SidebarItem icon={FiHome} label="Home" />
        <SidebarItem icon={FiFolder} label="Applications" />
        <SidebarItem icon={FiCheckSquare} label="Works" />
        <SidebarItem icon={FiSettings} label="Settings" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label }) => (
  <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100">
    <Icon className="text-xl" />
    <span className="font-medium">{label}</span>
  </div>
);

export default Sidebar;
