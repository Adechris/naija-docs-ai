import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="bg-gradient-blue flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground shadow-sm">
        <FileText className="h-4.5 w-4.5" strokeWidth={2.4} />
      </span>
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold tracking-tight",
          tone === "dark" ? "text-foreground" : "text-primary-foreground",
        )}
      >
        Docu<span className="text-primary">AI</span>
      </span>
    </span>
  );
}
