// src/mocks/utils.ts
export function getAuthToken(request: Request): string | null {
  const header = request.headers.get("Authorization");
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token.trim();
}
