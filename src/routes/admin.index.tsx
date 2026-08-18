import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNaira } from "@/lib/documentTypes";
import {
  ACTIVITY_FEED,
  PLAN_DISTRIBUTION,
  POPULAR_TYPES,
  REVENUE_SERIES,
} from "@/mock/data";

const title = "Admin Overview — DocuAI";
const description = "Platform metrics: revenue, signups, documents generated and plan mix.";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminHome,
});

const STATS: [string, string][] = [
  ["👥 Total Users", "2,076"],
  ["🆕 New Users Today", "38"],
  ["💰 MRR", formatNaira(8512000)],
  ["📄 Documents Today", "412"],
  ["📊 Total Documents", "94,318"],
  ["🔄 Active Subscriptions", "836"],
  ["⚠️ Failed Payments", "11"],
  ["🆓 Free Trial Users", "1,240"],
];

const PIE_COLORS = ["var(--chart-2)", "var(--chart-1)", "var(--chart-3)"];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card">
      <p className="font-display text-sm font-bold">{title}</p>
      <div className="mt-4 h-64">{children}</div>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold">Platform overview</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Panel title="Revenue per day (last 30 days)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip formatter={(v: number) => formatNaira(v)} />
              <Area
                dataKey="revenue"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.18}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="New signups per day">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="signups" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Most popular document types (%)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={POPULAR_TYPES} layout="vertical">
              <XAxis type="number" fontSize={11} stroke="var(--muted-foreground)" />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                fontSize={11}
                stroke="var(--muted-foreground)"
              />
              <Tooltip />
              <Bar dataKey="value" fill="var(--chart-2)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Plan distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PLAN_DISTRIBUTION} dataKey="value" nameKey="name" outerRadius={90} label>
                {PLAN_DISTRIBUTION.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card p-5 shadow-card">
        <p className="font-display text-sm font-bold">Recent activity</p>
        <ul className="mt-4 divide-y divide-border text-sm">
          {ACTIVITY_FEED.map((a) => (
            <li key={a.who + a.when} className="flex justify-between py-2.5">
              <span>
                <span className="font-semibold">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.what}</span>
              </span>
              <span className="text-xs text-muted-foreground">{a.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
