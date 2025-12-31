import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const getScoreLevel = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 70) return { level: "high", color: "stroke-success", bgColor: "text-success" };
  if (percentage >= 40) return { level: "medium", color: "stroke-warning", bgColor: "text-warning" };
  return { level: "low", color: "stroke-destructive", bgColor: "text-destructive" };
};

const sizeConfig = {
  sm: { size: 80, strokeWidth: 6, fontSize: "text-lg" },
  md: { size: 120, strokeWidth: 8, fontSize: "text-2xl" },
  lg: { size: 160, strokeWidth: 10, fontSize: "text-4xl" },
};

export function ScoreGauge({
  score,
  maxScore = 850,
  size = "md",
  showLabel = true,
  label = "Credit Score",
  className,
}: ScoreGaugeProps) {
  const { size: svgSize, strokeWidth, fontSize } = sizeConfig[size];
  const { color, bgColor } = getScoreLevel(score, maxScore);
  
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-muted"
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn(color, "gauge-circle transition-all duration-1000")}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-bold", fontSize, bgColor)}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ {maxScore}</span>
        </div>
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
