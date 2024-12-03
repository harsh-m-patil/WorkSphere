import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Header from './AdminHeader';

export default function Layout() {
  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden bg-neutral-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}
