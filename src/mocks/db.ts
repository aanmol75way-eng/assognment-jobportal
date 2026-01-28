// src/mocks/db.ts
import { nanoid } from "@reduxjs/toolkit";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  description: string;
  createdAt: string;
};

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
};

export type UserRole = "candidate" | "recruiter";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // NOTE: for mock only
  password: string;
};

const now = () => new Date().toISOString();

const STORAGE_KEY = "job-board-mock-db";

const loadDb = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load mock DB", e);
  }
  return null;
};

const savedDb = loadDb();

export const db = {
  jobs: savedDb?.jobs || [
    {
      id: "job_1",
      title: "Frontend Engineer",
      company: "Acme",
      location: "Remote",
      isRemote: true,
      description: "Build UI with React, TanStack Query, and TypeScript.",
      createdAt: now(),
    },
    {
      id: "job_2",
      title: "React Developer",
      company: "BetaWorks",
      location: "Bangalore",
      isRemote: false,
      description: "Create dashboards, forms, and data-heavy pages.",
      createdAt: now(),
    },
    {
      id: "job_3",
      title: "UI Engineer",
      company: "CloudNine",
      location: "Hyderabad",
      isRemote: false,
      description: "Own UI components, accessibility, and performance.",
      createdAt: now(),
    },
  ],
  applications: savedDb?.applications || ([] as Application[]),
  users: savedDb?.users || [
    {
      id: "u_recruiter_1",
      name: "Recruiter Demo",
      email: "recruiter@demo.com",
      role: "recruiter",
      password: "Password@123",
    },
    {
      id: "u_candidate_1",
      name: "Candidate Demo",
      email: "candidate@demo.com",
      role: "candidate",
      password: "Password@123",
    },
  ],
  // Note: sessions are still Map in memory, but we can store them as object in LS
  sessions: new Map<string, string>(Object.entries(savedDb?.sessions || {})),
};

export function saveDb() {
  const data = {
    ...db,
    sessions: Object.fromEntries(db.sessions.entries()),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function createToken(userId: string) {
  const token = `fake-token-${userId}-${nanoid()}-${Date.now()}`;
  db.sessions.set(token, userId);
  saveDb();
  return token;
}

export function createApplication(
  input: Omit<Application, "id" | "status" | "createdAt">,
) {
  const app: Application = {
    id: nanoid(),
    status: "pending",
    createdAt: now(),
    ...input,
  };
  db.applications.unshift(app);
  saveDb();
  return app;
}
