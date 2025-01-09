import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { columns } from './Columns';
import { DataTable } from './DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from '../query/fetchApplications';
import { toast } from 'sonner';
import { cancelApplication } from '@/mutation/cancelApplication';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: cancelApplication,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['applications']);
    },
    onError: (error) => {
      toast.error(error.message, { position: 'top-center' });
    },
  });

  const viewApplicationDetails = (applicationId) => {
    navigate(`/works/${applicationId}`);
  };
  const cancelApplicationHandler = (applicationId) => {
    cancelMutation.mutate(applicationId);
  };

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
      <DataTable
        columns={columns(cancelApplicationHandler, viewApplicationDetails)}
        data={applicationsWithStatus}
      />
    </div>
  );
}
