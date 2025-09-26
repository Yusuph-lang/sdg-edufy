import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  number: string;
  title: string;
  description: string;
  progress?: number;
  status?: "achieved" | "in-progress" | "needs-attention";
  className?: string;
}

export function GoalCard({ 
  number, 
  title, 
  description, 
  progress = 0, 
  status = "in-progress",
  className 
}: GoalCardProps) {
  const statusColors = {
    achieved: "bg-secondary text-secondary-foreground",
    "in-progress": "bg-primary text-primary-foreground",
    "needs-attention": "bg-accent text-accent-foreground"
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-education",
      "border-l-4 border-l-primary bg-gradient-subtle",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-full w-10 h-10 bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {number}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {status === "achieved" ? "✓" : status === "in-progress" ? "→" : "!"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4">{description}</p>
        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}