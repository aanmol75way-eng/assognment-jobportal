// src/types/applicationType.ts
export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "rejected"
  | "accepted";

export type Application = {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: string;
  jobTitle?: string;
  companyName?: string;
};

export type ApplyInput = Omit<Application, "id" | "status" | "createdAt">;

export type ApplicationsListResponse = {
  items: Application[];
};

export type ApplyResponse = Application;

export type UpdateStatusResponse = Application;
