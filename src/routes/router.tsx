import { createBrowserRouter, Navigate } from "react-router";
import { RequireAuth } from "@/components/RequireAuth";
import RootLayout from "@/layouts/RootLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import JobsListPage from "@/pages/JobsListPage";
import JobDeatail from "@/pages/JobDeatail";
import LoginPage from "@/pages/LoginPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import ApplyPage from "@/pages/ApplyPage";
import CandidateApplicationsPage from "@/pages/CandidateApplicationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Redirect root to /jobs
      { index: true, element: <Navigate to="/jobs" replace /> },

      // Public routes
      { path: "jobs", Component: JobsListPage },
      { path: "jobs/:id", Component: JobDeatail },
      { path: "login", Component: LoginPage },

      // Protected routes (candidate)
      {
        element: <RequireAuth role="candidate" />,
        children: [
          { path: "apply/:id", Component: ApplyPage },
          { path: "my-applications", Component: CandidateApplicationsPage },
        ],
      },

      // Protected routes (recruiter only)
      {
        element: <RequireAuth role="recruiter" />,
        Component: ProtectedLayout,
        children: [{ path: "applications", Component: ApplicationsPage }],
      },

      // Fallback - redirect unknown routes to /jobs
      { path: "*", element: <Navigate to="/jobs" replace /> },
    ],
  },
]);
