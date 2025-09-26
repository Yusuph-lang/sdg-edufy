import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, icon, className }: StatCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-education border-0",
      "bg-gradient-card backdrop-blur-sm",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {value}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {icon && (
            <div className="rounded-full p-3 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}