import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminShell,
});

const nav = [
  { to: "/admin", label: "📊 Overview" },
  { to: "/admin/users", label: "👥 Users" },
] as const;

function AdminShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-60 bg-sidebar lg:block">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Logo tone="light" />
        </div>
        <p className="px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-gold">
          Admin console
        </p>
        <nav className="space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                (n.to === "/admin" ? pathname === "/admin" : pathname.startsWith(n.to))
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-60">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-card px-6">
          <p className="font-display font-bold">DocuAI Admin</p>
          <Link to="/dashboard" className="ml-auto text-sm text-primary">
            Back to app
          </Link>
        </header>
        <main className="px-4 py-8 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
