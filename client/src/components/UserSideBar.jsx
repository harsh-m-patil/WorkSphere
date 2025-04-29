import { SideBarElement } from './SideBarElement';
import {
  HomeIcon,
  DocumentIcon,
  CogIcon,
  UsersIcon,
  UserIcon,
} from '@heroicons/react/outline'; // Importing icons

import { Brain } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <div className="sticky top-0 col-span-12 hidden h-screen bg-gray-900 px-5 py-16 text-xl text-gray-200 lg:col-span-3 lg:block">
      <p
        className="mb-10 cursor-pointer rounded-[40px] border border-teal-400 bg-teal-900 py-2 text-center text-3xl font-medium"
        onClick={handleClick}
      >
        <span className="font-semibold text-teal-300">WorkSphere</span>.
      </p>
      <ul>
        <SideBarElement
          text="Overview"
          to=""
          icon={<HomeIcon className="h-5 w-5" />}
        />
        <SideBarElement
          text="Applications"
          to="applications"
          icon={<DocumentIcon className="h-5 w-5" />}
        />
        <SideBarElement
          text="My Works"
          to="works"
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <SideBarElement
          text="Profile"
          to="profile"
          icon={<UserIcon className="h-5 w-5" />}
        />
        <SideBarElement
          text="AI Studio"
          to="ai"
          icon={<Brain className="h-5 w-5" />}
        />
        <SideBarElement
          text="Settings"
          to="settings"
          icon={<CogIcon className="h-5 w-5" />}
        />
      </ul>
    </div>
  );
};

export default UserSidebar;
