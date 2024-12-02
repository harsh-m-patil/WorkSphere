import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FetchWorks from '../components/FetchWorks';

const MainLayout = () => {
  return (
    <div className="">
      <FetchWorks />
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
