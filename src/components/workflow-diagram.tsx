import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const stages: { label: string; note?: string; tone?: "ai" | "plain" }[] = [
  { label: "User Uploads Document" },
  { label: "Document Processing" },
  { label: "Text Extraction / OCR" },
  { label: "Rule-Based Pattern Detection  +  AI / NLP Context Analysis", tone: "ai" },
  { label: "PII Classification" },
  { label: "Confidence Score" },
  { label: "Privacy Risk Engine", tone: "ai" },
  { label: "Results Dashboard" },
  { label: "Highlight / Mask / Redact" },
  { label: "Safe Document + Privacy Report" },
];

export function WorkflowDiagram() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      {stages.map((s, i) => (
        <div key={s.label} className="flex w-full flex-col items-center">
          <div
            className={cn(
              "w-full rounded-xl border px-5 py-3 text-center text-sm font-semibold shadow-soft",
              s.tone === "ai"
                ? "gradient-ai border-transparent text-primary-foreground"
                : "border-border bg-card text-foreground",
            )}
          >
            {s.label}
          </div>
          {i < stages.length - 1 && <ArrowDown className="my-1.5 h-4 w-4 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );
}
