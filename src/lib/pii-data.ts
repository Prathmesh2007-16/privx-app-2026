export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type PiiCategory =
  | "Government-related Identifier"
  | "Personal Information"
  | "Contact Information"
  | "Financial Information"
  | "Other Sensitive Information";

export interface DetectedEntity {
  id: string;
  type: string;
  category: PiiCategory;
  /** Raw text as it appears in the synthetic document. */
  value: string;
  /** Masked / partially redacted representation. */
  masked: string;
  /** Fully redacted representation. */
  redacted: string;
  confidence: number;
  risk: RiskLevel;
  layer: "Pattern" | "Pattern + Context" | "AI Context";
  context: string;
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score <= 30) return "LOW";
  if (score <= 60) return "MEDIUM";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}

export const riskStyles: Record<RiskLevel, { text: string; bg: string; border: string; dot: string }> = {
  LOW: {
    text: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/30",
    dot: "bg-safe",
  },
  MEDIUM: {
    text: "text-warn",
    bg: "bg-warn/15",
    border: "border-warn/40",
    dot: "bg-warn",
  },
  HIGH: {
    text: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/30",
    dot: "bg-danger",
  },
  CRITICAL: {
    text: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/30",
    dot: "bg-critical",
  },
};

/** Fictional / synthetic sample document used across the prototype. */
export const demoDocument = {
  name: "employee_onboarding_form_demo.pdf",
  sizeLabel: "248 KB",
  pages: 1,
  scanDate: "22 Aug 2026, 10:32 IST",
  lines: [
    "SYNTHETIC SAMPLE DOCUMENT — NOT A REAL RECORD",
    "",
    "NORTHWIND SERVICES PVT LTD",
    "Employee Onboarding & Verification Form",
    "",
    "Full Name: Demo User",
    "Date of Birth: 14 Feb 1994",
    "Government ID: 1234 5678 9012",
    "PAN Number: ABCDE1234F",
    "Passport No: M1234567",
    "Driving Licence: MH12 20110012345",
    "Voter ID: ABC1234567",
    "Phone: 9876543210",
    "Email: demo@example.com",
    "Address: 42 Sample Street, Sample City, Maharashtra 400001",
    "Bank Account: 123456789012 (IFSC: DEMO0001234)",
    "Reference Number: ABCDE1234F",
    "",
    "Declaration: All information above is fictional demo data generated",
    "for the PrivX prototype and does not identify any person.",
  ],
};

export const detectedEntities: DetectedEntity[] = [
  {
    id: "e1",
    type: "PAN-like Identifier",
    category: "Government-related Identifier",
    value: "ABCDE1234F",
    masked: "XXXXX1234F",
    redacted: "[REDACTED — PAN-LIKE]",
    confidence: 98,
    risk: "HIGH",
    layer: "Pattern + Context",
    context: "Preceded by the label “PAN Number:” — strong contextual signal.",
  },
  {
    id: "e2",
    type: "Government ID Candidate",
    category: "Government-related Identifier",
    value: "1234 5678 9012",
    masked: "XXXX XXXX 9012",
    redacted: "[REDACTED — GOV ID CANDIDATE]",
    confidence: 92,
    risk: "HIGH",
    layer: "Pattern + Context",
    context: "12-digit grouped numeric pattern near the label “Government ID”.",
  },
  {
    id: "e3",
    type: "Passport Information",
    category: "Government-related Identifier",
    value: "M1234567",
    masked: "MXXXXX67",
    redacted: "[REDACTED — PASSPORT]",
    confidence: 89,
    risk: "HIGH",
    layer: "Pattern + Context",
    context: "Alphanumeric passport-style pattern under a passport label.",
  },
  {
    id: "e4",
    type: "Driving Licence",
    category: "Government-related Identifier",
    value: "MH12 20110012345",
    masked: "MHXX XXXXXX12345",
    redacted: "[REDACTED — DRIVING LICENCE]",
    confidence: 87,
    risk: "MEDIUM",
    layer: "Pattern",
    context: "State-code prefixed licence-style pattern.",
  },
  {
    id: "e5",
    type: "Voter ID",
    category: "Government-related Identifier",
    value: "ABC1234567",
    masked: "XXX1234567",
    redacted: "[REDACTED — VOTER ID]",
    confidence: 84,
    risk: "MEDIUM",
    layer: "Pattern + Context",
    context: "Three letters followed by seven digits near “Voter ID”.",
  },
  {
    id: "e6",
    type: "Mobile Number",
    category: "Contact Information",
    value: "9876543210",
    masked: "XXXXXXXX10",
    redacted: "[REDACTED — PHONE]",
    confidence: 99,
    risk: "MEDIUM",
    layer: "Pattern",
    context: "10-digit number starting with 9 under a “Phone” label.",
  },
  {
    id: "e7",
    type: "Email Address",
    category: "Contact Information",
    value: "demo@example.com",
    masked: "d***@example.com",
    redacted: "[REDACTED — EMAIL]",
    confidence: 99,
    risk: "MEDIUM",
    layer: "Pattern",
    context: "RFC-style email pattern match.",
  },
  {
    id: "e8",
    type: "Bank Account",
    category: "Financial Information",
    value: "123456789012",
    masked: "XXXXXXXX9012",
    redacted: "[REDACTED — BANK ACCOUNT]",
    confidence: 94,
    risk: "HIGH",
    layer: "Pattern + Context",
    context: "Long numeric string adjacent to an IFSC-style code.",
  },
  {
    id: "e9",
    type: "Address",
    category: "Personal Information",
    value: "42 Sample Street, Sample City, Maharashtra 400001",
    masked: "Sample City, Maharashtra",
    redacted: "[REDACTED — ADDRESS]",
    confidence: 85,
    risk: "MEDIUM",
    layer: "AI Context",
    context: "Locality + state + postal-code structure recognised by the NLP layer.",
  },
  {
    id: "e10",
    type: "Personal Name",
    category: "Personal Information",
    value: "Demo User",
    masked: "D*** U***",
    redacted: "[REDACTED — NAME]",
    confidence: 91,
    risk: "LOW",
    layer: "AI Context",
    context: "Named-entity recognition under the “Full Name” field.",
  },
  {
    id: "e11",
    type: "Date of Birth",
    category: "Personal Information",
    value: "14 Feb 1994",
    masked: "XX XXX 1994",
    redacted: "[REDACTED — DOB]",
    confidence: 88,
    risk: "MEDIUM",
    layer: "Pattern + Context",
    context: "Date pattern under a “Date of Birth” label.",
  },
  {
    id: "e12",
    type: "Unverified Identifier Candidate",
    category: "Other Sensitive Information",
    value: "Reference Number: ABCDE1234F",
    masked: "Reference Number: ABCDE1234F",
    redacted: "[REDACTED — CANDIDATE]",
    confidence: 41,
    risk: "LOW",
    layer: "AI Context",
    context:
      "Same pattern as a PAN-like identifier, but the surrounding label “Reference Number” lowers confidence.",
  },
];

export const riskScore = 78;
export const riskLevel = riskLevelFromScore(riskScore);

export const categoryCounts = detectedEntities.reduce<Record<string, number>>((acc, e) => {
  acc[e.category] = (acc[e.category] ?? 0) + 1;
  return acc;
}, {});

export const protectedLines = [
  "Name: Demo User",
  "Government ID: XXXX XXXX 9012",
  "PAN: XXXXX1234F",
  "Phone: XXXXXXXX10",
  "Email: d***@example.com",
];

export const originalLines = [
  "Name: Demo User",
  "Government ID: 1234 5678 9012",
  "PAN: ABCDE1234F",
  "Phone: 9876543210",
  "Email: demo@example.com",
];

export const recommendations = [
  "Remove unnecessary sensitive information before sharing.",
  "Use a masked copy for public distribution.",
  "Review high-risk identifiers with the document owner.",
  "Restrict access to the original document to authorised staff only.",
  "Store the original in an encrypted repository with an audit trail.",
];

export const supportedFormats = ["PDF", "PNG", "JPG", "DOCX", "TXT", "CSV"];

export interface ScanRecord {
  id: string;
  name: string;
  date: string;
  score: number;
  entities: number;
  status: RiskLevel;
}

export const recentScans: ScanRecord[] = [
  { id: "SC-1042", name: "employee_onboarding_form_demo.pdf", date: "22 Aug 2026", score: 78, entities: 12, status: "HIGH" },
  { id: "SC-1041", name: "vendor_kyc_packet_demo.pdf", date: "22 Aug 2026", score: 91, entities: 19, status: "CRITICAL" },
  { id: "SC-1040", name: "internal_memo_q3_demo.docx", date: "21 Aug 2026", score: 22, entities: 2, status: "LOW" },
  { id: "SC-1039", name: "payroll_export_demo.csv", date: "21 Aug 2026", score: 88, entities: 24, status: "CRITICAL" },
  { id: "SC-1038", name: "scanned_id_proof_demo.jpg", date: "20 Aug 2026", score: 74, entities: 9, status: "HIGH" },
  { id: "SC-1037", name: "grievance_form_demo.pdf", date: "20 Aug 2026", score: 48, entities: 5, status: "MEDIUM" },
  { id: "SC-1036", name: "training_attendance_demo.txt", date: "19 Aug 2026", score: 18, entities: 1, status: "LOW" },
  { id: "SC-1035", name: "contractor_agreement_demo.docx", date: "19 Aug 2026", score: 57, entities: 7, status: "MEDIUM" },
];

export const piiTypeChartData = [
  { type: "Mobile", count: 412 },
  { type: "Email", count: 386 },
  { type: "Gov ID", count: 254 },
  { type: "PAN-like", count: 198 },
  { type: "Address", count: 176 },
  { type: "Bank", count: 121 },
  { type: "Passport", count: 64 },
];

export const riskDistributionData = [
  { name: "Low", value: 486, key: "LOW" as RiskLevel },
  { name: "Medium", value: 312, key: "MEDIUM" as RiskLevel },
  { name: "High", value: 168, key: "HIGH" as RiskLevel },
  { name: "Critical", value: 62, key: "CRITICAL" as RiskLevel },
];

export const scansOverTimeData = [
  { month: "Mar", scans: 118, highRisk: 21 },
  { month: "Apr", scans: 164, highRisk: 33 },
  { month: "May", scans: 209, highRisk: 41 },
  { month: "Jun", scans: 246, highRisk: 38 },
  { month: "Jul", scans: 302, highRisk: 57 },
  { month: "Aug", scans: 389, highRisk: 74 },
];

export const scanSteps = [
  "File Uploaded",
  "Extracting Text",
  "Scanning for Sensitive Information",
  "AI Context Analysis",
  "Classifying PII",
  "Calculating Privacy Risk",
  "Generating Results",
];
