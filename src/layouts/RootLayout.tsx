import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Link, Outlet, useNavigate, NavLink } from "react-router";
import { logoutThunk } from "@/store /thunk/authThunk";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RootLayout() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/jobs");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-foreground" : "text-muted-foreground",
    );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/jobs" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight">HireHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/jobs" className={navLinkClass}>
                Browse Jobs
              </NavLink>
              {user?.role === "recruiter" && (
                <NavLink to="/applications" className={navLinkClass}>
                  Applications
                </NavLink>
              )}
              {user?.role === "candidate" && (
                <NavLink to="/my-applications" className={navLinkClass}>
                  My Applications
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login?role=candidate">Candidate Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/login?role=recruiter">Recruiter Login</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-none">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
