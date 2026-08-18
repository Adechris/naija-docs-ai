import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, MoreVertical, Search, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDocumentType } from "@/lib/documentTypes";
import { MOCK_DOCUMENTS, type SavedDocument } from "@/mock/data";

export function DocumentList({ onlyStarred = false }: { onlyStarred?: boolean }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [docs, setDocs] = useState<SavedDocument[]>(MOCK_DOCUMENTS);

  const list = useMemo(() => {
    const filtered = docs.filter(
      (d) => (!onlyStarred || d.starred) && d.name.toLowerCase().includes(q.toLowerCase()),
    );
    return [...filtered].sort((a, b) =>
      sort === "newest"
        ? b.createdAt.localeCompare(a.createdAt)
        : sort === "oldest"
          ? a.createdAt.localeCompare(b.createdAt)
          : sort === "edited"
            ? b.editedAt.localeCompare(a.editedAt)
            : a.name.localeCompare(b.name),
    );
  }, [docs, q, sort, onlyStarred]);

  const toggleStar = (id: string) =>
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, starred: !d.starred } : d)));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by document name..."
            className="pl-9"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="edited">Most recently edited</SelectItem>
            <SelectItem value="alpha">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border bg-card py-20 text-center">
          <p className="text-4xl">📄</p>
          <p className="mt-4 font-display text-lg font-bold">No documents yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate your first document in seconds.
          </p>
          <Button asChild className="bg-gradient-blue mt-5">
            <Link to="/dashboard/new">
              <Sparkles className="mr-1.5 h-4 w-4" /> Generate Document
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((doc, i) => {
            const t = getDocumentType(doc.typeId);
            return (
              <div
                key={doc.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-2 rounded-lg border border-border bg-card p-5 shadow-card duration-500 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{t?.icon}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleStar(doc.id)} aria-label="Toggle favourite">
                      <Star
                        className={`h-4 w-4 ${doc.starred ? "fill-gold text-gold" : "text-muted-foreground"}`}
                      />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/editor">View & edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("PDF downloaded")}>
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Word downloaded")}>
                          Download Word
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Duplicated")}>
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setDocs((p) => p.filter((d) => d.id !== doc.id));
                            toast.success("Document deleted");
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="mt-3 font-display text-sm font-bold leading-snug">{doc.name}</p>
                <Badge variant="secondary" className="mt-2 text-primary-dark">
                  {t?.name}
                </Badge>
                <dl className="mt-3 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <div>Created: {doc.createdAt}</div>
                  <div>Edited: {doc.editedAt}</div>
                  <div>{doc.words} words</div>
                  <div>{doc.pages} pages</div>
                </dl>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to="/dashboard/editor">Open</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toast.success("PDF downloaded")}
                    aria-label="Download PDF"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
