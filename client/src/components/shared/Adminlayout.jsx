import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Header from './AdminHeader';

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Use useEffect to handle navigation after component mounts
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]); // Dependency on navigate and token

  // If token is missing, navigate will handle the redirect
  if (!token) {
    return null; // Return null to prevent rendering the layout before redirection
  }

  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden bg-neutral-100">
      {/* Sidebar: Sticky */}
      <Sidebar className="h-screen sticky top-0" />
      <div className="flex-1 flex flex-col">
        {/* Header: Sticky */}
        <Header className="sticky top-0 z-10" />
        {/* Outlet: Scrollable */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
