import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { ApplicantTable } from "@/components/ApplicantTable";
import { ExplainabilityChart } from "@/components/ExplainabilityChart";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockApplicants = [
  {
    id: "1",
    name: "Ahmed Hassan",
    cnic: "42201-1234567-1",
    score: 742,
    status: "approved" as const,
    appliedDate: "Dec 28, 2024",
    loanAmount: 50000,
  },
  {
    id: "2",
    name: "Fatima Khan",
    cnic: "35202-9876543-2",
    score: 658,
    status: "pending" as const,
    appliedDate: "Dec 27, 2024",
    loanAmount: 75000,
  },
  {
    id: "3",
    name: "Muhammad Ali",
    cnic: "42301-5555555-3",
    score: 425,
    status: "rejected" as const,
    appliedDate: "Dec 26, 2024",
    loanAmount: 100000,
  },
  {
    id: "4",
    name: "Ayesha Malik",
    cnic: "54400-1111111-4",
    score: 789,
    status: "approved" as const,
    appliedDate: "Dec 25, 2024",
    loanAmount: 30000,
  },
  {
    id: "5",
    name: "Usman Raza",
    cnic: "31201-2222222-5",
    score: 512,
    status: "pending" as const,
    appliedDate: "Dec 24, 2024",
    loanAmount: 60000,
  },
];

const explainabilityData = [
  {
    factor: "Mobile Wallet Activity",
    score: 85,
    maxScore: 100,
    impact: "positive" as const,
    description: "Regular JazzCash transactions showing consistent income",
  },
  {
    factor: "Telecom Usage History",
    score: 62,
    maxScore: 100,
    impact: "positive" as const,
    description: "3+ year account with on-time recharges",
  },
  {
    factor: "Utility Payment Record",
    score: 28,
    maxScore: 100,
    impact: "negative" as const,
    description: "2 late electricity bill payments in past 6 months",
  },
  {
    factor: "Social Trust Score",
    score: 45,
    maxScore: 100,
    impact: "neutral" as const,
    description: "Limited referral network, moderate community standing",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Monitor loan applications and credit decisions in real-time.
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value="1,284"
            subtitle="This month"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Approved"
            value="847"
            subtitle="65.9% approval rate"
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Rejected"
            value="312"
            subtitle="24.3% rejection rate"
            icon={XCircle}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Pending Review"
            value="125"
            subtitle="Avg. 4hr resolution"
            icon={Clock}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Applicants Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" className="text-accent">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ApplicantTable applicants={mockApplicants} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Average Score */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Portfolio Health</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ScoreGauge score={685} size="lg" label="Avg. Portfolio Score" />
                <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-success/10 p-3">
                    <p className="text-2xl font-bold text-success">68%</p>
                    <p className="text-xs text-muted-foreground">High Score</p>
                  </div>
                  <div className="rounded-lg bg-warning/10 p-3">
                    <p className="text-2xl font-bold text-warning">24%</p>
                    <p className="text-xs text-muted-foreground">Medium Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Explainability */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-lg">Score Factors</CardTitle>
                <TrendingUp className="h-5 w-5 text-accent" />
              </CardHeader>
              <CardContent>
                <ExplainabilityChart data={explainabilityData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
