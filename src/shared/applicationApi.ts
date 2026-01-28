// src/shared/applicationApi.ts
import { apiFetch } from "@/shared/api";
import type {
  ApplyInput,
  ApplicationsListResponse,
  ApplyResponse,
  UpdateStatusResponse,
  ApplicationStatus,
} from "@/types/applicationType";

export const applicationsApi = {
  list: (getToken: () => string | null) =>
    apiFetch<ApplicationsListResponse>("/api/applications", {
      method: "GET",
      getToken,
    }),

  apply: (input: ApplyInput) =>
    apiFetch<ApplyResponse>("/api/applications", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  updateStatus: (id: string, status: ApplicationStatus, getToken: () => string | null) =>
    apiFetch<UpdateStatusResponse>(`/api/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      getToken,
    }),
};
