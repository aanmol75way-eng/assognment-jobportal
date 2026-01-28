// src/features/applications/api/applications.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "@/shared/applicationApi";
import { useAppSelector } from "@/hooks/hooks";
import type { ApplyInput, ApplicationStatus, ApplicationsListResponse } from "@/types/applicationType";
import { queryKeys } from "@/shared/queryKeys";

export function useApplications() {
  const token = useAppSelector((s) => s.auth.token);
  return useQuery({
    queryKey: queryKeys.applications(),
    queryFn: () => applicationsApi.list(() => token),
    enabled: Boolean(token),
  });
}

export function useApplyToJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ApplyInput) => applicationsApi.apply(input),
    onSuccess: () => {
      // recruiter dashboard updates
      qc.invalidateQueries({ queryKey: queryKeys.applications() });
    },
  });
}

export function useUpdateApplicationStatus() {
  const token = useAppSelector((s) => s.auth.token);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      applicationsApi.updateStatus(id, status, () => token),

    // optimistic update
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: queryKeys.applications() });

      const prev = qc.getQueryData<ApplicationsListResponse>(queryKeys.applications());
      if (!prev) return { prev };

      qc.setQueryData<ApplicationsListResponse>(queryKeys.applications(), {
        ...prev,
        items: prev.items.map((a) => (a.id === id ? { ...a, status } : a)),
      });

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.applications(), ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.applications() });
    },
  });
}
