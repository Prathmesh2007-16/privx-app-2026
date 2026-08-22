import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { FileText, Info, Loader2, ShieldCheck, Sparkles, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoDocument, supportedFormats } from "@/lib/pii-data";
import { scanDocument, saveScanResult } from "@/lib/scan-api";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan Your Document — PrivX" },
      {
        name: "description",
        content:
          "Upload a document or load a synthetic demo file to identify potentially sensitive personal and government-related information.",
      },
      { property: "og:title", content: "Scan Your Document — PrivX" },
      { property: "og:description", content: "Upload a document to identify potentially sensitive information." },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  // Keep the real File object (needed to send to the backend), plus display info.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const pick = (f: File) => setSelectedFile(f);

  const start = async (demo: boolean) => {
    if (demo) {
      navigate({ to: "/scanning", search: { demo: true } });
      return;
    }

    if (!selectedFile) {
      toast.error("Choose a file first", { description: "Or run the scan with the synthetic demo document." });
      return;
    }

    setIsScanning(true);
    try {
      const result = await scanDocument(selectedFile);
      saveScanResult(result);
      navigate({ to: "/scanning", search: { demo: false } });
    } catch (err) {
      toast.error("Scan failed", {
        description:
          err instanceof Error
            ? err.message
            : "Could not reach the PrivX backend. Is it running on http://localhost:8000?",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ai/25 bg-card px-3 py-1 text-xs font-semibold text-ai shadow-soft">
          <Sparkles className="h-3.5 w-3.5" /> Step 1 of 5
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold">Scan Your Document</h1>
        <p className="mt-3 text-muted-foreground">
          Upload a document to identify potentially sensitive information.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) pick(f);
        }}
        className={cn(
          "mt-10 rounded-3xl border-2 border-dashed p-12 text-center transition-colors",
          dragging ? "border-ai bg-accent/50" : "border-border bg-card shadow-soft",
        )}
      >
        <span
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl",
            dragging ? "gradient-ai animate-pulse-ring" : "bg-secondary",
          )}
        >
          <UploadCloud className={cn("h-7 w-7", dragging ? "text-primary-foreground" : "text-muted-foreground")} />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold">Drag and drop your file here</h2>
        <p className="mt-1 text-sm text-muted-foreground">or browse from your device</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.docx,.txt,.csv"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) pick(f);
          }}
        />
        <Button className="mt-5" variant="outline" onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {supportedFormats.map((f) => (
            <span key={f} className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground">
              {f}
            </span>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {Math.max(1, Math.round(selectedFile.size / 1024))} KB · ready to scan
            </p>
          </div>
          <button
            aria-label="Remove file"
            onClick={() => setSelectedFile(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button size="lg" className="gradient-ai border-0 shadow-glow" onClick={() => start(false)} disabled={isScanning}>
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Scanning...
            </>
          ) : (
            "Upload My Document"
          )}
        </Button>
        <Button size="lg" variant="outline" onClick={() => start(true)} disabled={isScanning}>
          Try Demo Document
        </Button>
      </div>

      <div className="mt-6 flex gap-3 rounded-xl border border-ai/20 bg-accent/40 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ai" />
        <p className="text-xs leading-relaxed text-accent-foreground">
          Demo mode uses synthetic sample data. Uploaded documents should be handled securely and are not used
          for identity verification.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-safe" /> Demo document preview
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {demoDocument.name} · {demoDocument.sizeLabel} · {demoDocument.pages} page
        </p>
        <pre className="mt-4 max-h-44 overflow-auto rounded-xl border border-border bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground">
{demoDocument.lines.slice(0, 12).join("\n")}
        </pre>
      </div>
    </div>
  );
}