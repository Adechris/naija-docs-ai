import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_LABELS,
  DOCUMENT_TYPES,
  getDocumentType,
  type DocCategory,
} from "@/lib/documentTypes";

const title = "New Document — DocuAI";
const description =
  "Pick from 20 Nigerian-context document types, fill a short form, and generate a professional document in seconds.";

export const Route = createFileRoute("/dashboard/new")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NewDocument,
});

const STEPS = ["Document Type", "Fill Details", "Generate", "Edit & Download"];

function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              i < current
                ? "bg-success text-primary-foreground"
                : i === current
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </span>
          <span className={i === current ? "font-semibold" : "text-muted-foreground"}>{s}</span>
          {i < STEPS.length - 1 && <span className="text-border">—</span>}
        </li>
      ))}
    </ol>
  );
}

function NewDocument() {
  const navigate = useNavigate();
  const { type } = Route.useSearch();
  const [step, setStep] = useState(type ? 1 : 0);
  const selected = type ? getDocumentType(type) : undefined;

  useEffect(() => {
    setStep(type ? 1 : 0);
  }, [type]);

  return (
    <div className="mx-auto max-w-5xl">
      <Stepper current={step} />
      {step === 0 && <TypePicker />}
      {step === 1 && selected && (
        <DocumentForm
          docName={selected.name}
          icon={selected.icon}
          onBack={() => navigate({ to: "/dashboard/new", search: {} })}
          onGenerate={() => setStep(2)}
        />
      )}
      {step === 2 && <Generating onDone={() => setStep(3)} />}
      {step === 3 && selected && <Editor docName={selected.name} />}
    </div>
  );
}

function TypePicker() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<DocCategory | "all">("all");

  const list = useMemo(
    () =>
      DOCUMENT_TYPES.filter(
        (d) =>
          (cat === "all" || d.category === cat) &&
          (d.name.toLowerCase().includes(q.toLowerCase()) ||
            d.description.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat],
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Choose a document type</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {DOCUMENT_TYPES.length} Nigerian-context document types, ready to generate.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search document types..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", "business", "legal", "hr", "finance"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c === "all" ? "All" : CATEGORY_LABELS[c].split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d, i) => (
          <Link
            key={d.id}
            to="/dashboard/new"
            search={{ type: d.id }}
            style={{ animationDelay: `${i * 30}ms` }}
            className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl">{d.icon}</span>
              {d.nigerianContext && (
                <span className="rounded-full bg-primary-tint px-2 py-0.5 text-[11px] font-semibold text-primary-dark">
                  🇳🇬 NG context
                </span>
              )}
            </div>
            <p className="mt-3 font-display text-sm font-bold">{d.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.description}</p>
            <span className="mt-3 inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
              ~{d.seconds} seconds
            </span>
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-border bg-card py-16 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-3 font-semibold">No document types match “{q}”</p>
          <p className="text-sm text-muted-foreground">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-primary">
        {title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Other"];

function DocumentForm({
  docName,
  icon,
  onBack,
  onGenerate,
}: {
  docName: string;
  icon: string;
  onBack: () => void;
  onGenerate: () => void;
}) {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}
    >
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <span>{icon}</span> {docName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill the details below — everything else is handled by DocuAI.
        </p>
      </div>

      <Section title="Employer details">
        <Field label="Company / individual name *">
          <Input required placeholder="Zenith Retail Limited" />
        </Field>
        <Field label="RC number (optional)">
          <Input placeholder="RC 1849302" />
        </Field>
        <Field label="Address *" full>
          <Input required placeholder="14B Adeola Odeku Street, Victoria Island" />
        </Field>
        <Field label="City *">
          <Select defaultValue="Lagos">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Phone">
          <Input placeholder="0803 000 0000" />
        </Field>
      </Section>

      <Section title="Employee details">
        <Field label="Full name *">
          <Input required placeholder="Adeyinka Fashola" />
        </Field>
        <Field label="Job title / position *">
          <Input required placeholder="Operations Manager" />
        </Field>
        <Field label="Department">
          <Input placeholder="Operations" />
        </Field>
        <Field label="Email">
          <Input type="email" placeholder="staff@company.ng" />
        </Field>
      </Section>

      <Section title="Employment terms">
        <Field label="Employment type *">
          <Select defaultValue="full-time">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["full-time", "part-time", "contract", "internship"].map((v) => (
                <SelectItem key={v} value={v} className="capitalize">
                  {v.replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Start date *">
          <Input type="date" required defaultValue="2026-09-01" />
        </Field>
        <Field label="Probation period">
          <Select defaultValue="3">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "6", "none"].map((v) => (
                <SelectItem key={v} value={v}>
                  {v === "none" ? "None" : `${v} month(s)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Work location">
          <Select defaultValue="office">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["office", "remote", "hybrid"].map((v) => (
                <SelectItem key={v} value={v} className="capitalize">
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Section>

      <Section title="Compensation">
        <Field label="Gross monthly salary (₦) *">
          <Input required placeholder="850,000" />
        </Field>
        <Field label="Salary payment date">
          <Select defaultValue="25th">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["25th", "Last working day", "1st of next month"].map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Label>Benefits</Label>
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            {[
              "Health Insurance",
              "Pension (mandatory by law)",
              "Transport Allowance",
              "Housing Allowance",
              "Meal Allowance",
              "Leave Allowance",
              "13th Month Salary",
            ].map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox defaultChecked={b.startsWith("Pension")} />
                {b}
              </label>
            ))}
          </div>
        </div>
        <Field label="Annual leave days">
          <Select defaultValue="21">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["21", "25", "28", "30"].map((v) => (
                <SelectItem key={v} value={v}>
                  {v} days {v === "21" && "(statutory minimum)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Section>

      <Section title="Additional terms">
        <Field label="Notice period *">
          <Select defaultValue="1-month">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["1-week", "2-weeks", "1-month", "2-months", "3-months"].map((v) => (
                <SelectItem key={v} value={v} className="capitalize">
                  {v.replace("-", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tone">
          <Select defaultValue="formal">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["formal", "standard", "simplified"].map((v) => (
                <SelectItem key={v} value={v} className="capitalize">
                  {v} {v === "formal" && "(recommended)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Special terms / conditions" full>
          <Textarea rows={3} placeholder="Anything else the document should cover..." />
        </Field>
      </Section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-5 shadow-card">
        <div className="text-sm">
          <p className="font-semibold">~850 words, ~3 pages</p>
          <p className="flex items-center gap-1.5 text-success">
            <Check className="h-4 w-4" strokeWidth={3} /> Nigerian Labour Act 2004 compliant
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Change type
          </Button>
          <Button type="submit" className="bg-gradient-blue">
            <Sparkles className="mr-1.5 h-4 w-4" /> Generate Document
          </Button>
        </div>
      </div>
    </form>
  );
}

const MESSAGES = [
  "🤖 Understanding your requirements...",
  "📝 Applying Nigerian legal context...",
  "✍️ Writing your document...",
  "🔍 Reviewing for completeness...",
  "✅ Finalizing your document...",
];

function Generating({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const msg = setInterval(() => setI((v) => Math.min(v + 1, MESSAGES.length - 1)), 1600);
    const tick = setInterval(() => setElapsed((v) => v + 1), 1000);
    const done = setTimeout(() => {
      toast.success("Your document is ready!");
      onDone();
    }, 8200);
    return () => {
      clearInterval(msg);
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="bg-gradient-blue flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl text-primary-foreground">
        <Sparkles className="h-7 w-7" />
      </span>
      <p className="mt-6 font-display text-xl font-bold">{MESSAGES[i]}</p>
      <Progress value={((i + 1) / MESSAGES.length) * 100} className="mt-6 h-2 w-72" />
      <p className="mt-3 text-sm text-muted-foreground">{elapsed} seconds…</p>
      <p className="mt-8 max-w-md rounded-lg border border-primary-soft bg-primary-tint p-4 text-sm text-primary-dark">
        💡 Did you know? DocuAI employment contracts reference the Nigerian Labour Act 2004,
        making them legally grounded.
      </p>
    </div>
  );
}

function Editor({ docName }: { docName: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 text-center shadow-card">
      <p className="text-3xl">🎉</p>
      <h2 className="mt-3 text-xl font-extrabold">Your {docName} is ready</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Open the editor to fine-tune the wording, then download as PDF or Word.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button asChild className="bg-gradient-blue">
          <Link to="/dashboard/editor">
            Open editor <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" onClick={() => toast.success("PDF downloaded")}>
          Download PDF
        </Button>
      </div>
    </div>
  );
}
