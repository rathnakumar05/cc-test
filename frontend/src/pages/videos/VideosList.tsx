import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVideosQuery } from './requests/queries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function VideosList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, error } = useVideosQuery(page, limit);

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="text-destructive p-8 text-center">{error.message}</p>;

  const handleLimitChange = (value: string | null) => {
    if (value) {
      setLimit(Number(value));
      setPage(1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Homepage Videos</h1>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Rows per page:</span>
          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-17.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Facebook Link</TableHead>
              <TableHead>Twitter Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((video) => (
              <TableRow
                key={video.id}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => navigate(`/videos/${video.id}`)}
              >
                <TableCell className="max-w-50 truncate font-medium">{video.title}</TableCell>
                <TableCell className="max-w-75 truncate">{video.summary}</TableCell>
                <TableCell>
                  {video.facebookLink ? (
                    <a
                      href={video.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Facebook
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {video.twitterLink ? (
                    <a
                      href={video.twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Twitter
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/videos/${video.id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Showing {data.data.length} of {data.total} results
          </span>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: data.totalPages }, (_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === data.totalPages || Math.abs(pageNum - page) <= 1) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNum);
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                if (pageNum === 2 && page > 3) {
                  return (
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                if (pageNum === data.totalPages - 1 && page < data.totalPages - 2) {
                  return (
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(data.totalPages, p + 1));
                  }}
                  className={page === data.totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default VideosList;
