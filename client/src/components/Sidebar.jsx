import { SideBarElement } from './SideBarElement';

const Sidebar = () => {
  return (
    <div className="hidden h-screen w-80 bg-gray-900 px-5 py-16 text-xl text-gray-200 sm:block">
      <p className="mb-10 rounded-[40px] border border-teal-400 bg-teal-900 py-2 text-center text-3xl font-medium">
        <span className="font-semibold text-teal-300">WorkSphere</span>.
      </p>
      <ul>
        <SideBarElement text="Overview" to="" />
        <SideBarElement text="Applications" to="applications" />
        <SideBarElement text="My Works" to="works" />
        <SideBarElement text="Settings" to="settings" />
      </ul>
    </div>
  );
};

export default Sidebar;
