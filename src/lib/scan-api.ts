import type { RiskLevel, DetectedEntity } from "./pii-data";

/** Shape returned by the FastAPI backend's /api/scan endpoint. */
export interface ScanApiResult {
  document_name: string;
  size_label: string;
  scan_date: string;
  extracted_text_preview: string[];
  detected_entities: DetectedEntity[];
  category_counts: Record<string, number>;
  risk_score: number;
  risk_level: RiskLevel;
  protected_lines: string[];
  original_lines: string[];
  recommendations: string[];
}

// Change this if you deploy the backend somewhere other than localhost.
const API_BASE = "http://localhost:8000";
const STORAGE_KEY = "privx_scan_result";

export async function scanDocument(file: File): Promise<ScanApiResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/scan`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Scan failed (status ${res.status})`);
  }

  return res.json();
}

export function saveScanResult(result: ScanApiResult) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadScanResult(): ScanApiResult | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ScanApiResult;
  } catch {
    return null;
  }
}

export function clearScanResult() {
  sessionStorage.removeItem(STORAGE_KEY);
}