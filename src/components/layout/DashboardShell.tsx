import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  FileText,
  FolderOpen,
  Home,
  Menu,
  Search,
  Settings,
  Sparkles,
  Star,
  CreditCard,
  Tags,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/new", label: "New Document", icon: Sparkles },
  { to: "/dashboard/documents", label: "My Documents", icon: FolderOpen },
  { to: "/dashboard/favourites", label: "Favourites", icon: Star },
  { to: "/dashboard/templates", label: "Templates", icon: Tags },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardShell() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[264px] bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <Logo tone="light" />
          </Link>
        </div>

        <div className="border-b border-sidebar-border px-5 py-4">
          <p className="text-sm font-semibold text-primary-foreground">Adeyinka Fashola</p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold">
            Professional
          </span>
        </div>

        <nav className="space-y-1 px-3 py-4">
          {nav.map((n) => {
            const active =
              n.to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-3 bottom-4 rounded-lg bg-sidebar-accent p-4">
          <p className="text-xs font-semibold text-primary-foreground">Plan usage</p>
          <p className="mt-1 text-xs text-sidebar-foreground/70">42 documents this month</p>
          <Progress value={100} className="mt-2.5 h-1.5" />
          <p className="mt-2 text-[11px] font-semibold text-gold">Unlimited on Professional</p>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card px-4 sm:px-6">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search your documents..." className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/dashboard/new">
                <Sparkles className="mr-1.5 h-4 w-4" /> New Document
              </Link>
            </Button>
            <button
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
            <span className="bg-gradient-blue flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
              AF
            </span>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <FileText className="h-5 w-5 text-primary" />
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
