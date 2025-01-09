import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { columns } from './Columns';
import { DataTable } from './DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from '../query/fetchApplications';

export default function ApplicationsTable() {
  const {
    data: applications,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 60 * 1000,
  });

  const userId = localStorage.getItem('id');

  function getStatus(appl, userId) {
    if (appl.freelancer_id === userId) {
      return 'Accepted';
    } else if (appl.freelancer_id) {
      return 'Rejected';
    } else {
      return 'Pending';
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'Something went wrong. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Add the status field to each application
  const applicationsWithStatus = applications.map((appl) => ({
    ...appl,
    status: getStatus(appl, userId),
    noOfAppl: appl.applied_status?.length,
    postedBy: appl.client_id?.userName,
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={applicationsWithStatus} />
    </div>
  );
}
