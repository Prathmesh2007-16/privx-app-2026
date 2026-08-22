import { riskStyles, type RiskLevel } from "@/lib/pii-data";
import { cn } from "@/lib/utils";

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const s = riskStyles[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        s.bg,
        s.border,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {level}
    </span>
  );
}
