import { useParams, Link } from "react-router";
import { useJob } from "@/hooks/jobs.hook";
import { ApplyForm } from "@/components/ApplyForm";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ApplyPage = () => {
  const { id } = useParams();
  const { data: job, isLoading } = useJob(id!);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl space-y-8">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <Link
          to="/jobs"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Return to jobs list
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <Link
          to={`/jobs/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Job Details
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-2">
          Apply Now
        </h1>
        <p className="text-muted-foreground">
          You are applying for{" "}
          <span className="font-semibold text-foreground">{job.title}</span> at{" "}
          <span className="font-semibold text-foreground">{job.company}</span>
        </p>
      </div>

      <ApplyForm jobId={id!} jobTitle={job.title} />
    </div>
  );
};

export default ApplyPage;
