import { motion } from 'motion/react';
import StatGrid from './StatGrid';
import { AreaChartGraph } from '../AreaChart';
import { AdminBarChart } from '../BarChart';
import { useQuery } from '@tanstack/react-query';
import { fetchUsersInfo } from '@/query/fetchUsersInfo';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMonth } from '@/utils/convertDate';

const Overview = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users-info'],
    queryFn: fetchUsersInfo,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Failed to load work details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  let chartData;
  if (stats) {
    chartData = stats
      ? stats.monthlyWorkStats.map((item) => ({
          month: `${getMonth(item._id.month)} ${item._id.year}`, // Use month-year for the label
          jobs: item.totalJobs, // The number of jobs for the month
          users: item.monthlyUsers, // The number of users for the month
        }))
      : [];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen px-4 py-8"
    >
      <StatGrid stats={stats} />
      <div className="grid grid-cols-1 gap-10 px-4 py-8 lg:grid-cols-2">
        <AreaChartGraph chartData={chartData} />
        <AdminBarChart chartData={chartData} />
      </div>
    </motion.div>
  );
};

export default Overview;
