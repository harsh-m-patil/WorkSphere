import OverviewCard from './OverviewCard';
import UserDashboardHeader from './UserDashboardHeader';
import { useQuery } from '@tanstack/react-query';
import { fetchLoggedInUser } from '../query/fetchLoggedInUser';

const OverviewSection = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: fetchLoggedInUser,
    staleTime: 60 * 1000,
  });

  // Data for the OverviewCard components
  const placeHolderData = {
    applications: {
      title: 'Total Applications',
      type: 'total',
    },
    pending: {
      title: 'Rejected Or Pending',
      data: 30, // Placeholder, update as needed
      type: 'rejected',
    },
    accepted: {
      title: 'Accepted Applications',
      data: 20, // Placeholder, update as needed
      type: 'pending',
    },
    earning: {
      title: 'Money Earned',
      type: 'earning',
    },
  };

  if (isPending) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow shadow-gray-300">
        <h1 className="p-2 text-4xl font-medium sm:p-5">Overview</h1>
        <div className="grid animate-pulse grid-cols-1 justify-start md:grid-cols-2 2xl:grid-cols-4">
          {/* Total Applications Card */}
          <OverviewCard
            {...placeHolderData.applications}
            data={0} // Pass total applications data
          />
          {/* Rejected Applications Card */}
          <OverviewCard
            {...placeHolderData.pending}
            data={0} // Pass rejected applications data (you can fetch this dynamically)
          />
          {/* Pending Applications Card */}
          <OverviewCard
            {...placeHolderData.accepted}
            data={0} // Pass pending applications data (you can fetch this dynamically)
          />
          {/* Earnings Card */}
          <OverviewCard
            {...placeHolderData.earning}
            data={0} // Pass balance data (earnings)
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Error state
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow shadow-gray-300">
      <UserDashboardHeader title="My Profile" />
      <div className="grid grid-cols-1 justify-start sm:grid-cols-2 md:grid-cols-4">
        {/* Total Applications Card */}
        <OverviewCard
          {...placeHolderData.applications}
          data={data.noOfApplications} // Pass total applications data
        />
        {/* Rejected Applications Card */}
        <OverviewCard
          {...placeHolderData.pending}
          data={`${data.noOfApplications - data.works?.length}`} // Pass rejected applications data (you can fetch this dynamically)
        />
        {/* Pending Applications Card */}
        <OverviewCard
          {...placeHolderData.accepted}
          data={data.works?.length} // Pass pending applications data (you can fetch this dynamically)
        />
        {/* Earnings Card */}
        <OverviewCard
          {...placeHolderData.earning}
          data={`$ ${data.balance}`} // Pass balance data (earnings)
        />
      </div>
    </div>
  );
};

export default OverviewSection;
