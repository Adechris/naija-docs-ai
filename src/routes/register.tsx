import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const title = "Create your DocuAI account — 14-day free trial";
const description =
  "Sign up for DocuAI and generate Nigerian-context business documents in seconds. No credit card required.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [type, setType] = useState<"individual" | "business">("business");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-lg">
        <Link to="/">
          <Logo />
        </Link>
        <div className="mt-6 rounded-lg border border-border bg-card p-7 shadow-card">
          <h1 className="text-2xl font-extrabold">Create your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your 14-day free trial starts now — no credit card required.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                toast.success("Account created — welcome to DocuAI!");
                navigate({ to: "/dashboard" });
              }, 800);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" placeholder="Adeyinka Fashola" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="you@company.ng" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" placeholder="0803 000 0000" required />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" placeholder="Minimum 8 characters" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Account type</Label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["individual", "👤 Individual"],
                    ["business", "🏢 Business"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setType(value)}
                    className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                      type === value
                        ? "border-primary bg-primary-tint text-primary-dark"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {type === "business" && (
              <div className="animate-in fade-in slide-in-from-top-2 grid gap-4 rounded-md border border-border bg-primary-tint/60 p-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="company">Company name *</Label>
                  <Input id="company" placeholder="Zenith Retail Limited" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rc">RC Number (optional)</Label>
                  <Input id="rc" placeholder="RC 1849302" />
                </div>
                <div className="space-y-1.5">
                  <Label>Industry</Label>
                  <Select defaultValue="retail">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["retail", "fintech", "oil-and-gas", "agriculture", "logistics", "consulting", "education", "health"].map(
                        (i) => (
                          <SelectItem key={i} value={i} className="capitalize">
                            {i.replace(/-/g, " ")}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Button type="submit" disabled={loading} className="bg-gradient-blue w-full">
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="mt-5 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
