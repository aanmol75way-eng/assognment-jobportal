import { useApplications } from "@/hooks/application.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Clock,
  AlertCircle,
  Inbox,
  FileText,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ApplicationStatus } from "@/types/applicationType";
import { Link } from "react-router";

const statusColors: Record<ApplicationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
};

export default function CandidateApplicationsPage() {
  const { data, isLoading, error } = useApplications();
  console.log(data);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
          <Skeleton className="h-4 w-96 mx-auto md:mx-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-red-50 p-6 rounded-full mb-4">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-red-700">
          Failed to load your applications
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  const applications = data?.items || [];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-1">
            Track the status of your submitted job applications.
          </p>
        </div>
        <Link
          to="/jobs"
          className="text-sm font-medium text-primary hover:underline"
        >
          Browse more jobs →
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed flex flex-col items-center justify-center space-y-4">
          <div className="bg-background p-4 rounded-full shadow-sm">
            <Inbox className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              You haven't applied to any jobs yet
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Once you start applying, you'll be able to track your application
              status here.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Start Applying
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="flex flex-col group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="pb-4 relative">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 p-2 rounded-lg mb-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    className={`${statusColors[app.status]} capitalize border`}
                  >
                    {app.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-1">
                  {app.jobTitle}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-1 font-medium text-foreground">
                  <div className="flex items-center gap-1 text-muted-foreground mr-2">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{app.companyName}</span>
                  </div>
                  <FileText className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                  <span>
                    Applied {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg border text-sm italic line-clamp-3">
                  "{app.coverLetter}"
                </div>

                <div className="flex items-center gap-2 text-sm text-primary font-medium hover:underline cursor-pointer group-hover:gap-3 transition-all">
                  <ExternalLink className="h-4 w-4" />
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Submitted Resume
                  </a>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDistanceToNow(new Date(app.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
