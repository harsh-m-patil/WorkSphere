// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 px-4 py-6 text-white">
      <h2 className="mb-8 text-3xl font-bold">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/dashboard"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dashboard/users"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dashboard/jobs"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Manage Jobs
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dashboard/analytics"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
