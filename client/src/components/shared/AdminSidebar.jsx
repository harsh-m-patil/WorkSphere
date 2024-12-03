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
  'flex items-centre gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div className="flex h-screen w-60 flex-col bg-neutral-900 p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-lg text-neutral-100">WorkSphere</span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 py-8">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 border-t border-neutral-700 pt-2">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}

        {/* Logout button */}
        <div className="flex cursor-pointer items-center gap-2 px-3 py-2 text-red-500">
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          <span onClick={handleClick}>Logout</span>
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
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
