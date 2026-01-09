
export interface PolicyLine {
  id: number;
  content: string;
  isVulnerable: boolean;
  type: 'cors' | 'csp';
  warning?: string; // e.g., "Wildcard Origin"
}

export interface ExploitStep {
  id: number;
  label: string;
  description: string;
  source: string;
  destination: string;
  payload?: string;
}

export interface SsrEndpoint {
  id: string;
  url: string;
  source: 'Wayback' | 'CommonCrawl' | 'GitHub';
  status: 'untested' | 'interesting' | 'internal';
  lastSeen: string;
}

export interface AiSuggestion {
  id: string;
  payload: string;
  type: 'metadata' | 'localhost' | 'dns-rebind';
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
}

export const vulnerablePolicy: PolicyLine[] = [
  { id: 1, content: "Access-Control-Allow-Origin: *", isVulnerable: true, type: "cors", warning: "Wildcard Origin" },
  { id: 2, content: "Access-Control-Allow-Credentials: true", isVulnerable: true, type: "cors", warning: "Credential Leakage Risk" },
  { id: 3, content: "Access-Control-Allow-Methods: GET, POST, PUT, DELETE", isVulnerable: false, type: "cors" },
  { id: 4, content: "Content-Security-Policy: script-src * 'unsafe-inline'", isVulnerable: true, type: "csp", warning: "Untrusted Script Execution" },
  { id: 5, content: "X-Frame-Options: ALLOW-FROM *", isVulnerable: true, type: "csp", warning: "Clickjacking Risk" }
];

export const securePolicy: PolicyLine[] = [
  { id: 1, content: "Access-Control-Allow-Origin: https://app.company.com", isVulnerable: false, type: "cors" },
  { id: 2, content: "Access-Control-Allow-Credentials: true", isVulnerable: false, type: "cors" },
  { id: 3, content: "Access-Control-Allow-Methods: GET, POST", isVulnerable: false, type: "cors" },
  { id: 4, content: "Content-Security-Policy: script-src 'self'", isVulnerable: false, type: "csp" },
  { id: 5, content: "X-Frame-Options: DENY", isVulnerable: false, type: "csp" }
];

export const exploitSteps: ExploitStep[] = [
    { id: 1, label: "Attacker Request", description: "Malicious site initiates request", source: "attacker.com", destination: "api.company.com", payload: "fetch('https://api.company.com/user')" },
    { id: 2, label: "Cookie Transmission", description: "Browser attaches session cookies automatically", source: "Browser", destination: "api.company.com", payload: "Cookie: session_id=xyz123" },
    { id: 3, label: "Data Leak", description: "Server responds with sensitive data", source: "api.company.com", destination: "attacker.com", payload: "JSON: { email: 'ceo@company.com' }" }
];

export const discoveredEndpoints: SsrEndpoint[] = [
    { id: "e1", url: "/api/internal/health", source: "Wayback", status: "interesting", lastSeen: "2 days ago" },
    { id: "e2", url: "/debug/metrics", source: "CommonCrawl", status: "interesting", lastSeen: "5 days ago" },
    { id: "e3", url: "http://169.254.169.254/latest/meta-data/", source: "GitHub", status: "internal", lastSeen: "1 week ago" },
    { id: "e4", url: "/metadata/instance", source: "Wayback", status: "internal", lastSeen: "3 days ago" },
    { id: "e5", url: "/static/images/logo.png", source: "CommonCrawl", status: "untested", lastSeen: "1 month ago" }
];

export const aiSuggestions: AiSuggestion[] = [
    { id: "s1", payload: "http://169.254.169.254/latest/meta-data/iam/security-credentials/", type: "metadata", riskLevel: "high", reason: "Standard AWS EC2 metadata path" },
    { id: "s2", payload: "http://localhost:8080/admin", type: "localhost", riskLevel: "high", reason: "Common internal admin port" },
    { id: "s3", payload: "file:///etc/passwd", type: "metadata", riskLevel: "medium", reason: "Local file inclusion check" },
    { id: "s4", payload: "http://attacker-controlled-dns.com", type: "dns-rebind", riskLevel: "low", reason: "Test for DNS rebinding protection" }
];
