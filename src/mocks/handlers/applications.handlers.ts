// src/mocks/handlers/applications.handlers.ts
import { delay, http, HttpResponse } from "msw";
import {
  createApplication,
  db,
  saveDb,
  type ApplicationStatus,
  type Application,
  type Job,
  type User,
} from "../db";
import { getAuthToken } from "../utils";

function requireAuth(request: Request) {
  const token = getAuthToken(request);
  if (!token)
    return {
      ok: false as const,
      res: HttpResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };

  let userId = db.sessions.get(token);

  // session restoration from token
  if (!userId && token && token.startsWith("fake-token-")) {
    const parts = token.split("-");
    const extractedUserId = parts[2];
    if (
      extractedUserId &&
      db.users.find((u: User) => u.id === extractedUserId)
    ) {
      userId = extractedUserId;
      db.sessions.set(token, userId);
      saveDb();
    }
  }

  if (!userId)
    return {
      ok: false as const,
      res: HttpResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };

  const user = db.users.find((u: User) => u.id === userId);
  if (!user)
    return {
      ok: false as const,
      res: HttpResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };

  return { ok: true as const, user };
}

export const applicationsHandlers = [
  // GET /api/applications (protected)
  http.get("/api/applications", async ({ request }) => {
    await delay(250);
    const auth = requireAuth(request);
    if (!auth.ok) return auth.res;

    // Filter based on role
    let apps: Application[] = [];
    if (auth.user.role === "recruiter") {
      apps = [...db.applications];
    } else {
      // Candidate: only show their own applications
      apps = db.applications.filter(
        (a: Application) =>
          a.email.toLowerCase() === auth.user.email.toLowerCase(),
      );
    }

    // Enrich with job details
    const enriched = apps.map((app: Application) => {
      const job = db.jobs.find((j: Job) => j.id === app.jobId);
      return {
        ...app,
        jobTitle: job?.title || "Unknown Job",
        companyName: job?.company || "Unknown Company",
      };
    });

    return HttpResponse.json({ items: enriched });
  }),

  // POST /api/applications (apply) - not protected
  http.post("/api/applications", async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as {
      jobId: string;
      fullName: string;
      email: string;
      phone: string;
      resumeUrl: string;
      coverLetter: string;
    };

    const jobExists = db.jobs.some((j: Job) => j.id === body.jobId);
    if (!jobExists)
      return HttpResponse.json({ message: "Invalid jobId" }, { status: 400 });

    const duplicate = db.applications.some(
      (a: Application) =>
        a.jobId === body.jobId &&
        a.email.toLowerCase() === body.email.toLowerCase(),
    );
    if (duplicate)
      return HttpResponse.json({ message: "Already applied" }, { status: 409 });

    const created = createApplication(body);
    // Note: createApplication handles saveDb
    return HttpResponse.json(created, { status: 201 });
  }),

  // PATCH /api/applications/:id (protected)
  http.patch("/api/applications/:id", async ({ request, params }) => {
    await delay(350);
    const auth = requireAuth(request);
    if (!auth.ok) return auth.res;

    if (auth.user.role !== "recruiter") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = (await request.json()) as { status?: string };
    const app = db.applications.find((a: Application) => a.id === params.id);
    if (!app)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });

    if (body.status) {
      const allowed = ["pending", "reviewed", "rejected", "accepted"] as const;
      if (!allowed.includes(body.status as ApplicationStatus)) {
        return HttpResponse.json(
          { message: "Invalid status" },
          { status: 400 },
        );
      }
      app.status = body.status as ApplicationStatus;
      saveDb();
    }

    return HttpResponse.json(app);
  }),
];
