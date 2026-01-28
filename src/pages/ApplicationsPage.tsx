import {
  useApplications,
  useUpdateApplicationStatus,
} from "@/hooks/application.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  Phone,
  FileText,
  Clock,
  ExternalLink,
  AlertCircle,
  Inbox,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ApplicationStatus } from "@/types/applicationType";

const statusColors: Record<ApplicationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  accepted: "bg-green-100 text-green-800 border-green-200",
};

export default function ApplicationsPage() {
  const { data, isLoading, error } = useApplications();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
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
          Failed to load applications
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later."}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Try Refreshing
        </Button>
      </div>
    );
  }

  const applications = data?.items || [];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage all candidate applications in one place.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed flex flex-col items-center justify-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No applications yet</h3>
          <p className="text-muted-foreground">
            When candidates apply, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="group hover:shadow-md transition-shadow border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold">
                    {app.jobTitle}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 font-medium">
                    <span className="text-foreground">{app.fullName}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {app.companyName}
                    </span>
                  </CardDescription>
                </div>
                <Badge
                  className={`${statusColors[app.status]} capitalize border px-2 py-0.5`}
                >
                  {app.status}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {app.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {app.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View Resume <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                {app.coverLetter && (
                  <div className="space-y-1.5 p-3 rounded-md bg-muted/50 border">
                    <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                      Cover Letter
                    </span>
                    <p className="text-sm line-clamp-3 leading-relaxed">
                      {app.coverLetter}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-muted/20 border-t py-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Applied{" "}
                  {formatDistanceToNow(new Date(app.createdAt), {
                    addSuffix: true,
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
                    Update Status:
                  </span>
                  <Select
                    disabled={isUpdating}
                    onValueChange={(val) =>
                      updateStatus({
                        id: app.id,
                        status: val as ApplicationStatus,
                      })
                    }
                    defaultValue={app.status}
                  >
                    <SelectTrigger className="w-[140px] h-9">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
