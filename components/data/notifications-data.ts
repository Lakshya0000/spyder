
export type AlertType = 'phishing' | 'incident' | 'change';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'mitigated' | 'investigating';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  timestamp: string;
  severity: Severity;
  status: AlertStatus;
  source: string; // e.g., "Email Gateway", "WAF", "Policy Engine"
  assets: string[]; // e.g., "user@company.com", "Production DB"
  reasoning: string; // The "Width" - e.g., "User replied to known phishing sender pattern"
  technicalDetails?: {
    label: string;
    value: string;
  }[];
  actions?: {
    label: string;
    action: string;
    primary?: boolean;
  }[];
}

export const alerts: Alert[] = [
  {
    id: "a1",
    type: "phishing",
    title: "Phishing Reply Detected",
    timestamp: "2 mins ago",
    severity: "critical",
    status: "active",
    source: "Email Security Gateway",
    assets: ["sarah.jones@company.com"],
    reasoning: "User attempted to reply to a sender with a domain similarity score of 98% to 'support@microsoft.com' (spoofed). Outbound traffic intercepted.",
    technicalDetails: [
      { label: "Sender", value: "support@micr0soft.com" },
      { label: "Detected Intent", value: "Credential Harvesting" }
    ],
    actions: [
      { label: "Block Sender", action: "block_sender", primary: true },
      { label: "Quarantine Email", action: "quarantine" }
    ]
  },
  {
    id: "a2",
    type: "incident",
    title: "Auth Bypass Attempt",
    timestamp: "15 mins ago",
    severity: "high",
    status: "mitigated",
    source: "Identity Provider",
    assets: ["Admin Portal", "API Gateway"],
    reasoning: "Multiple failed MFA attempts followed by a successful login from a previously unseen IP in a different geolocation (Impossible Travel).",
    technicalDetails: [
      { label: "IP Address", value: "192.168.1.5 (VPN Exit Node)" },
      { label: "User", value: "admin_sys" }
    ],
    actions: [
      { label: "Lock Account", action: "lock_account", primary: true },
      { label: "Reset Sessions", action: "reset_sessions" }
    ]
  },
  {
    id: "a3",
    type: "change",
    title: "Auto-Mitigation Deployed",
    timestamp: "1 hour ago",
    severity: "medium",
    status: "active",
    source: "Autonomous Defense System",
    assets: ["WAF Rule #4021"],
    reasoning: "High traffic anomaly detected on /api/login. Rate limiting rule automatically applied to prevent brute force.",
    technicalDetails: [
      { label: "Rule ID", value: "RL-LOGIN-BruteForce-01" },
      { label: "Duration", value: "Temporary (4h)" }
    ],
    actions: [
      { label: "Review Rule", action: "review_rule" },
      { label: "Make Permanent", action: "make_permanent" }
    ]
  },
  {
    id: "a4",
    type: "incident",
    title: "Zero-Day Behavior Pattern",
    timestamp: "3 hours ago",
    severity: "critical",
    status: "investigating",
    source: "Behavioral Analysis",
    assets: ["Payment Service"],
    reasoning: "Process 'payment-svc' attempted to spawn a shell and connect to an external IP. This behavior deviates 100% from the established baseline.",
    technicalDetails: [
        { label: "Process", value: "/usr/bin/payment-gateway" },
        { label: "Destination", value: "45.33.22.11 (Unknown)" }
    ],
    actions: [
        { label: "Isolate Container", action: "isolate_container", primary: true }
    ]
  }
];
