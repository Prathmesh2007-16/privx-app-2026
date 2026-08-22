import { Link } from "@tanstack/react-router";
import privxLogo from "@/assets/privx-logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={privxLogo} alt="PrivX logo" width={32} height={32} loading="lazy" className="h-8 w-8" />
            <span className="font-display font-bold">PrivX</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Detect. Analyze. Protect. A hackathon prototype for AI-assisted PII
            detection and privacy risk analysis. All data shown is synthetic.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/scan" className="hover:text-foreground">Scan Document</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Organization Dashboard</Link></li>
            <li><Link to="/report" className="hover:text-foreground">Privacy Report</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        Prototype only — PrivX does not verify whether any identifier belongs to a real person.
      </div>
    </footer>
  );
}
