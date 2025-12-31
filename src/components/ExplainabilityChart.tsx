import { cn } from "@/lib/utils";

interface DataPoint {
  factor: string;
  score: number;
  maxScore: number;
  impact: "positive" | "negative" | "neutral";
  description: string;
}

interface ExplainabilityChartProps {
  data: DataPoint[];
  className?: string;
}

export function ExplainabilityChart({ data, className }: ExplainabilityChartProps) {
  const getImpactColor = (impact: DataPoint["impact"]) => {
    switch (impact) {
      case "positive":
        return "bg-success";
      case "negative":
        return "bg-destructive";
      default:
        return "bg-muted-foreground";
    }
  };

  const getImpactBgColor = (impact: DataPoint["impact"]) => {
    switch (impact) {
      case "positive":
        return "bg-success/10";
      case "negative":
        return "bg-destructive/10";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-display text-lg font-semibold text-foreground">
        Score Breakdown
      </h3>
      <div className="space-y-3">
        {data.map((point, index) => {
          const percentage = (point.score / point.maxScore) * 100;
          return (
            <div
              key={point.factor}
              className="animate-slide-up rounded-lg border border-border bg-card p-4 transition-all hover:shadow-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      getImpactColor(point.impact)
                    )}
                  />
                  <span className="font-medium text-foreground">{point.factor}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {point.score}/{point.maxScore}
                </span>
              </div>
              <div className={cn("h-2 w-full rounded-full", getImpactBgColor(point.impact))}>
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    getImpactColor(point.impact)
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
