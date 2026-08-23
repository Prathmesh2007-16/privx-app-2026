import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, FileText, Gauge, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { supportedFormats } from "@/lib/pii-data";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — PrivX Detection Engine" },
      {
        name: "description",
        content:
          "How PrivX works: text extraction, pattern and AI context detection, privacy risk scoring, and PrivX Safe Copy generation.",
      },
      { property: "og:title", content: "How PrivX Works" },
      {
        property: "og:description",
        content: "Inside the PrivX three-layer PII detection and privacy risk engine.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://privx.app/how-it-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://privx.app/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const stages = [
  { icon: Upload, title: "1 · Upload", text: "Drop a PDF, image, DOCX, TXT or CSV into the PrivX scanner." },
  { icon: FileText, title: "2 · Extract", text: "Parsing and OCR turn every page into analysable text." },
  { icon: Brain, title: "3 · Detect", text: "PrivX AI Scan combines regex patterns with NLP context analysis." },
  { icon: Gauge, title: "4 · Analyze", text: "Entity types, volume and combinations produce a 0–100 risk score." },
  { icon: ShieldCheck, title: "5 · Protect", text: "Generate a PrivX Safe Copy plus an exportable privacy report." },
];

const layers = [
  {
    name: "Layer 1 — Pattern matching",
    text: "Deterministic regex rules and checksum validation catch structured identifiers with high recall.",
  },
  {
    name: "Layer 2 — Contextual scoring",
    text: "Nearby labels and field names raise or lower confidence so PrivX suppresses false positives.",
  },
  {
    name: "Layer 3 — AI context analysis",
    text: "Language understanding finds unstructured personal data such as names and addresses in free text.",
  },
];

function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold tracking-widest text-ai uppercase">Process</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">How PrivX Works</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Detect. Analyze. Protect. — five stages from raw upload to a safe, shareable document.
        </p>
      </div>

      <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
        {stages.map((s) => (
          <li key={s.title} className="card-surface p-5">
            <span className="gradient-ai flex h-10 w-10 items-center justify-center rounded-xl">
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="mt-4 text-base font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">Supported formats:</span>
        {supportedFormats.map((f) => (
          <span
            key={f}
            className="rounded-lg border border-border bg-card px-2.5 py-1 font-mono text-xs font-medium shadow-soft"
          >
            {f}
          </span>
        ))}
      </div>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {layers.map((l) => (
          <div key={l.name} className="card-surface p-6">
            <h2 className="text-sm font-semibold">{l.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{l.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <WorkflowDiagram />
      </section>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="gradient-ai border-0 shadow-glow">
          <Link to="/scan">Run a PrivX AI Scan</Link>
        </Button>
      </div>
    </div>
  );
}