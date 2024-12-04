import classNames from 'classnames';
import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from '../lib/consts/AdminNavigation';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi'; // Ensure this path is correct

const linkClasses =
  'flex items-center gap-4 font-semibold px-6 py-4 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-lg text-xl';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <div className="flex h-screen w-72 flex-col bg-neutral-900 p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-3 py-5">
        <FcBullish fontSize={40} />
        <span className="text-3xl font-bold text-neutral-100">WorkSphere</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-1 flex-col gap-4 py-8">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col gap-4 border-t border-neutral-700 pt-6">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}

        {/* Logout button */}
        <div
          className="flex cursor-pointer items-center gap-4 px-6 py-4 text-red-500 text-xl"
          onClick={handleClick}
        >
          <span className="text-3xl">
            <HiOutlineLogout />
          </span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? 'bg-neutral-700 text-white'
          : 'text-neutral-400',
        linkClasses
      )}
    >
      <span className="text-3xl">{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}
