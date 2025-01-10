import { DollarSign } from 'lucide-react';
import StatCard from './StatCard';
import { User } from 'lucide-react';
import { User2 } from 'lucide-react';
import { Briefcase } from 'lucide-react';

// Helper function to get stats by type (client, freelancer)
const getUserStat = (type, statArray) => {
  const stat = statArray.find((item) => item._id === type);
  return stat ? stat.totalUsers : 0;
};

const StatGrid = ({ stats }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<DollarSign className="h-8 w-8 rounded-full border p-1" />}
        title="Total Earnings"
        value={
          stats && stats.workStats && stats.workStats.length > 0
            ? (stats.workStats[0].totalPay * 0.1).toFixed(2) // Calculate 10% and format to 2 decimal places
            : 'Loading...'
        }
        className="p-2 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
      />
      <StatCard
        icon={<User className="h-8 w-8 rounded-full border p-1" />}
        title="Total Freelancers"
        value={
          stats ? getUserStat('freelancer', stats.userStats) : 'Loading ...'
        }
        className="p-2 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
      />
      <StatCard
        icon={<User2 className="h-8 w-8 rounded-full border p-1" />}
        title="Total Clients"
        value={stats ? getUserStat('client', stats.userStats) : 'Loading ...'}
        className="p-2 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
      />
      <StatCard
        icon={<Briefcase className="h-8 w-8 rounded-full border p-1" />}
        title="Total Earnings"
        value={
          stats && stats.workStats && stats.workStats.length > 0
            ? stats.workStats[0].totalTasks
            : 'Loading...'
        }
        className="p-2 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
      />
    </div>
  );
};

export default StatGrid;
