import OverviewCard from './OverviewCard';

const OverviewSection = () => {
  const data = {
    applications: {
      title: 'Total Applications',
      data: 50,
      type: 'total',
    },
    rejected: {
      title: 'Applications Rejected',
      data: 30,
      type: 'rejected',
    },
    pending: {
      title: 'Pending Applications',
      data: 20,
      type: 'pending',
    },
    earning: {
      title: 'Money Earned',
      data: '₹ 10000',
      type: 'earning',
    },
  };
  return (
    <div className="p-5">
      <h1 className="p-5 text-4xl font-medium">Overview</h1>
      <div className="flex flex-wrap justify-start">
        <OverviewCard {...data.applications} />
        <OverviewCard {...data.rejected} />
        <OverviewCard {...data.pending} />
        <OverviewCard {...data.earning} />
      </div>
    </div>
  );
};

export default OverviewSection;
