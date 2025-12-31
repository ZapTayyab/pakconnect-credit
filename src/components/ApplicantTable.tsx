import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileCheck, XCircle, CheckCircle } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  cnic: string;
  score: number;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  loanAmount: number;
}

interface ApplicantTableProps {
  applicants: Applicant[];
  onView?: (id: string) => void;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "outline" as const,
    icon: FileCheck,
  },
  approved: {
    label: "Approved",
    variant: "default" as const,
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
    icon: XCircle,
  },
};

const getScoreColor = (score: number) => {
  if (score >= 700) return "text-success";
  if (score >= 500) return "text-warning";
  return "text-destructive";
};

export function ApplicantTable({ applicants, onView, className }: ApplicantTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Applicant
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CNIC
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Loan Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Applied
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applicants.map((applicant, index) => {
              const { label, variant, icon: StatusIcon } = statusConfig[applicant.status];
              return (
                <tr
                  key={applicant.id}
                  className="animate-fade-in transition-colors hover:bg-muted/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-medium text-foreground">{applicant.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-sm text-muted-foreground">{applicant.cnic}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={cn("font-display font-bold", getScoreColor(applicant.score))}>
                      {applicant.score}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-medium text-foreground">
                      PKR {applicant.loanAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {label}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="text-sm text-muted-foreground">{applicant.appliedDate}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(applicant.id)}
                      className="text-accent hover:text-accent/80"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
