// src/shared/authApi.ts
import { apiFetch } from "@/shared/api";
import type { LoginInput, LoginResponse, MeResponse, LogoutResponse } from "@/types/auth.type";

export const authApi = {
  login: (input: LoginInput) =>
    apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  me: (getToken: () => string | null) =>
    apiFetch<MeResponse>("/api/auth/me", {
      method: "GET",
      getToken,
    }),

  logout: (getToken: () => string | null) =>
    apiFetch<LogoutResponse>("/api/auth/logout", {
      method: "POST",
      getToken,
    }),
};
