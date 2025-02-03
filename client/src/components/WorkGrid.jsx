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
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

export default function WorkGrid() {
  // Initialize search params from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page'), 10) || 1;
  const initialSort = searchParams.get('sort') || 'createdAt';
  const initialLevel = searchParams.get('level') || 'All';
  const initialPay = searchParams.get('pay') || '';

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState(initialSort);
  const [level, setLevel] = useState(initialLevel);
  const [pay, setPay] = useState(initialPay);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  // Update the URL params when state changes
  useEffect(() => {
    setSearchParams({
      search: search,
      page: page.toString(),
      sort,
      level,
      pay,
    });
  }, [search, page, sort, level, pay, setSearchParams]);

  // Debounce search to avoid updating URL on every key stroke immediately
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      if (value.length >= 5) {
        setDebouncedSearch(value);
        setPage(1);
      } else {
        setDebouncedSearch('');
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search);
    return () => debouncedSetSearch.cancel();
  }, [debouncedSetSearch, search]);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['search', page, debouncedSearch, sort, level, pay],
    queryFn: () => fetchWorks(page, debouncedSearch, sort, level, pay),
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
    <div className="flex">
      <div className="w-full p-4 sm:p-10">
        {/* Header section */}
        <div className="flex items-center justify-center gap-3 py-3 text-slate-800">
          <h1 className="py-3 text-center text-2xl font-medium sm:text-3xl">
            Recommended Jobs
          </h1>
          <Badge
            variant="outline"
            className="flex size-10 items-center justify-center p-2 text-base"
          >
            {data?.total || 0}
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-10 sm:p-0">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full"
            />
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-0 text-base text-slate-700"
                >
                  Sort
                </Badge>
                <Select value={sort} onValueChange={(value) => setSort(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date</SelectItem>
                    <SelectItem value="pay">Pay</SelectItem>
                    <SelectItem value="noOfApplicants">Applicants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-0 text-base text-slate-700"
                >
                  Level
                </Badge>
                <Select
                  value={level}
                  onValueChange={(value) => setLevel(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-0 text-base text-slate-700"
                >
                  Pay
                </Badge>
                <Select value={pay} onValueChange={(value) => setPay(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="1000">Greater than $1000</SelectItem>
                    <SelectItem value="500">Greater than $500</SelectItem>
                    <SelectItem value="100">Greater than $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div
              className="flex min-h-[400px] w-full items-center justify-center"
              aria-busy="true"
              aria-label="Loading"
            >
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="mx-auto flex w-full justify-center py-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {data?.data?.map((work, index) => (
                    <WorkCard
                      work={work}
                      key={work._id || index}
                      index={index}
                    />
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
                      className={
                        page === 1 ? 'pointer-events-none opacity-50' : ''
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(
                      Math.max(0, page - 3),
                      Math.min(page + 2, totalPages)
                    )
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
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      aria-disabled={page === totalPages}
                      className={
                        page === totalPages
                          ? 'pointer-events-none opacity-50'
                          : ''
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
