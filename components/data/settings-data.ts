
export interface SettingsConfig {
  autonomy: {
    level: number; // 0-100 slider
    mode: 'Advisory' | 'Supervised' | 'Autonomous';
    description: string;
  };
  thresholds: {
    autoBlockScore: number; // Risk score above which Auto-Block triggers
    requireApprovalScore: number; // Risk score requiring human approval
    zeroDaySensitivity: 'Low' | 'Medium' | 'High';
  };
  integrations: {
    id: string;
    name: string;
    description: string;
    connected: boolean;
    icon: string; // lucide icon name
    permissions: string[];
  }[];
  notifications: {
    channel: string;
    events: string[];
    recipients: string[];
  }[];
}

export const settingsData: SettingsConfig = {
  autonomy: {
    level: 65,
    mode: 'Supervised',
    description: "AI can autonomously block threats with >90% confidence. All other actions require human approval."
  },
  thresholds: {
    autoBlockScore: 85,
    requireApprovalScore: 60,
    zeroDaySensitivity: 'High'
  },
  integrations: [
    {
      id: "github",
      name: "GitHub",
      description: "PR scanning and code ownership validation.",
      connected: true,
      icon: "Github",
      permissions: ["Read Repos", "Write Comments", "Block Merges"]
    },
    {
      id: "slack",
      name: "Slack",
      description: "Real-time alerts and approval workflows.",
      connected: true,
      icon: "Slack",
      permissions: ["Send Messages", "Interactive Buttons"]
    },
    {
      id: "aws",
      name: "AWS CloudWatch",
      description: "Ingest infrastructure logs for anomaly detection.",
      connected: false,
      icon: "Cloud",
      permissions: ["Read Logs"]
    },
    {
      id: "jira",
      name: "Jira",
      description: "Auto-create tickets for security incidents.",
      connected: false,
      icon: "Trello", // Proxy for Jira
      permissions: ["Create Issues"]
    }
  ],
  notifications: [
      { channel: "Email", events: ["Critical Incidents"], recipients: ["security@acme.com"] },
      { channel: "Slack", events: ["All Alerts"], recipients: ["#sec-ops"] }
  ]
};
