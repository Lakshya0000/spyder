
export interface SecurityContact {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  role: string;
  timestamp: string;
  status: 'approved' | 'rejected' | 'pending';
  details: string;
}

export interface OrgProfile {
  name: string;
  id: string;
  environment: 'Production' | 'Staging' | 'Development';
  tier: 'Enterprise' | 'Business' | 'Starter';
  industry: 'FinTech' | 'Healthcare' | 'E-commerce';
  riskClass: 'High' | 'Medium' | 'Low';
  
  riskScore: number;
  autonomyLevel: 'Advisory' | 'Semi-Autonomous' | 'Fully Autonomous';
  
  contacts: SecurityContact[];
  
  activityLog: ActivityLog[];
}

export const orgProfile: OrgProfile = {
  name: "Acme Corp Global",
  id: "ORG-8821-X",
  environment: "Production",
  tier: "Enterprise",
  industry: "FinTech",
  riskClass: "High",
  
  riskScore: 85, // 0-100, where 100 is best
  autonomyLevel: "Semi-Autonomous",
  
  contacts: [
    { name: "Sarah Connor", role: "CISO", email: "s.connor@acme.com", phone: "+1 (555) 019-2834" },
    { name: "Dennis Nedry", role: "Lead Architect", email: "d.nedry@acme.com", phone: "+1 (555) 010-1122" }
  ],
  
  activityLog: [
    { id: "l1", action: "Deploy WAF Rule #4021", actor: "Auto-Defense System", role: "AI Agent", timestamp: "1 hour ago", status: "approved", details: "Rate limiting for /api/login due to brute force." },
    { id: "l2", action: "Block IP Range 45.33.x.x", actor: "Sarah Connor", role: "CISO", timestamp: "2 hours ago", status: "approved", details: "Manual override of AI suggestion." },
    { id: "l3", action: "Grant Admin Access", actor: "Dennis Nedry", role: "Architect", timestamp: "1 day ago", status: "rejected", details: "Violation of least privilege policy." },
    { id: "l4", action: "Update CSP Policy", actor: "CI/CD Pipeline", role: "Automation", timestamp: "2 days ago", status: "approved", details: "Routine deployment v2.4.0." }
  ]
};
