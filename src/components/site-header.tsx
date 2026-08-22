import { Link } from "@tanstack/react-router";
import { UserRound, Menu } from "lucide-react";
import privxLogo from "@/assets/privx-logo.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/scan", label: "Scan Document" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={privxLogo}
            alt="PrivX logo"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            Priv<span className="text-gradient-ai">X</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/scan">Scan a Document</Link>
          </Button>
          <button
            type="button"
            aria-label="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <UserRound className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={cn("border-t border-border bg-card px-4 py-2 lg:hidden", open ? "block" : "hidden")}>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
            activeProps={{ className: "!text-foreground bg-secondary" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
