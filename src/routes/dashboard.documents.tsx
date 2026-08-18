import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentList } from "@/components/document/DocumentList";
import { MOCK_DOCUMENTS } from "@/mock/data";

const title = "My Documents — DocuAI";
const description = "Every document you have generated, searchable and ready to download.";

export const Route = createFileRoute("/dashboard/documents")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MyDocuments,
});

function MyDocuments() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">
          My Documents{" "}
          <span className="ml-1 rounded-full bg-primary-tint px-2.5 py-1 align-middle text-sm font-bold text-primary-dark">
            {MOCK_DOCUMENTS.length}
          </span>
        </h1>
        <Button asChild className="bg-gradient-blue">
          <Link to="/dashboard/new">
            <Sparkles className="mr-1.5 h-4 w-4" /> New Document
          </Link>
        </Button>
      </div>
      <DocumentList />
    </div>
  );
}
