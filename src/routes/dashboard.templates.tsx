import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORY_LABELS, DOCUMENT_TYPES } from "@/lib/documentTypes";

const title = "Templates — DocuAI";
const description = "Browse all 20 Nigerian-context document templates available on DocuAI.";

export const Route = createFileRoute("/dashboard/templates")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Templates,
});

function Templates() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold">🏷️ Templates</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {DOCUMENT_TYPES.length} templates across four categories.
      </p>
      {(["business", "legal", "hr", "finance"] as const).map((cat) => (
        <section key={cat} className="mt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-primary">
            {CATEGORY_LABELS[cat]}
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOCUMENT_TYPES.filter((d) => d.category === cat).map((d) => (
              <Link
                key={d.id}
                to="/dashboard/new"
                search={{ type: d.id }}
                className="rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
              >
                <span className="text-xl">{d.icon}</span>
                <p className="mt-2 font-display text-sm font-bold">{d.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
