import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSideBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import MobileNavbar from '../components/DashBoardNavBar';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Use useEffect to handle navigation after component mounts
  useEffect(() => {
    if (!token) {
      toast.warning(
        'you do not have permission to come here,please login first',
        {
          position: 'top-center',
        }
      );
      navigate('/');
      return;
    }

    if (user && user.role === 'admin') {
      navigate('/admin');
      return;
    } else if (user.role === 'client') {
      navigate('/client/dashboard');
    }

    // console.log(user);
  }, [navigate, token, user]); // Dependency on navigate and token

  return (
    <div className="flex">
      <MobileNavbar />
      <UserSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
