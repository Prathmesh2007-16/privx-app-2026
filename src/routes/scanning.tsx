import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ScanLine, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoDocument, scanSteps } from "@/lib/pii-data";

export const Route = createFileRoute("/scanning")({
  validateSearch: (search: Record<string, unknown>) => ({
    demo: search["demo"] === true || search["demo"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Scanning Document — PrivX AI Engine" },
      {
        name: "description",
        content:
          "PrivX is analyzing your document — extracting text, detecting sensitive information and scoring privacy risk in real time.",
      },
      { property: "og:title", content: "PrivX AI Scan in progress" },
      { property: "og:description", content: "PrivX is analyzing your document..." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://echo-protect-ai.lovable.app/scanning" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://echo-protect-ai.lovable.app/scanning" }],
  }),
  component: ScanningPage,
});

function ScanningPage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= scanSteps.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step]);

  const done = step >= scanSteps.length;
  const pct = Math.round((Math.min(step, scanSteps.length) / scanSteps.length) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="card-surface p-8 text-center">
        <span className="gradient-ai mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow">
          {done ? (
            <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
          ) : (
            <ScanLine className="h-7 w-7 text-primary-foreground" />
          )}
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">PrivX AI Engine</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {done
            ? "PrivX Privacy Risk Analysis Complete."
            : "PrivX is analyzing your document..."}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{demoDocument.name}</p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="gradient-ai h-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-muted-foreground">{pct}% complete</p>

        <ul className="mt-8 space-y-2 text-left">
          {scanSteps.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              {i < step ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-safe" />
              ) : i === step ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-ai" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-border" />
              )}
              <span className={i <= step ? "font-medium" : "text-muted-foreground"}>{s}</span>
            </li>
          ))}
        </ul>

        {done && (
          <div className="mt-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
              <ShieldAlert className="h-4 w-4" /> PrivX detected potentially sensitive information.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="gradient-ai border-0 shadow-glow">
                <Link to="/report">View PrivX Analysis</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/scan">Scan another document</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
