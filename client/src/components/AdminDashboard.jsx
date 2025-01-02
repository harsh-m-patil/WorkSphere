import DashboardStatsGrid from './AdminDashboardStatsGrid';
import TransactionChart from './AdminTransactionChart';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <DashboardStatsGrid />
      <TransactionChart />
    </div>
  );
}
