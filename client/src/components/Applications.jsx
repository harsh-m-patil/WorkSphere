import ApplicationsTable from './ApplicationsTable';
import UserDashboardHeader from './UserDashboardHeader';

const Applications = () => {
  return (
    <div className="mt-12 flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-4 shadow sm:mt-8 md:mt-12">
      {/* Header */}

      <UserDashboardHeader title={'Applications'} />
      <ApplicationsTable />
    </div>
  );
};

export default Applications;
