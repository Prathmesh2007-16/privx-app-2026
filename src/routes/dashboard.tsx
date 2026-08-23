import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, FileSearch, Loader2, ScanLine, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/risk-badge";
import type { RiskLevel } from "@/lib/pii-data";
import {
  piiTypeChartData as demoPiiTypeChartData,
  recentScans as demoRecentScans,
  riskDistributionData as demoRiskDistributionData,
  scansOverTimeData as demoScansOverTimeData,
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

const API_BASE = "http://localhost:8000";

interface DashboardStats {
  documentsScanned: number;
  safeCopies: number;
  highCriticalFindings: number;
  avgRiskScore: number;
}

interface DashboardData {
  stats: DashboardStats;
  piiTypeChartData: { type: string; count: number }[];
  riskDistributionData: { name: string; value: number; key: RiskLevel }[];
  scansOverTimeData: { month: string; scans: number; highRisk: number }[];
  recentScans: { id: string; name: string; date: string; score: number; entities: number; status: RiskLevel }[];
  hasData: boolean;
}

function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/dashboard`)
      .then((res) => {
        if (!res.ok) throw new Error("Dashboard request failed");
        return res.json();
      })
      .then((json: DashboardData) => {
        if (cancelled) return;
        if (!json.hasData) {
          // No real scans yet — show demo data so the page isn't empty,
          // but flag it so we can say so on screen.
          setUsingDemo(true);
        } else {
          setData(json);
        }
      })
      .catch(() => {
        if (!cancelled) setUsingDemo(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const piiTypeChartData = data?.piiTypeChartData?.length ? data.piiTypeChartData : demoPiiTypeChartData;
  const riskDistributionData = data?.riskDistributionData ?? demoRiskDistributionData;
  const scansOverTimeData = data?.scansOverTimeData?.length ? data.scansOverTimeData : demoScansOverTimeData;
  const recentScans = data?.recentScans?.length ? data.recentScans : demoRecentScans;

  const stats = data?.stats ?? {
    documentsScanned: 1428,
    safeCopies: 912,
    highCriticalFindings: 230,
    avgRiskScore: 54,
  };

  const statCards = [
    { icon: FileSearch, label: "Documents scanned", value: String(stats.documentsScanned) },
    { icon: ShieldCheck, label: "PrivX Safe Copies", value: String(stats.safeCopies) },
    { icon: AlertTriangle, label: "High / critical findings", value: String(stats.highCriticalFindings) },
    { icon: ScanLine, label: "Avg. privacy risk score", value: String(stats.avgRiskScore) },
  ];

  const maxType = Math.max(1, ...piiTypeChartData.map((d) => d.count));
  const maxScans = Math.max(1, ...scansOverTimeData.map((d) => d.scans));
  const totalRisk = Math.max(1, riskDistributionData.reduce((a, b) => a + b.value, 0));

  if (loading) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-32">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-ai uppercase">Organization</span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">PrivX Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {usingDemo || !data
              ? "No scans yet — showing synthetic demo data. Run a scan to see your real numbers here."
              : "Live stats from your PrivX scan history."}
          </p>
        </div>
        <Button asChild className="gradient-ai border-0 shadow-glow">
          <Link to="/scan">
            <ScanLine className="h-4 w-4" /> New PrivX AI Scan
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
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