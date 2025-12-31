import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  BarChart3,
  Zap,
  Lock,
  Users,
  FileCheck,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Smartphone,
  CreditCard,
  Building2,
  GraduationCap,
} from "lucide-react";
import { ScoreGauge } from "@/components/ScoreGauge";

const features = [
  {
    icon: BarChart3,
    title: "Alternative Data Scoring",
    description:
      "Leverage consented mobile wallet transactions, telecom usage, and social signals for comprehensive credit assessment.",
  },
  {
    icon: Zap,
    title: "Instant Decisions",
    description:
      "Automated eligibility decisions in under 60 seconds with real-time API integration for your lending workflow.",
  },
  {
    icon: FileCheck,
    title: "Full Explainability",
    description:
      "Transparent score breakdown for borrowers and regulators, meeting SBP compliance requirements.",
  },
  {
    icon: Lock,
    title: "Regulatory Compliant",
    description:
      "Built for Pakistan's regulatory landscape with NADRA integration, PDPA compliance, and SBP reporting.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Microfinance Institutions",
    description: "Expand your portfolio with confident underwriting",
  },
  {
    icon: Smartphone,
    title: "Neobanks",
    description: "Power your digital lending with AI-driven decisions",
  },
  {
    icon: GraduationCap,
    title: "Campus Loans",
    description: "Assess students with limited credit history",
  },
  {
    icon: CreditCard,
    title: "BNPL Merchants",
    description: "Instant checkout approvals for retail finance",
  },
];

const stats = [
  { value: "500K+", label: "Applications Scored" },
  { value: "60s", label: "Avg Decision Time" },
  { value: "35%", label: "Default Rate Reduction" },
  { value: "99.9%", label: "API Uptime" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent shadow-glow">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">CreditAI</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#use-cases" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Use Cases
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/onboarding">Apply Now</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/dashboard">Lender Portal</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="max-w-2xl animate-slide-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </span>
                <span className="text-sm font-medium text-accent">SBP Compliant Platform</span>
              </div>
              
              <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                AI-Powered Credit Scoring for{" "}
                <span className="text-gradient-accent">Pakistan's Underbanked</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Score microloan applicants using alternative, consented data. Get automated 
                eligibility decisions with full explainability—built for MFIs, neobanks, 
                and BNPL providers.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/onboarding">
                    See Demo
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Trusted by 50+ Lenders</p>
                  <p className="text-xs text-muted-foreground">Across Pakistan</p>
                </div>
              </div>
            </div>

            {/* Hero visual - Credit Score Demo */}
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="absolute -top-4 -right-4 rounded-full bg-success/20 px-4 py-1">
                  <span className="text-sm font-semibold text-success">Eligible ✓</span>
                </div>
                
                <div className="flex flex-col items-center gap-6">
                  <ScoreGauge score={742} size="lg" label="Credit Score" />
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <span className="text-sm text-muted-foreground">Mobile Wallet Activity</span>
                      <span className="text-sm font-semibold text-success">+85 pts</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <span className="text-sm text-muted-foreground">Telecom History</span>
                      <span className="text-sm font-semibold text-success">+62 pts</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                      <span className="text-sm text-muted-foreground">Utility Payments</span>
                      <span className="text-sm font-semibold text-warning">+28 pts</span>
                    </div>
                  </div>

                  <Button variant="accent" className="w-full">
                    View Full Report
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -left-6 top-1/4 animate-float rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/20 p-2">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Decision Ready</p>
                    <p className="text-xs text-muted-foreground">42 seconds</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-1/4 animate-float rounded-xl border border-border bg-card p-4 shadow-lg" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-success/20 p-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">PKR 50,000</p>
                    <p className="text-xs text-muted-foreground">Approved Limit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="font-display text-3xl font-bold text-accent lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built for Modern Lending in Pakistan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete decisioning engine designed for financial inclusion, regulatory compliance, 
              and operational efficiency.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent/5 transition-transform group-hover:scale-150" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Powering Financial Inclusion Across Sectors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From microfinance to merchant financing, our platform adapts to your lending use case.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className="rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <useCase.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 lg:p-20">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent/20 to-transparent" />
            
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                Ready to Transform Your Lending?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join 50+ financial institutions using CreditAI to make smarter, 
                faster, and more inclusive lending decisions.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button variant="accent" size="xl" asChild>
                  <Link to="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
                <Shield className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">CreditAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CreditAI. Built for Pakistan's financial inclusion mission.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
