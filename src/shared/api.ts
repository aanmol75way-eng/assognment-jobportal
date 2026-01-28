// fetch wrapper for the tanstack query and error handling

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(
  input: string,
  init?: RequestInit & { getToken?: () => string | null }
): Promise<T> {
  const headers = new Headers(init?.headers);

  headers.set("Content-Type", "application/json");

  const token = init?.getToken?.();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && data.message) ? data.message : "Request failed";
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}
