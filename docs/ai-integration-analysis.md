# Frontend Input/Output Analysis for Azure AI Integration

## Overview
This document maps every dashboard page, its current **inputs**, what **data it displays**, and **what Azure AI service** should be connected to make it dynamic.

---

## 1. Attack Surface Page
**Path**: `app/(dashboard)/attack-surface/page.tsx`

### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| Search Box | `text input` | Filters local mock data (`mockASMData`). |
| Time Range Selector | `button group` | Filters by `all`, `7d`, `24h`. No real effect. |
| Organization/Env Context | Display Only | Hardcoded from `mockASMData.metadata`. |

### Current Data Displayed
- Domains, Subdomains, Ports, Services from `./data.ts`.
- A network graph.
- Asset details panel.

### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Target Domain Input** | Allow user to enter a domain (e.g., `example.com`) to scan. |
| **Organization Name** | For context. |
| **Environment (Prod/Dev)** | For context. |

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure Agent ("Threat Hunter")** | Takes `Target Domain` as input → Uses **Bing MCP** to find subdomains, IPs. |
| **Microsoft Defender for Cloud API** | Fetch real exposed assets for user's Azure tenant. |
| **Cosmos DB MCP** | Store discovered assets for future queries. |

---

## 2. Audits Page (CORS/CSP & SSRF)
**Path**: `app/(dashboard)/audits/page.tsx`

### 2a. CORS/CSP Visualizer
#### Current Inputs: **NONE** 
- Data is 100% hardcoded (`securePolicy`, `vulnerablePolicy`, `exploitSteps`).
- Has a toggle button: "Fix Policy".

#### Current Data Displayed
- A "Policy Diff Viewer" showing secure vs. vulnerable config.
- A "Live Exploit Simulation" (hardcoded steps).

#### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Target URL** | User enters a URL → Agent fetches its CORS/CSP headers. |

#### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure Function (Custom MCP)** | An HTTP fetcher that gets headers from the target URL. |
| **Azure OpenAI** | Analyze headers and generate "vulnerable policy" vs "recommended policy". |

---

### 2b. SSRF Pentester
#### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| Endpoint List (Left Panel) | Selectable List | Hardcoded from `discoveredEndpoints`. |
| URL Bar (Center) | `text input` | **The main input!** User can type a URL. |
| "Send Request" Button | `button` | Triggers `handleSendRequest()`. |

#### Current Data Displayed
- Discovered Endpoints list.
- Request Inspector (URL bar + response body).
- AI Copilot suggestions (hardcoded `aiSuggestions`).

#### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Base Target URL** | A primary target to crawl for SSRF endpoints. |

> [!TIP]
> This page already has a functional input loop (URL -> Send -> Response). It just uses hardcoded logic.

#### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure Function (Proxy Scanner)** | Receives the URL from the input, makes the request, returns the response. |
| **Azure OpenAI ("SSRF Expert")** | Generate AI Copilot suggestions based on the target URL (e.g., "Try `http://169.254.169.254/`"). |

---

## 3. Code Security Page
**Path**: `app/(dashboard)/code-security/page.tsx`

### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| PR Selector Dropdown | `<select>` | Switches between `prScenarios` (hardcoded). |
| "Re-run Scan" Button | `button` | Simulates a scan (just a loader). |
| "Request Changes" Button | `button` | Simulates a request (just a loader). |

### Current Data Displayed
- PR context (repo name, branch, author, commit hash).
- Findings List (issues with severity, file, line number).
- Code Context Panel (highlighted code snippet with AI explanation).

### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **GitHub Repo URL** | User enters `https://github.com/owner/repo`. |
| **PR Number (Optional)** | To scan a specific PR. |
| **GitHub Token** | For authentication (can be stored in settings). |

> [!IMPORTANT]
> This is the **most impactful page** to integrate with Azure. The workflow is clear: Input Repo -> Scan PRs -> Show Findings.

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **GitHub MCP** | Fetch list of PRs, file diffs, and code content for a given repo URL. |
| **Azure OpenAI ("Code Auditor")** | Analyze code diff for OWASP Top 10 vulnerabilities. |
| **Cosmos DB MCP** | Store findings for historical tracking. |

---

## 4. Firewall Page
**Path**: `app/(dashboard)/firewall/page.tsx`

### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| Stage Index (Internal State) | `number` | Controlled by `NarrativeTimeline` component. |

### Current Data Displayed
- "Static Rules" vs "AI Intelligence Stack" comparison.
- "Decision Arena" showing AI confidence.
- "Learned Behaviors" and "Impact Feed".
- A timeline to scrub through evolution stages.

### Gaps (Missing Inputs)
> This page is more of a **demo/visualization** page. No direct user input is expected.

| New Input Needed | Purpose |
| :--- | :--- |
| **Connection to Real WAF** | Read live WAF rules from Azure WAF. |

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure WAF (via Azure MCP)** | Fetch current WAF rules. |
| **Azure ML (Optional)** | Provide "learned behaviors" based on traffic patterns. |

---

## 5. Incidents Page
**Path**: `app/(dashboard)/incidents/page.tsx`

### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| Scenario Selector | `<select>` | Switches between `incidentScenarios` (hardcoded). |
| Timeline Step Clicks | Interactive | Auto-plays, user can click steps. |

### Current Data Displayed
- Incident header (severity, type, description, time detected).
- Attack Path Reconstruction timeline.
- AI Root Cause Analysis text.
- Code View (vulnerable code snippet).

### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Incident ID / Log Query** | Allow user to select a real incident from logs. |

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure Monitor / App Insights** | Fetch real incident logs and traces. |
| **GitHub MCP** | If the incident relates to a code change, fetch the PR. |
| **Azure OpenAI** | Generate the "AI Root Cause Analysis" narrative. |

---

## 6. Vulnerabilities Page
**Path**: `app/(dashboard)/vulnerabilities/page.tsx`

### Current Inputs
| Input Field | Type | Current State |
| :--- | :--- | :--- |
| Date Filter Button | `button` | Toggles between `all` and `30d`. |
| "Configure Alerts" Button | `button` | Opens a side panel. |

### Current Data Displayed
- "Threat Meter" (overall score).
- "CVE Cards" (list of CVEs with AI prediction).
- "Total Analysed" count.

### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Target Asset / Software** | Filter CVEs relevant to the user's stack (e.g., "nginx", "react"). |

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure AI Search (CVE Vector DB)** | Store and query CVE data with semantic search. |
| **Azure OpenAI** | Generate "AI Prediction" and "Reasoning" for each CVE. |

---

## 7. Notifications Page
**Path**: `app/(dashboard)/notifications/page.tsx`

### Current Inputs: **NONE** (Display Only)

### Current Data Displayed
- Alert Feed (list of alerts with severity, source, time).
- Alert Stats Panel (counts by severity).

### Gaps (Missing Inputs)
| New Input Needed | Purpose |
| :--- | :--- |
| **Alert Source (Optional)** | Filter by source (e.g., "WAF", "Code Scan"). |

### Proposed AI Integration
| Azure Service | Role |
| :--- | :--- |
| **Azure Logic Apps** | Ingest alerts from various sources (WAF, Defender, custom). |
| **Cosmos DB MCP** | Store all alerts. Agent queries DB to display. |

---

## Summary: Service to Page Mapping

| Page | Primary Input | Key Azure Service | MCP Tool |
| :--- | :--- | :--- | :--- |
| **Attack Surface** | Target Domain | Defender for Cloud | Bing MCP |
| **Audits (CORS)** | Target URL | Azure Function | OpenAI |
| **Audits (SSRF)** | URL to Test | Azure Function | OpenAI |
| **Code Security** | GitHub Repo URL | Azure OpenAI | **GitHub MCP** |
| **Firewall** | (None - Read Only) | Azure WAF | Azure MCP |
| **Incidents** | Incident ID / Log | Azure Monitor | GitHub MCP |
| **Vulnerabilities** | Target Software | Azure AI Search | OpenAI |
| **Notifications** | (None - Display) | Logic Apps | Cosmos DB MCP |

---

## Next Steps (Execution Phase)
1.  Create a **Settings Page** (`/settings`) with input fields for:
    *   Azure Foundry API Key
    *   GitHub Personal Access Token
    *   Target Organization Name
2.  Create an API route `app/api/agent/route.ts` to proxy requests to Azure AI Foundry.
3.  Modify each page to:
    *   Add the missing input fields.
    *   Call the API route on submit.
    *   Display the dynamic response instead of mock data.
