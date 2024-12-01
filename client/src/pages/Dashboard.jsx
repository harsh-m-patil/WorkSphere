import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
};

export default Dashboard;
