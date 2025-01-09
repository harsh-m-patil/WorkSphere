import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WorkCard from './WorkCard';

const WorkGrid = ({ isLoading, isError, error, filteredWorks }) => {
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

  if (filteredWorks.length === 0) {
    return <NoWorkFound />;
  }

  return (
    <div className="mx-auto flex w-full justify-center py-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredWorks.map((work, index) => (
          <WorkCard work={work} key={work._id} index={index} />
        ))}
      </div>
    </div>
  );
};

const NoWorkFound = () => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold">No Works Found</h2>
      <p className="text-muted-foreground">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
};

export default WorkGrid;
