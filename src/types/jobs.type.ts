// src/types/jobs.type.ts

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  description: string;
  createdAt: string;
};

export type JobsQuery = {
  q?: string;
  location?: string;
  remote?: boolean;
  page: number;
  pageSize: number;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number
};
