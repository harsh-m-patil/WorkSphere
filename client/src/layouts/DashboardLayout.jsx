import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSideBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Use useEffect to handle navigation after component mounts
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // console.log(user);
    if (!user || user.role !== 'freelancer') {
      toast.warning('You Do not have permission to come here', {
        position: 'top-center',
      });
      navigate('/');
    }
  }, [navigate, token, user]); // Dependency on navigate and token

  // If token is missing, navigate will handle the redirect
  if (!token || user.role !== 'freelancer') {
    return null; // Return null to prevent rendering the layout before redirection
  }

  return (
    <div className="flex">
      <UserSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
