import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskGauge } from "@/components/risk-gauge";
import { RiskBadge } from "@/components/risk-badge";
import {
  categoryCounts as demoCategoryCounts,
  demoDocument,
  detectedEntities as demoDetectedEntities,
  originalLines as demoOriginalLines,
  protectedLines as demoProtectedLines,
  recommendations as demoRecommendations,
  riskLevel as demoRiskLevel,
  riskScore as demoRiskScore,
} from "@/lib/pii-data";
import { loadScanResult } from "@/lib/scan-api";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Privacy Report — PrivX Analysis" },
      {
        name: "description",
        content:
          "PrivX Privacy Risk Analysis: detected entities, risk score, recommendations and a PrivX Safe Copy of your document.",
      },
      { property: "og:title", content: "PrivX Analysis — Privacy Report" },
      {
        property: "og:description",
        content: "Detected sensitive information, privacy risk score and PrivX Safe Copy.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://echo-protect-ai.lovable.app/report" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://echo-protect-ai.lovable.app/report" }],
  }),
  component: ReportPage,
});

function ReportPage() {
  // If a real scan was just run, use it. Otherwise fall back to the
  // built-in synthetic demo data (unchanged from before).
  const scan = loadScanResult();

  const documentName = scan?.document_name ?? demoDocument.name;
  const scanDate = scan?.scan_date ?? demoDocument.scanDate;
  const riskScore = scan?.risk_score ?? demoRiskScore;
  const riskLevel = scan?.risk_level ?? demoRiskLevel;
  const categoryCounts = scan?.category_counts ?? demoCategoryCounts;
  const detectedEntities = scan?.detected_entities ?? demoDetectedEntities;
  const originalLines = scan?.original_lines ?? demoOriginalLines;
  const protectedLines = scan?.protected_lines ?? demoProtectedLines;
  const recommendations = scan?.recommendations ?? demoRecommendations;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-ai uppercase">PrivX Analysis</span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Privacy Report</h1>
          <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" /> {documentName} · {scanDate}
          </p>
        </div>
        <Button className="gradient-ai border-0 shadow-glow">
          <Download className="h-4 w-4" /> Export PrivX Report
        </Button>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="card-surface flex flex-col items-center p-6">
          <RiskGauge score={riskScore} />
          <RiskBadge level={riskLevel} className="mt-4" />
          <p className="mt-3 text-center text-sm text-muted-foreground">
            PrivX Privacy Risk Analysis Complete.
          </p>
        </div>

        <div className="card-surface p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Detected categories</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <div
                key={cat}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <span className="text-sm">{cat}</span>
                <span className="font-display text-lg font-bold text-gradient-ai">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Detected entities</h2>
        <div className="card-surface mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Masked value</th>
                <th className="px-4 py-3">Detection layer</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {detectedEntities.map((e) => (
                <tr key={e.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-medium">{e.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{e.masked}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.layer}</td>
                  <td className="px-4 py-3">{e.confidence}%</td>
                  <td className="px-4 py-3">
                    <RiskBadge level={e.risk} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="h-4 w-4 text-muted-foreground" /> Original document
          </h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-secondary/60 p-4 font-mono text-xs">
            {originalLines.join("\n")}
          </pre>
        </div>
        <div className="card-surface p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Lock className="h-4 w-4 text-safe" /> PrivX Safe Copy
          </h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-safe/10 p-4 font-mono text-xs">
            {protectedLines.join("\n")}
          </pre>
          <Button variant="outline" className="mt-4">
            <Download className="h-4 w-4" /> Download PrivX Safe Copy
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Recommended actions</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {recommendations.map((r) => (
            <li key={r} className="card-surface flex items-start gap-3 p-4 text-sm">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ai" />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/dashboard">Back to PrivX Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}