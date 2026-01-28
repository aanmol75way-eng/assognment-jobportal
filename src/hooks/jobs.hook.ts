import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/queryKeys";
import { jobApi } from "@/shared/jobApi";
import type { JobsQuery } from "@/types/jobs.type";

export function useJobsList(query: JobsQuery) {
  return useQuery({
    queryKey: queryKeys.jobs(query),
    queryFn: () => jobApi.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: queryKeys.job(id),
    queryFn: () => jobApi.byId(id),
    enabled: Boolean(id),
  });
}