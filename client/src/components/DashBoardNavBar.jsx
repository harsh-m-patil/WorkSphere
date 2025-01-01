import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  DocumentIcon,
  CogIcon,
  UsersIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { text: 'Overview', to: '', icon: <HomeIcon className="h-5 w-5" /> },
    {
      text: 'Applications',
      to: 'applications',
      icon: <DocumentIcon className="h-5 w-5" />,
    },
    { text: 'My Works', to: 'works', icon: <UsersIcon className="h-5 w-5" /> },
    { text: 'Profile', to: 'profile', icon: <UserIcon className="h-5 w-5" /> },
    { text: 'Settings', to: 'settings', icon: <CogIcon className="h-5 w-5" /> },
  ];

  return (
    <nav className="lg:hidden">
      {/* Fixed top bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <p
          className="cursor-pointer text-xl font-medium text-gray-800"
          onClick={handleLogoClick}
        >
          <span className="font-semibold text-teal-600">WorkSphere</span>.
        </p>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded p-2 text-gray-600 hover:bg-gray-100"
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`fixed left-0 right-0 top-[57px] z-40 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col px-4 py-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.text}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-teal-50 font-medium text-teal-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[57px]" />
    </nav>
  );
};

export default MobileNavbar;
