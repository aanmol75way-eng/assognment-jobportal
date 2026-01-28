import { useMemo, useState } from "react";
import { useJobsList } from "@/hooks/jobs.hook";

import { useDebouncedValue } from "@/hooks/useDebounceValue";
import { JobsHeader } from "@/components/JobHeader";
import { JobsGrid } from "@/components/JobsGrid";
import { JobsPagination } from "@/components/JobPagination";

export default function JobsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 350);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data, isLoading } = useJobsList({
    q: debouncedSearch,
    page,
    pageSize,
  });

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.total / pageSize);
  }, [data, pageSize]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <JobsHeader
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
      />

      <JobsGrid
        isLoading={isLoading}
        jobs={data?.items ?? []}
        pageSize={pageSize}
        onClearSearch={() => {
          setSearchQuery("");
          setPage(1);
        }}
      />

      <JobsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
