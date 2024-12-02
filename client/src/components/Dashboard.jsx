import OverviewSection from './OverviewSection';
import Recent from './Recent';

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4 bg-gray-50 p-10">
      <OverviewSection />
      <Recent />
    </div>
  );
};

export default Dashboard;
