import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  description: string;
  createdAt: string;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1">
            {job.title}
          </CardTitle>

          {job.isRemote && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shrink-0"
            >
              Remote
            </Badge>
          )}
        </div>

        <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {job.location}
        </div>

        <p className="text-sm line-clamp-3 leading-relaxed text-muted-foreground min-h-[4.5rem]">
          {job.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
        </div>

        <Button asChild size="sm" variant="default" className="group-hover:bg-primary group-hover:text-primary-foreground">
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
