import { authHandlers } from "./auth.handlers";
import { jobsHandlers } from "./jobs.handlers";
import { applicationsHandlers } from "./applications.handlers";

export const handlers = [
    ...authHandlers,
    ...jobsHandlers,
    ...applicationsHandlers,
];