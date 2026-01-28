// src/shared/jobApi.ts
import { apiFetch } from "@/shared/api";
import type { Job, JobsQuery, Paginated } from "@/types/jobs.type";

export const jobApi = {
  list: (query: JobsQuery) => {
    const sp = new URLSearchParams();
    if (query.q) sp.set("q", query.q);
    if (query.location) sp.set("location", query.location);
    if (typeof query.remote === "boolean") sp.set("remote", String(query.remote));
    sp.set("page", String(query.page));
    sp.set("pageSize", String(query.pageSize));

    return apiFetch<Paginated<Job>>(`/api/jobs?${sp.toString()}`, { method: "GET" });
  },

  byId: (id: string) => apiFetch<Job>(`/api/jobs/${id}`, { method: "GET" }),
};
