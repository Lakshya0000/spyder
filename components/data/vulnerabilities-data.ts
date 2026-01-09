export interface CVE {
  id: string;
  cve_id: string;
  product: string;
  known_exploit: boolean;
  ai_predicted_risk: 'Low' | 'Medium' | 'High' | 'Critical';
  cvss_score?: number;
  exploit_probability: number; // 0-100
  confidence: 'Low' | 'Medium' | 'High';
  published_date: string;
  factors: {
    exposure: 'Internet-facing' | 'Internal' | 'Restricted';
    asset_criticality: 'Production' | 'Staging' | 'Dev';
    attack_complexity: 'Low' | 'Medium' | 'High';
    privilege_required: 'None' | 'Low' | 'High';
    blast_radius: 'Single Service' | 'Multiple Services' | 'Full Network';
  };
  ai_reasoning: string;
  affected_assets: number;
  affected_asset_names: string[]; // [NEW] Context
  first_seen: string; // [NEW] Time sensitivity
  trend: 'increasing' | 'stable' | 'decreasing'; // [NEW] Time sensitivity
}

export const mockCVEData: CVE[] = [
  {
    id: "cve-1",
    cve_id: "CVE-2024-32791",
    product: "Apache Struts",
    known_exploit: false,
    ai_predicted_risk: "High",
    cvss_score: 7.5,
    exploit_probability: 78,
    confidence: "High",
    published_date: "2024-01-15",
    factors: {
      exposure: "Internet-facing",
      asset_criticality: "Production",
      attack_complexity: "Low",
      privilege_required: "None",
      blast_radius: "Multiple Services"
    },
    ai_reasoning: "The affected service is publicly accessible, runs a vulnerable version, and lacks authentication. Although no public exploit exists, similar vulnerabilities have been weaponized rapidly in the past.",
    affected_assets: 3,
    affected_asset_names: ["api.company.com", "payment-service", "legacy-gateway"],
    first_seen: "2 days ago",
    trend: "increasing"
  },
  {
    id: "cve-2",
    cve_id: "CVE-2023-44487",
    product: "Nginx HTTP/2",
    known_exploit: true,
    ai_predicted_risk: "Critical",
    cvss_score: 9.8,
    exploit_probability: 95,
    confidence: "High",
    published_date: "2023-10-10",
    factors: {
      exposure: "Internet-facing",
      asset_criticality: "Production",
      attack_complexity: "Low",
      privilege_required: "None",
      blast_radius: "Full Network"
    },
    ai_reasoning: "Active exploitation detected in the wild (HTTP/2 Rapid Reset). Critical infrastructure is directly exposed. Immediate patching required.",
    affected_assets: 12,
    affected_asset_names: ["load-balancer-01", "main-ingress", "cdn-edge-nodes"],
    first_seen: "4 hours ago",
    trend: "increasing"
  },
  {
    id: "cve-3",
    cve_id: "CVE-2024-2187",
    product: "Jenkins Core",
    known_exploit: false,
    ai_predicted_risk: "Medium",
    cvss_score: 6.3,
    exploit_probability: 45,
    confidence: "Medium",
    published_date: "2024-02-01",
    factors: {
      exposure: "Internal",
      asset_criticality: "Staging",
      attack_complexity: "Medium",
      privilege_required: "Low",
      blast_radius: "Single Service"
    },
    ai_reasoning: "Vulnerability exists but requires internal access and authenticated credentials to exploit. Risk is mitigated by network segmentation.",
    affected_assets: 1,
    affected_asset_names: ["jenkins-staging"],
    first_seen: "1 week ago",
    trend: "stable"
  },
  {
    id: "cve-4",
    cve_id: "CVE-2024-0001", // Hypothetical
    product: "OpenSSH",
    known_exploit: false,
    ai_predicted_risk: "Low",
    cvss_score: 4.2,
    exploit_probability: 12,
    confidence: "High",
    published_date: "2024-01-20",
    factors: {
      exposure: "Restricted",
      asset_criticality: "Dev",
      attack_complexity: "High",
      privilege_required: "High",
      blast_radius: "Single Service"
    },
    ai_reasoning: "Requires high privileges and race condition to exploit. Affected assets are non-critical dev environments.",
    affected_assets: 5,
    affected_asset_names: ["dev-vm-cluster", "test-runner-04"],
    first_seen: "3 days ago",
    trend: "stable"
  },
  {
    id: "cve-5",
    cve_id: "CVE-2024-5555",
    product: "Redis",
    known_exploit: false,
    ai_predicted_risk: "High",
    cvss_score: 8.1,
    exploit_probability: 65,
    confidence: "Medium",
    published_date: "2024-03-01",
    factors: {
      exposure: "Internet-facing",
      asset_criticality: "Production",
      attack_complexity: "Low",
      privilege_required: "None",
      blast_radius: "Multiple Services"
    },
    ai_reasoning: "Redis instance is exposed to the internet with default configuration. High probability of automated botnet targeting despite no specific CVE exploit being viral yet.",
    affected_assets: 2,
    affected_asset_names: ["cache-cluster-primary", "session-store"],
    first_seen: "6 days ago",
    trend: "increasing"
  }
];

export interface ThreatStats {
  score: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: string;
  label?: string;
}

export const mockThreatStats: ThreatStats = {
  score: 72,
  level: 'High',
  confidence: '85% (High)',
  label: 'No Known Public Exploit' // Example from prompt
};
