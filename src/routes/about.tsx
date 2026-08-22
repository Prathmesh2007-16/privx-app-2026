import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Lock, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PrivX — Privacy Intelligence Platform" },
      {
        name: "description",
        content:
          "PrivX is an AI-powered privacy intelligence platform that detects sensitive PII, analyzes privacy risk and protects data before it is shared.",
      },
      { property: "og:title", content: "About PrivX" },
      { property: "og:description", content: "Detect. Analyze. Protect. — the mission behind PrivX." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://echo-protect-ai.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://echo-protect-ai.lovable.app/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "Privacy by default", text: "Documents are analysed to reduce exposure, never to profile people." },
  { icon: Brain, title: "Hybrid intelligence", text: "Rules give recall, AI context gives precision — PrivX uses both." },
  { icon: Lock, title: "Safe sharing", text: "Every scan can produce a PrivX Safe Copy for external distribution." },
  { icon: Users, title: "Built for teams", text: "Organization dashboards make privacy risk visible, not theoretical." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold tracking-widest text-ai uppercase">About</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Priv<span className="text-gradient-ai">X</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          PrivX is an AI-powered privacy intelligence platform that detects sensitive Personally
          Identifiable Information (PII), analyzes privacy risks, and helps protect sensitive data before
          it is shared.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="card-surface flex gap-4 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <v.icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">{v.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface mt-10 p-6">
        <h2 className="text-sm font-semibold">Prototype disclaimer</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          PrivX is a hackathon prototype. All documents, identifiers and analytics shown are synthetic.
          PrivX does not verify whether any identifier belongs to a real person.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="gradient-ai border-0 shadow-glow">
          <Link to="/scan">Try PrivX</Link>
        </Button>
      </div>
    </div>
  );
}
