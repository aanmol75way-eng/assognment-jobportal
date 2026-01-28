import { useParams } from "react-router";
import { useJob } from "@/hooks/jobs.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, DollarSign, Calendar, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";




const JobDeatail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useJob(id!);
  console.log(data)


  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-5xl space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <Skeleton className="h-12 w-40" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Skeleton className="md:col-span-2 h-[400px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Link to="/jobs" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Jobs
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{data?.title}</h1>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Full-time
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Remote
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
              <DollarSign className="w-3.5 h-3.5 mr-1.5" /> $120k - $160k
            </Badge>
          </div>
        </div>
        <Button onClick={() => {
          navigate(`/apply/${data?.id}`)
        }} size="lg" className="w-full md:w-auto px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
          Apply Now
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-md bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Description</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {data?.description}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> Posted on
                </span>
                <span className="font-medium">Oct 24, 2023</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Location
                </span>
                <span className="font-medium">San Francisco, CA</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" /> Experience
                </span>
                <span className="font-medium">Mid-Senior Level</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDeatail;