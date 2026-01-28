export const queryKeys = {
  jobs: (params: unknown) => ["jobs", params] as const,
  job: (id: string) => ["job", id] as const,
  applications: () => ["applications"] as const,
};
