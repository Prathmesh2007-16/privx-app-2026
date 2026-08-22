import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Brain,
  FileSearch,
  FileText,
  Fingerprint,
  Gauge,
  IdCard,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  Car,
  Vote,
  FileCheck2,
  Radar,
  ClipboardList,
} from "lucide-react";
import heroImage from "@/assets/hero-flow.jpg";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { supportedFormats } from "@/lib/pii-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PrivX — Detect Sensitive Data Before It Leaks" },
      {
        name: "description",
        content:
          "PrivX detects sensitive personal and government-related information in documents, scores privacy risk, and generates safe, masked copies.",
      },
      { property: "og:title", content: "PrivX — Detect. Analyze. Protect." },
      {
        property: "og:description",
        content: "AI-powered PII detection, privacy risk scoring and safe document generation.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  { icon: Upload, title: "Upload Document", text: "PDF, image, DOCX, TXT or CSV — dropped straight into the scanner." },
  { icon: FileText, title: "Extract Text", text: "Parsing and OCR turn every page into analysable text." },
  { icon: Brain, title: "AI Detects Sensitive Information", text: "Regex patterns plus NLP context analysis work together." },
  { icon: Gauge, title: "Analyze Privacy Risk", text: "Entity types, volume and combinations produce a 0–100 score." },
  { icon: ShieldCheck, title: "Protect & Generate Safe Copy", text: "Mask, redact and export a shareable version with a report." },
];

const detectTypes = [
  { icon: Fingerprint, label: "Aadhaar-like Identifier", tone: "high" },
  { icon: IdCard, label: "PAN-like Identifier", tone: "high" },
  { icon: Landmark, label: "Passport Information", tone: "high" },
  { icon: Car, label: "Driving Licence", tone: "medium" },
  { icon: Vote, label: "Voter ID", tone: "medium" },
  { icon: Phone, label: "Mobile Number", tone: "medium" },
  { icon: Mail, label: "Email Address", tone: "medium" },
  { icon: Banknote, label: "Bank Account", tone: "high" },
  { icon: MapPin, label: "Address", tone: "medium" },
  { icon: UserRound, label: "Personal Names", tone: "low" },
];

const benefits = [
  { icon: ShieldCheck, title: "Prevent accidental data leaks", text: "Catch identifiers before a document leaves your organisation." },
  { icon: Radar, title: "Automated privacy scanning", text: "Every upload is scanned end-to-end without manual review." },
  { icon: Brain, title: "AI + rule-based detection", text: "A hybrid engine balances recall from regex with precision from NLP." },
  { icon: FileSearch, title: "Context-aware analysis", text: "Surrounding labels raise or lower confidence to cut false positives." },
  { icon: Gauge, title: "Privacy risk scoring", text: "A transparent 0–100 score with LOW/MEDIUM/HIGH/CRITICAL bands." },
  { icon: Lock, title: "Safe document sharing", text: "Generate masked or fully redacted copies in one click." },
  { icon: ClipboardList, title: "Detailed privacy reports", text: "Exportable summaries with detections and recommended actions." },
];

const toneClass: Record<string, string> = {
  high: "text-danger bg-danger/10",
  medium: "text-warn bg-warn/15",
  low: "text-safe bg-safe/10",
};

function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-mesh relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ai/25 bg-card px-3 py-1 text-xs font-semibold text-ai shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered PII detection &amp; privacy risk analysis
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
              Protect Sensitive Data Before It Becomes a{" "}
              <span className="text-gradient-ai">Data Leak.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              PrivX is an AI-powered privacy intelligence platform that detects sensitive Personally
              Identifiable Information (PII), analyzes privacy risks, and helps protect sensitive data before
              it is shared.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-ai border-0 shadow-glow">
                <Link to="/scan">
                  <ScanLine className="h-4 w-4" /> Scan a Document
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/scanning" search={{ demo: true }}>
                  View Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { k: "12", v: "Entity types" },
                { k: "3-layer", v: "Detection engine" },
                { k: "0–100", v: "Risk scoring" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-border bg-card/80 px-4 py-3 shadow-soft">
                  <dt className="font-display text-xl font-bold text-gradient-ai">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="animate-float-soft overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
              <img
                src={heroImage}
                alt="Document scanned by AI, sensitive fields detected, risk analysed and a protected document produced"
                width={1280}
                height={896}
                className="w-full"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              {["Document", "AI Scan", "PII Detection", "Risk Analysis", "Protected Document"].map((s, i, a) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-card px-3 py-1 shadow-soft">{s}</span>
                  {i < a.length - 1 && <ArrowRight className="h-3 w-3" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          subtitle="Five steps from raw upload to a safe, shareable document."
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="card-surface group relative p-5 transition-shadow hover:shadow-lift">
              <span className="gradient-ai flex h-10 w-10 items-center justify-center rounded-xl">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="mt-4 block text-xs font-semibold tracking-widest text-ai">STEP {i + 1}</span>
              <h3 className="mt-1 text-base font-semibold">{s.title}</h3>
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
      </section>

      {/* What we detect */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Coverage"
            title="What We Detect"
            subtitle="Structured identifiers, contact details and free-text personal data — all illustrated with synthetic samples."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {detectTypes.map((d) => (
              <div key={d.label} className="card-surface p-5 transition-transform hover:-translate-y-0.5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClass[d.tone]}`}>
                  <d.icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{d.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Value" title="Why PrivX?" subtitle="Built for teams that share documents every day." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="card-surface flex gap-4 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Architecture"
            title="Core Product Workflow"
            subtitle="The end-to-end pipeline behind every scan."
          />
          <div className="mt-10">
            <WorkflowDiagram />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="gradient-ai relative overflow-hidden rounded-3xl px-8 py-14 text-center shadow-glow">
          <FileCheck2 className="mx-auto h-10 w-10 text-primary-foreground/80" />
          <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">
            Try a full scan with synthetic data
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
            Run the complete workflow — detection, risk scoring, highlighting, redaction and reporting — on a
            fictional demo document.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/scan">
                <Upload className="h-4 w-4" /> Scan a Document
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/dashboard">
                <BadgeCheck className="h-4 w-4" /> View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold tracking-widest text-ai uppercase">{eyebrow}</span>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}
