// src/types/auth.type.ts
// types for auth

export type User = {
  id: string;
  name: string;
  email: string;
  role: "candidate" | "recruiter"
};

export type LoginInput = {
  email: string;
  password: string
};

export type LoginResponse = {
  user: User;
  token: string
};

export type MeResponse = {
  user: User
};

export type LogoutResponse = {
  ok: true
};
