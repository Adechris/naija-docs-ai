import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/documentTypes";

const title = "Subscription & Billing — DocuAI";
const description = "Manage your DocuAI plan, payment method and billing history.";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Billing,
});

const HISTORY = [
  { date: "2026-08-18", plan: "Professional", amount: 8000, status: "Paid" },
  { date: "2026-07-18", plan: "Professional", amount: 8000, status: "Paid" },
  { date: "2026-06-18", plan: "Professional", amount: 8000, status: "Paid" },
  { date: "2026-05-18", plan: "Professional", amount: 8000, status: "Failed" },
];

function Billing() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold">💳 Subscription & Billing</h1>

      <div className="mt-6 rounded-lg border border-primary bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold">
              Professional{" "}
              <Badge className="ml-1 bg-gold/15 text-gold hover:bg-gold/15">Current plan</Badge>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatNaira(8000)}/month · next billing 18/09/2026
            </p>
          </div>
          <Button variant="outline" onClick={() => toast.info("Opening Paystack portal…")}>
            Manage Subscription
          </Button>
        </div>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          {[
            "Unlimited documents",
            "PDF + Word download",
            "Advanced AI generation",
            "Unlimited document history",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-success" strokeWidth={3} /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-6 shadow-card">
        <p className="font-display font-bold">Billing history</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="pb-2">Date</th>
                <th className="pb-2">Plan</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map((h) => (
                <tr key={h.date}>
                  <td className="py-3">{h.date}</td>
                  <td className="py-3">{h.plan}</td>
                  <td className="py-3">{formatNaira(h.amount)}</td>
                  <td className="py-3">
                    <span className={h.status === "Paid" ? "text-success" : "text-destructive"}>
                      {h.status}
                    </span>
                  </td>
                  <td className="py-3 text-primary">Download</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-6 shadow-card">
        <p className="font-display font-bold">Payment method</p>
        <p className="mt-2 text-sm text-muted-foreground">Verve card ending •••• 4821</p>
        <Button variant="outline" className="mt-4" onClick={() => toast.info("Paystack checkout")}>
          Update Payment Method
        </Button>
      </div>
    </div>
  );
}
