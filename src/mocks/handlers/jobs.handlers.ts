// src/mocks/handlers/jobs.handlers.ts
import { delay, http, HttpResponse } from "msw";
import { db } from "../db";
import type { Job } from "../../types/jobs.type";

export const jobsHandlers = [
  // GET /api/jobs?q=&location=&remote=&page=&pageSize=
  http.get("/api/jobs", async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);

    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const location = (url.searchParams.get("location") ?? "").toLowerCase();
    const remote = url.searchParams.get("remote"); // "true" | "false" | null
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");

    let items = db.jobs.slice();

    if (q) {
      items = items.filter(
        (j: Job) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
      );
    }
    if (location) items = items.filter((j: Job) => j.location.toLowerCase().includes(location));
    if (remote === "true") items = items.filter((j: Job) => j.isRemote);
    if (remote === "false") items = items.filter((j: Job) => !j.isRemote);

    const total = items.length;
    const start = (page - 1) * pageSize;
    const paged = items.slice(start, start + pageSize);

    return HttpResponse.json({ items: paged, page, pageSize, total });
  }),

  // GET /api/jobs/:id
  http.get("/api/jobs/:id", async ({ params }) => {
    await delay(200);
    const job = db.jobs.find((j: Job) => j.id === params.id);
    if (!job) return HttpResponse.json({ message: "Job not found" }, { status: 404 });
    return HttpResponse.json(job);
  }),
];
