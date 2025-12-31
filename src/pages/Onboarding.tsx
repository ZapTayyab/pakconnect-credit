import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScoreGauge } from "@/components/ScoreGauge";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Smartphone,
  FileText,
  Lock,
  Wallet,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

type Step = 1 | 2 | 3 | 4;

const steps = [
  { id: 1, title: "Basic Info", icon: FileText },
  { id: 2, title: "Data Consent", icon: Lock },
  { id: 3, title: "Verification", icon: Smartphone },
  { id: 4, title: "Result", icon: Zap },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    loanAmount: "",
    consentWallet: false,
    consentTelecom: false,
    consentUtility: false,
    otp: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      if (currentStep === 3) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep((currentStep + 1) as Step);
        }, 2000);
      } else {
        setCurrentStep((currentStep + 1) as Step);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">CreditAI</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Exit Application</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                          isCompleted
                            ? "border-success bg-success text-success-foreground"
                            : isActive
                            ? "border-accent bg-accent text-accent-foreground animate-pulse-glow"
                            : "border-muted bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          isActive ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-0.5 w-16 lg:w-24 ${
                          currentStep > step.id ? "bg-success" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card animate-scale-in">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Let's Get Started
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill in your basic information to begin the application.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (as per CNIC)</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC Number</Label>
                    <Input
                      id="cnic"
                      placeholder="42201-1234567-1"
                      value={formData.cnic}
                      onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input
                      id="phone"
                      placeholder="03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Desired Loan Amount (PKR)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50000"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Data Consent
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    We use alternative data to assess your creditworthiness. Your data is
                    encrypted and never shared without permission.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border p-4 transition-all hover:border-accent/50">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="wallet"
                        checked={formData.consentWallet}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consentWallet: checked as boolean })
                        }
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-accent" />
                          <Label htmlFor="wallet" className="font-semibold cursor-pointer">
                            Mobile Wallet Data
                          </Label>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Access your JazzCash/Easypaisa transaction history to verify income
                          patterns.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4 transition-all hover:border-accent/50">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="telecom"
                        checked={formData.consentTelecom}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consentTelecom: checked as boolean })
                        }
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-accent" />
                          <Label htmlFor="telecom" className="font-semibold cursor-pointer">
                            Telecom Usage Data
                          </Label>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Access your mobile account history to verify identity and stability.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4 transition-all hover:border-accent/50">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id="utility"
                        checked={formData.consentUtility}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consentUtility: checked as boolean })
                        }
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-accent" />
                          <Label htmlFor="utility" className="font-semibold cursor-pointer">
                            Utility Payment Data
                          </Label>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Access your electricity/gas bill payment records.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Your data is protected
                      </p>
                      <p className="text-xs text-muted-foreground">
                        We comply with PDPA regulations. Data is encrypted and used solely for
                        credit assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Verify Your Identity
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    We've sent a 6-digit OTP to your mobile number.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="space-y-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Enter OTP sent to <span className="font-semibold">{formData.phone || "03XX-XXXXXXX"}</span>
                    </p>
                    <Input
                      className="text-center text-2xl tracking-widest font-mono"
                      placeholder="• • • • • •"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    />
                    <Button variant="link" size="sm">
                      Resend OTP
                    </Button>
                  </div>
                </div>

                {isProcessing && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      <span className="text-sm font-medium text-accent">
                        Processing your application...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Application Complete!
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Great news! Based on your alternative data, you're eligible for a loan.
                  </p>
                </div>

                <div className="flex justify-center">
                  <ScoreGauge score={742} size="lg" label="Your Credit Score" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-success/30 bg-success/5 p-6">
                    <p className="text-sm text-muted-foreground">Approved Loan Amount</p>
                    <p className="font-display text-4xl font-bold text-success">
                      PKR {parseInt(formData.loanAmount || "50000").toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      at 18% APR for 12 months
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-xl font-bold text-foreground">
                        PKR {Math.round((parseInt(formData.loanAmount || "50000") * 1.18) / 12).toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-xl font-bold text-foreground">
                        PKR {Math.round(parseInt(formData.loanAmount || "50000") * 0.18).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="hero" size="xl" className="w-full" asChild>
                  <Link to="/">
                    Accept & Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 4 && (
              <div className="mt-8 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  variant="hero"
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="gap-2"
                >
                  {currentStep === 3 ? "Verify & Submit" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
