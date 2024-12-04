import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import Header from './AdminHeader';
import { toast } from 'sonner';

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Use useEffect to handle navigation after component mounts
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // console.log(user);
    if (!user || user.role !== 'admin') {
      toast.warning('You Do not have permission to come here', {
        position: 'top-center',
      });
      navigate('/');
    }
  }, [navigate, token, user]); // Dependency on navigate and token

  // If token is missing, navigate will handle the redirect
  if (!token || user.role !== 'admin') {
    return null; // Return null to prevent rendering the layout before redirection
  }

  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden bg-neutral-100">
      {/* Sidebar: Sticky */}
      <Sidebar className="sticky top-0 h-screen" />
      <div className="flex flex-1 flex-col">
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
