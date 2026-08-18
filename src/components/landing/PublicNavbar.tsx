import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Templates", href: "#templates" },
  { label: "About", href: "#nigeria" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="DocuAI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-gradient-blue shadow-sm">
            <Link to="/register">Start Free Trial</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          <nav className="flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-blue">
              <Link to="/register">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
