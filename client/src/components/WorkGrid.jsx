import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchWorks } from '@/query/fetchWorks';
import WorkCard from './WorkCard';

const ITEMS_PER_PAGE = 10;

export default function WorkGrid() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search);
    return () => debouncedSetSearch.cancel();
  }, [debouncedSetSearch, search]);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['search', page, debouncedSearch, sort],
    queryFn: () => fetchWorks(page, debouncedSearch, sort),
    staleTime: 10 * 1000,
  });

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

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <div className="mx-auto flex flex-col gap-4 px-10 sm:p-0">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full"
        />
        <Select value={sort} onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="pay">Pay</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div
          className="flex min-h-[400px] w-full items-center justify-center"
          aria-busy="true"
          aria-label="Loading"
        >
          <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="mx-auto flex w-full justify-center py-8">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.data?.map((work, index) => (
                <WorkCard work={work} key={work._id || index} index={index} />
              ))}
            </div>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 3), Math.min(page + 2, totalPages))
                .map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(pageNum)}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              {page + 2 < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages ? 'pointer-events-none opacity-50' : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
