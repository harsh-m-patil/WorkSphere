import OverviewSection from './OverviewSection';
import Recent from './Recent';

const UserDashboard = () => {
  return (
    <div className="mt-10 flex w-full flex-col gap-4 bg-gray-50 sm:p-10 md:m-0">
      <OverviewSection />
      <Recent />
    </div>
  );
};

export default UserDashboard;
