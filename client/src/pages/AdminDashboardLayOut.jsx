import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSideBar';
import { Badge } from '@/components/ui/badge';
import { getDate } from '@/utils/convertDate';

const AdminDashboardLayOut = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-50">
        <div className="flex justify-between px-5 pt-5">
          <SidebarTrigger />
          <Badge
            variant="outline"
            className="bg-white text-lg font-normal shadow-lg"
          >
            {getDate()}
          </Badge>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AdminDashboardLayOut;
