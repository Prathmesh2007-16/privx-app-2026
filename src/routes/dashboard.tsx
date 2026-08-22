import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, FileSearch, ScanLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import {
  piiTypeChartData,
  recentScans,
  riskDistributionData,
  scansOverTimeData,
} from "@/lib/pii-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "PrivX Dashboard — Organization Privacy Overview" },
      {
        name: "description",
        content:
          "PrivX Dashboard: organization-wide scan volume, detected PII types, privacy risk distribution and recent document scans.",
      },
      { property: "og:title", content: "PrivX Dashboard" },
      {
        property: "og:description",
        content: "Organization-wide privacy risk overview powered by PrivX.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://echo-protect-ai.lovable.app/dashboard" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://echo-protect-ai.lovable.app/dashboard" }],
  }),
  component: DashboardPage,
});

const maxType = Math.max(...piiTypeChartData.map((d) => d.count));
const maxScans = Math.max(...scansOverTimeData.map((d) => d.scans));
const totalRisk = riskDistributionData.reduce((a, b) => a + b.value, 0);

const stats = [
  { icon: FileSearch, label: "Documents scanned", value: "1,428" },
  { icon: ShieldCheck, label: "PrivX Safe Copies", value: "912" },
  { icon: AlertTriangle, label: "High / critical findings", value: "230" },
  { icon: ScanLine, label: "Avg. privacy risk score", value: "54" },
];

function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-ai uppercase">Organization</span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">PrivX Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Protected by PrivX — synthetic demo data across all widgets.
          </p>
        </div>
        <Button asChild className="gradient-ai border-0 shadow-glow">
          <Link to="/scan">
            <ScanLine className="h-4 w-4" /> New PrivX AI Scan
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <s.icon className="h-4 w-4" />
            </span>
            <p className="mt-4 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-sm font-semibold">Most detected PII types</h2>
          <ul className="mt-5 space-y-3">
            {piiTypeChartData.map((d) => (
              <li key={d.type} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 text-muted-foreground">{d.type}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="gradient-ai block h-full rounded-full"
                    style={{ width: `${(d.count / maxType) * 100}%` }}
                  />
                </span>
                <span className="w-10 text-right font-mono text-xs">{d.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-sm font-semibold">Privacy risk distribution</h2>
          <ul className="mt-5 space-y-3">
            {riskDistributionData.map((d) => (
              <li key={d.key} className="flex items-center gap-3 text-sm">
                <RiskBadge level={d.key} />
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-foreground/60"
                    style={{ width: `${(d.value / totalRisk) * 100}%` }}
                  />
                </span>
                <span className="w-10 text-right font-mono text-xs">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-surface mt-6 p-6">
        <h2 className="text-sm font-semibold">Scans over time</h2>
        <div className="mt-6 flex h-40 items-end gap-4">
          {scansOverTimeData.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-full w-full items-end justify-center gap-1">
                <span
                  className="gradient-ai w-1/2 rounded-t-md"
                  style={{ height: `${(d.scans / maxScans) * 100}%` }}
                />
                <span
                  className="w-1/4 rounded-t-md bg-danger/70"
                  style={{ height: `${(d.highRisk / maxScans) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold">Recent scans</h2>
        <div className="card-surface mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Scan ID</th>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Entities</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((s) => (
                <tr key={s.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.date}</td>
                  <td className="px-4 py-3">{s.entities}</td>
                  <td className="px-4 py-3">{s.score}</td>
                  <td className="px-4 py-3">
                    <RiskBadge level={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
