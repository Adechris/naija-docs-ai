import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bold,
  Copy,
  Download,
  Italic,
  List,
  RefreshCw,
  Save,
  Underline,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SAMPLE_DOCUMENT } from "@/mock/data";

const title = "Document Editor — DocuAI";
const description =
  "Edit your generated document with a live paper preview and download it as PDF or Word.";

export const Route = createFileRoute("/dashboard/editor")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  const [text, setText] = useState(SAMPLE_DOCUMENT);
  const [name, setName] = useState("Employment Contract — Adeyinka Fashola — Aug 2026");
  const words = text.trim().split(/\s+/).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-4 shadow-card">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
        </Button>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-9 max-w-md flex-1 border-transparent font-semibold hover:border-border"
        />
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info("Regenerating…")}>
            <RefreshCw className="mr-1.5 h-4 w-4" /> Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Saved")}>
            <Save className="mr-1.5 h-4 w-4" /> Save
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-gradient-blue">
                <Download className="mr-1.5 h-4 w-4" /> Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.success("PDF ready — downloading")}>
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Word (.docx) ready")}>
                Download as Word
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard?.writeText(text);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="mr-1.5 h-4 w-4" /> Copy to clipboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="split" className="mt-5">
        <TabsList className="lg:hidden">
          <TabsTrigger value="split">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="split" className="mt-4">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card shadow-card">
              <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
                {[Bold, Italic, Underline, List, Wand2].map((Icon, i) => (
                  <Button key={i} size="icon" variant="ghost" className="h-8 w-8">
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
                <span className="ml-auto pr-2 text-xs text-muted-foreground">
                  Last saved: just now
                </span>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[560px] resize-none rounded-none border-0 font-document text-[13px] leading-relaxed focus-visible:ring-0"
              />
              <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                {words} words · {text.length} characters
              </div>
            </div>

            <PaperPreview text={text} />
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <PaperPreview text={text} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PaperPreview({ text }: { text: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Page 1 of 3</span>
        <span>100%</span>
      </div>
      <div className="paper rounded-lg p-8">
        <div className="border-b-2 border-primary pb-3">
          <p className="font-display text-base font-extrabold text-primary-dark">
            ZENITH RETAIL LIMITED
          </p>
          <p className="font-sans text-[11px] text-muted-foreground">
            14B Adeola Odeku Street, Victoria Island, Lagos · RC 1849302
          </p>
        </div>
        <pre className="mt-5 whitespace-pre-wrap font-document text-[12.5px] leading-relaxed">
          {text}
        </pre>
      </div>
    </div>
  );
}
