import { useMemo } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ICustomPaginationProps {
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange(page: number | string): void;
}

export default function CustomPagination({ totalItems, page, pageSize, onPageChange }: ICustomPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const maxVisiblePages = 5; // Number of visible pages before collapsing

  const pageNumbers = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', page, '...', totalPages];
  }, [totalPages, page]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </PaginationItem>
        {pageNumbers.map((num, idx) =>
          num === '...' ? (
            <PaginationItem key={idx + num}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                isActive={num === page}
                onClick={e => {
                  e.preventDefault();
                  onPageChange(num);
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
