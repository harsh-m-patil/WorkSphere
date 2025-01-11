import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input'; // Example component
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', page, debouncedSearch],
    queryFn: () => fetchWorks(page, debouncedSearch),
  });

  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading data</div>
      ) : (
        <div>
          <div className="mx-auto flex w-full justify-center py-8">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.data.map((work, index) => (
                <WorkCard work={work} key={work._id} index={index} />
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
              {Array.from(
                { length: Math.ceil(data.total / ITEMS_PER_PAGE) },
                (_, i) => i + 1
              )
                .slice(
                  Math.max(0, page - 2),
                  Math.min(page + 1, Math.ceil(data.total / ITEMS_PER_PAGE))
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
              {page + 1 < Math.ceil(data.total / ITEMS_PER_PAGE) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(Math.ceil(data.total / ITEMS_PER_PAGE), p + 1)
                    )
                  }
                  aria-disabled={
                    page === Math.ceil(data.total / ITEMS_PER_PAGE)
                  }
                  className={
                    page === Math.ceil(data.total / ITEMS_PER_PAGE)
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
