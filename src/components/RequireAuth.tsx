import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "@/hooks/hooks";

export function RequireAuth({ role }: { role?: "candidate" | "recruiter" }) {
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/jobs" replace />;
  }

  return <Outlet />;
}
