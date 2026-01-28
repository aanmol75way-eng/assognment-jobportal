import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProviders } from "./AppProvider.tsx";
import { router } from "./routes/router.tsx";
import { RouterProvider } from "react-router";

async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browse");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
enableMocks().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </StrictMode>,
  );
});

// api endpoints mocking are :
// POST /api/auth/login
// GET /api/auth/me
// POST /api/auth/logout
// GET /api/jobs
// GET /api/jobs/:id
// POST /api/applications
// GET /api/applications (auth + recruiter)
// PATCH /api/applications/:id (auth + recruiter)
