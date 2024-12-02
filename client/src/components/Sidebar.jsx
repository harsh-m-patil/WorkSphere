import { SideBarElement } from './SideBarElement';

const Sidebar = () => {
  return (
    <div className="hidden h-screen w-80 border border-r-gray-300 px-5 py-16 text-xl sm:block">
      <p className="mb-10 rounded-[40px] border border-teal-400 bg-teal-50 px-1 py-2 text-center text-3xl font-medium">
        <span className="font-semibold text-teal-600">WorkSphere</span>.
      </p>
      <ul>
        <SideBarElement text="Overview" to="/" />
        <SideBarElement text="Applications" to="applications" />
        <SideBarElement text="My Works" to="works" />
        <SideBarElement text="Settings" to="settings" />
      </ul>
    </div>
  );
};

export default Sidebar;
