import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Download, Eye, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DOCUMENT_TYPES, getDocumentType } from "@/lib/documentTypes";
import { MOCK_DOCUMENTS } from "@/mock/data";

const title = "Dashboard — DocuAI";
const description = "Your DocuAI workspace: generate documents and pick up where you left off.";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: DashboardHome,
});

const POPULAR_IDS = [
  "business-proposal",
  "employment-contract",
  "service-agreement",
  "nda",
  "commercial-invoice",
  "appointment-letter",
  "company-profile",
  "query-letter",
];

function DashboardHome() {
  const popular = POPULAR_IDS.map((id) => getDocumentType(id)!).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-lg border border-border bg-card p-7 shadow-card">
        <h1 className="text-2xl font-extrabold">Good morning, Adeyinka ✨</h1>
        <p className="mt-1 text-sm text-muted-foreground">What document do you need today?</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Input
            className="h-12 flex-1"
            placeholder="Describe what you need or pick a document type..."
          />
          <Button asChild className="bg-gradient-blue h-12 px-5">
            <Link to="/dashboard/new">
              Generate Document <Sparkles className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-9">
        <h2 className="text-lg font-bold">Quick generate</h2>
        <p className="text-sm text-muted-foreground">
          The {popular.length} most popular document types
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {popular.map((d, i) => (
            <Link
              key={d.id}
              to="/dashboard/new"
              search={{ type: d.id }}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-in fade-in slide-in-from-bottom-2 group rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
            >
              <span className="text-2xl">{d.icon}</span>
              <p className="mt-3 font-display text-sm font-bold leading-snug">{d.name}</p>
              <span className="mt-2 inline-block rounded-full bg-primary-tint px-2 py-0.5 text-[11px] font-semibold text-primary-dark">
                ~{d.seconds} seconds
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-lg font-bold">Continue where you left off</h2>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-card">
            {MOCK_DOCUMENTS.map((doc) => {
              const t = getDocumentType(doc.typeId);
              return (
                <div key={doc.id} className="flex items-center gap-3 p-4">
                  <span className="text-xl">{t?.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t?.name} · {doc.createdAt} · {doc.pages} pages
                    </p>
                  </div>
                  <Badge
                    variant={doc.status === "Completed" ? "secondary" : "outline"}
                    className={doc.status === "Completed" ? "text-success" : "text-warning"}
                  >
                    {doc.status}
                  </Badge>
                  <div className="hidden gap-1 sm:flex">
                    <Button size="icon" variant="ghost" aria-label="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Total generated", "42"],
              ["This month", "11"],
              ["Most used", "Contracts"],
              ["Storage used", "18 MB"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-4 shadow-card">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 font-display text-xl font-extrabold">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-primary-soft bg-primary-tint p-5">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary-dark">
              <TrendingUp className="h-4 w-4" /> Free plan limit
            </p>
            <p className="mt-1 text-sm text-primary-dark/80">
              You've used 2 of 3 free documents.
            </p>
            <Progress value={66} className="mt-3 h-1.5" />
            <Button asChild className="bg-gradient-blue mt-4 w-full">
              <Link to="/dashboard/billing">Upgrade Now</Link>
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <p className="text-sm font-bold">Did you know?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              DocuAI employment contracts reference the Nigerian Labour Act 2004 and PenCom
              pension obligations — {DOCUMENT_TYPES.filter((d) => d.nigerianContext).length} of our
              document types carry Nigerian statutory context.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
