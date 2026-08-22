import { riskLevelFromScore, riskStyles, type RiskLevel } from "@/lib/pii-data";
import { cn } from "@/lib/utils";

const strokeFor: Record<RiskLevel, string> = {
  LOW: "var(--safe)",
  MEDIUM: "var(--warn)",
  HIGH: "var(--danger)",
  CRITICAL: "var(--critical)",
};

export function RiskGauge({ score, size = 200 }: { score: number; size?: number }) {
  const level = riskLevelFromScore(score);
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--muted)" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={strokeFor[level]}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold tabular-nums">{score}</span>
        <span className="text-xs text-muted-foreground">out of 100</span>
        <span className={cn("mt-1 text-xs font-semibold tracking-wide", riskStyles[level].text)}>
          {level} RISK
        </span>
      </div>
    </div>
  );
}
