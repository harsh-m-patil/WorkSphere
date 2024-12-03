import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSideBar';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');
  }

  return (
    <div className="flex">
      <UserSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
