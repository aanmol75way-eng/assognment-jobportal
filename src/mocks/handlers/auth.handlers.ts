// src/mocks/handlers/auth.handlers.ts
import { delay, http, HttpResponse } from "msw";
import { db, createToken } from "../db";
import { getAuthToken } from "../utils";
import type { User } from "../../types/auth.type";
export const authHandlers = [
  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    await delay(450);
    const body = (await request.json()) as { email: string; password: string };

    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    const user = db.users.find((u: User) => u.email.toLowerCase() === email);
    if (!user || user.password !== password) {
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = createToken(user.id);
    db.sessions.set(token, user.id);

    // never return password
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return HttpResponse.json({ user: safeUser, token }, { status: 200 });
  }),

  // GET /api/auth/me  (validate token and return user)
  http.get("/api/auth/me", async ({ request }) => {
    await delay(200);
    const token = getAuthToken(request);
    if (!token)
      return HttpResponse.json({ message: "Missing token" }, { status: 401 });

    let userId = db.sessions.get(token);

    // session restoration from token
    if (!userId && token.startsWith("fake-token-")) {
      const parts = token.split("-");
      const extractedUserId = parts[2]; // fake-token-userId-nanoid-timestamp
      if (extractedUserId && db.users.find((u: User) => u.id === extractedUserId)) {
        userId = extractedUserId;
        db.sessions.set(token, userId);
      }
    }

    if (!userId)
      return HttpResponse.json({ message: "Invalid token" }, { status: 401 });

    const user = db.users.find((u: User) => u.id === userId);
    if (!user)
      return HttpResponse.json({ message: "User not found" }, { status: 401 });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return HttpResponse.json({ user: safeUser }, { status: 200 });
  }),

  // POST /api/auth/logout
  http.post("/api/auth/logout", async ({ request }) => {
    await delay(150);
    const token = getAuthToken(request);
    if (token) db.sessions.delete(token);
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];
