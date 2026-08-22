# Shield AI Pro

Build a modern, professional, futuristic web application called:

“PrivacyShield AI”

Tagline:
“Detect. Analyze. Protect. Sensitive Information.”

PROJECT PURPOSE:
PrivacyShield AI is an AI-powered Government PII Detection and Privacy Risk Analysis platform.

The system allows users and organizations to upload documents and automatically detects potentially sensitive Personally Identifiable Information (PII), especially Indian government-related identifiers and personal data.

This is a prototype for a hackathon project. Do NOT claim to verify whether an Aadhaar, PAN, passport, or other government ID belongs to a real person. The application should focus on:
1. Detecting sensitive information
2. Classifying detected information
3. Performing format/context validation
4. Calculating privacy risk
5. Highlighting sensitive information
6. Masking/redacting information
7. Generating a privacy report

IMPORTANT:
Use only fictional/synthetic sample data throughout the UI.

DESIGN STYLE:
- Modern cybersecurity + AI dashboard
- Professional and government/enterprise-friendly
- Clean, premium, futuristic design
- White and light background
- Dark navy blue primary color
- Purple/blue gradients for AI elements
- Green for safe/low-risk status
- Yellow/orange for medium risk
- Red for high/critical risk
- Use modern cards, rounded corners, subtle shadows
- Responsive desktop-first layout
- Clean typography
- Add relevant icons for security, documents, AI, privacy, scanning, reports, and alerts

CREATE THE FOLLOWING PAGES AND FLOW:

====================================================
1. LANDING PAGE
====================================================

Hero section:

Title:
“Protect Sensitive Data Before It Becomes a Data Leak.”

Subtitle:
“PrivacyShield AI automatically detects sensitive personal and government-related information in documents, analyzes privacy risk, and helps create safer versions for sharing.”

Main buttons:
[ Scan a Document ]
[ View Demo ]

Add a professional illustration showing:
Document → AI Scan → PII Detection → Risk Analysis → Protected Document

Below the hero section create:

“How It Works”

Step 1:
Upload Document

Step 2:
Extract Text

Step 3:
AI Detects Sensitive Information

Step 4:
Analyze Privacy Risk

Step 5:
Protect and Generate Safe Copy

Add supported file formats:
PDF, PNG, JPG, DOCX, TXT, CSV

Add a section called:
“What We Detect”

Cards for:
- Aadhaar-like Identifier
- PAN-like Identifier
- Passport Information
- Driving Licence
- Voter ID
- Mobile Number
- Email Address
- Bank Account
- Address
- Personal Names

Add a section called:
“Why PrivacyShield AI?”

Benefits:
- Prevent accidental data leaks
- Automated privacy scanning
- AI + rule-based detection
- Context-aware analysis
- Privacy risk scoring
- Safe document sharing
- Detailed privacy reports

====================================================
2. DOCUMENT UPLOAD PAGE
====================================================

Create a clean document upload interface.

Title:
“Scan Your Document”

Subtitle:
“Upload a document to identify potentially sensitive information.”

Large drag-and-drop upload area.

Text:
“Drag and drop your file here”

Button:
[ Choose File ]

Supported formats displayed below.

Add two options:
[ Upload My Document ]
[ Try Demo Document ]

The “Try Demo Document” should load a fictional sample document.

Add a privacy notice:
“Demo mode uses synthetic sample data. Uploaded documents should be handled securely and are not used for identity verification.”

====================================================
3. AI SCANNING PAGE
====================================================

After uploading a document, show an animated scanning interface.

Title:
“Analyzing Your Document”

Show progress steps:

✓ File Uploaded

→ Extracting Text

→ Scanning for Sensitive Information

→ AI Context Analysis

→ Classifying PII

→ Calculating Privacy Risk

→ Generating Results

Add an animated AI scanning visual with a document and moving scan line.

Show progress percentage:
Example:
“Scanning: 72%”

Then automatically move to the result page.

====================================================
4. DETECTION RESULT PAGE
====================================================

Create a powerful dashboard.

Header:
“Document Analysis Complete”

Show a large Risk Score card.

Example:
Risk Score: 78 / 100
Status: HIGH RISK

Use a circular gauge.

Show summary cards:

Sensitive Entities Detected: 7

Government-related Identifiers: 2

Personal Information: 3

Financial Information: 1

Contact Information: 1

Create a section:

“Detected Sensitive Information”

Use fictional data only.

Example table:

Type | Detected Value | Confidence | Risk

PAN-like Identifier | ABCDE1234F | 98% | High

Government ID Candidate | XXXX XXXX 1234 | 92% | High

Mobile Number | XXXXXXXX10 | 99% | Medium

Email | demo@example.com | 99% | Medium

Address | Sample City, Maharashtra | 85% | Medium

Important:
Show a small disclaimer:

“Detection confidence indicates how strongly the system identifies a pattern or context. This does not confirm government ownership or official identity validity.”

====================================================
5. DOCUMENT VIEW + HIGHLIGHT PAGE
====================================================

Show the uploaded sample document in the center.

Detected sensitive information should be highlighted using different colors:

Red = High Risk

Orange = Medium Risk

Yellow = Low Risk

On the right side create a panel:

“Detected Entities”

Allow users to toggle each detected entity on/off.

Example:

☑ PAN-like Identifier

☑ Government ID Candidate

☑ Mobile Number

☑ Email

☑ Address

Buttons:

[ Highlight All ]

[ Mask Selected ]

[ Create Safe Copy ]

====================================================
6. REDACTION / SAFE COPY PAGE
====================================================

Create a side-by-side comparison.

LEFT:
Original Document

RIGHT:
Protected Document

Example:

Original:
Name: Demo User
Government ID: 1234 5678 9012
PAN: ABCDE1234F
Phone: 9876543210
Email: demo@example.com

Protected:
Name: Demo User
Government ID: XXXX XXXX 9012
PAN: XXXXX1234F
Phone: XXXXXXXX10
Email: d***@example.com

Provide masking options:

○ Full Redaction

○ Partial Masking

○ Custom Selection

Buttons:

[ Generate Safe Document ]

[ Download Safe Copy ]

====================================================
7. PRIVACY REPORT PAGE
====================================================

Create a professional downloadable privacy report.

Sections:

Document Name

Scan Date

Total Sensitive Entities

Detected Categories

Risk Score

Risk Level

Detailed Detection Summary

Recommended Actions

Example recommendations:

- Remove unnecessary sensitive information before sharing.
- Use a masked copy for public distribution.
- Review high-risk identifiers.
- Restrict access to the original document.

Button:
[ Download Privacy Report ]

====================================================
8. ORGANIZATION DASHBOARD
====================================================

Create an enterprise dashboard for organizations.

Top metrics:

Total Documents Scanned

Sensitive Documents

High Risk Documents

Protected Documents

Add charts:

- PII Types Detected
- Risk Distribution
- Documents Scanned Over Time
- Most Common Sensitive Information

Create a table:

Recent Scans

Columns:

Document Name

Date

Risk Score

Status

Action

Add filters:

All

Low Risk

Medium Risk

High Risk

Critical Risk

====================================================
9. CORE PRODUCT WORKFLOW
====================================================

Show this visual workflow somewhere in the website:

USER UPLOADS DOCUMENT
        ↓
DOCUMENT PROCESSING
        ↓
TEXT EXTRACTION / OCR
        ↓
RULE-BASED PATTERN DETECTION
        +
AI / NLP CONTEXT ANALYSIS
        ↓
PII CLASSIFICATION
        ↓
CONFIDENCE SCORE
        ↓
PRIVACY RISK ENGINE
        ↓
RESULTS DASHBOARD
        ↓
HIGHLIGHT / MASK / REDACT
        ↓
SAFE DOCUMENT + PRIVACY REPORT

====================================================
10. IMPORTANT SYSTEM LOGIC
====================================================

The prototype should demonstrate a hybrid detection architecture:

Layer 1:
Pattern Detection
Use regex-style detection for structured information.

Layer 2:
Context Analysis
Analyze nearby words and document context to reduce false positives.

Example:

“PAN Number: ABCDE1234F”
→ High confidence PAN-like identifier

“Reference Number: ABCDE1234F”
→ Lower confidence and requires context analysis

Layer 3:
PII Classification

Categories:

Government-related Identifier

Personal Information

Contact Information

Financial Information

Other Sensitive Information

Layer 4:
Risk Analysis

Calculate risk based on:

- Type of information
- Number of sensitive entities
- Combination of multiple identifiers
- Detection confidence
- Potential exposure level

Risk levels:

0–30 = LOW

31–60 = MEDIUM

61–80 = HIGH

81–100 = CRITICAL

====================================================
11. NAVIGATION
====================================================

Top navigation:

PrivacyShield AI logo

Home

Scan Document

Dashboard

How It Works

About

Profile icon

====================================================

Make the entire application feel like a real AI cybersecurity/privacy product, not a simple college project.

Use realistic interactions, loading states, demo data, animated scanning effects, tooltips, progress indicators, empty states, and professional dashboards.

The final result should be a clickable, visually polished prototype suitable for presenting in a Smart India Hackathon team discussion and demonstrating the complete project workflow.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://echo-protect-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c586f240-f180-4303-ab61-b4ee683afef0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
