import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Login — DocuAI";
const description = "Sign in to your DocuAI workspace to generate and manage business documents.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="mt-8 text-2xl font-extrabold">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to continue generating documents.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                toast.success("Welcome back, Adeyinka!");
                navigate({ to: "/dashboard" });
              }, 700);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="adeyinka@zenithretail.ng" required />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-primary">Forgot password?</span>
              </div>
              <Input id="password" type="password" defaultValue="demo1234" required />
            </div>
            <Button type="submit" disabled={loading} className="bg-gradient-blue w-full">
              {loading ? "Signing in…" : "Login"}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              Continue with Google
            </Button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground">
            New to DocuAI?{" "}
            <Link to="/register" className="font-semibold text-primary">
              Start your free trial
            </Link>
          </p>
          <p className="mt-8 text-xs text-muted-foreground">
            Admin?{" "}
            <Link to="/admin" className="text-primary">
              Go to admin login
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-gradient-blue hidden flex-col justify-center px-14 lg:flex">
        <h2 className="max-w-md text-3xl font-extrabold text-primary-foreground">
          20 Nigerian business documents. One workspace.
        </h2>
        <p className="mt-4 max-w-md text-primary-foreground/85">
          Labour Act compliant contracts, CAC-ready resolutions, Naira invoices — drafted in
          seconds and ready to sign.
        </p>
      </div>
    </div>
  );
}
