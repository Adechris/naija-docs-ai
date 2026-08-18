import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const title = "Settings — DocuAI";
const description = "Update your profile, business details, document defaults and notifications.";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Settings,
});

function Card({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-primary">
        {heading}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Settings() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <h1 className="text-2xl font-extrabold">⚙️ Settings</h1>

      <Card heading="Profile">
        <div className="space-y-1.5">
          <Label>Full name</Label>
          <Input defaultValue="Adeyinka Fashola" />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input defaultValue="adeyinka@zenithretail.ng" />
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input defaultValue="0803 000 0000" />
        </div>
        <div className="space-y-1.5">
          <Label>Account type</Label>
          <Input defaultValue="Business" readOnly />
        </div>
      </Card>

      <Card heading="Business & letterhead">
        <div className="space-y-1.5">
          <Label>Company name</Label>
          <Input defaultValue="Zenith Retail Limited" />
        </div>
        <div className="space-y-1.5">
          <Label>RC number</Label>
          <Input defaultValue="RC 1849302" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Company address</Label>
          <Input defaultValue="14B Adeola Odeku Street, Victoria Island, Lagos" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Company logo (used on all documents)</Label>
          <Input type="file" />
        </div>
      </Card>

      <Card heading="Document defaults">
        <div className="space-y-1.5">
          <Label>Default city / state</Label>
          <Input defaultValue="Lagos" />
        </div>
        <div className="space-y-1.5">
          <Label>Governing law</Label>
          <Input defaultValue="Federal Republic of Nigeria" readOnly />
        </div>
        <div className="space-y-1.5">
          <Label>Preferred download format</Label>
          <Input defaultValue="PDF + Word" />
        </div>
        <div className="space-y-1.5">
          <Label>Auto-save frequency</Label>
          <Input defaultValue="Every 30 seconds" />
        </div>
      </Card>

      <section className="rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-primary">
          Notifications
        </h2>
        <div className="mt-4 space-y-3">
          {[
            "Email me when a document is generated",
            "Weekly usage summary",
            "Product updates",
            "Billing reminders",
          ].map((n, i) => (
            <label key={n} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{n}</span>
              <Switch defaultChecked={i !== 2} />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-destructive/40 bg-card p-6 shadow-card">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-destructive">
          Danger zone
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.error("All documents deleted (demo)")}>
            Delete all documents
          </Button>
          <Button variant="destructive" onClick={() => toast.error("Account deletion requested")}>
            Delete account
          </Button>
        </div>
      </section>
    </div>
  );
}
