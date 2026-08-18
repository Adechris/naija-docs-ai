import { createFileRoute } from "@tanstack/react-router";
import { DocumentList } from "@/components/document/DocumentList";

const title = "Favourites — DocuAI";
const description = "Your starred DocuAI documents in one place.";

export const Route = createFileRoute("/dashboard/favourites")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-extrabold">⭐ Favourites</h1>
      <DocumentList onlyStarred />
    </div>
  ),
});
