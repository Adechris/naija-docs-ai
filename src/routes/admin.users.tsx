import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS } from "@/mock/data";

const title = "Users Manager — DocuAI Admin";
const description = "Search, filter and manage DocuAI user accounts, plans and usage.";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const [q, setQ] = useState("");
  const list = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold">👥 Users</h1>
      <div className="relative mt-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or email..."
          className="pl-9"
        />
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase text-muted-foreground">
            <tr>
              {["Name", "Email", "Type", "Plan", "Docs", "Joined", "Last active", "Status"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((u) => (
              <tr key={u.id} className="hover:bg-secondary/60">
                <td className="px-4 py-3 font-semibold">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">{u.type}</td>
                <td className="px-4 py-3">{u.plan}</td>
                <td className="px-4 py-3">{u.docs}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.lastActive}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant="secondary"
                    className={
                      u.status === "Active"
                        ? "text-success"
                        : u.status === "Trial"
                          ? "text-warning"
                          : "text-destructive"
                    }
                  >
                    {u.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
