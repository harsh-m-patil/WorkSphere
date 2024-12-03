import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSideBar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
