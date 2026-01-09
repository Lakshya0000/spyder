export type RiskLevel = 'low' | 'medium' | 'high';

export interface Organization {
  organization: string;
  environment: string;
  risk_score: number;
}

export interface Domain {
  id: string;
  name: string;
  risk: RiskLevel;
  internet_facing: boolean;
  type: 'domain';
  ai_reasoning?: string[];
  discovered_at?: string;
}

export interface Subdomain {
  id: string;
  domain_id: string;
  name: string;
  ip: string;
  risk: RiskLevel;
  internet_facing: boolean;
  type: 'subdomain';
  ai_reasoning?: string[];
  discovered_at?: string;
}

export interface Port {
  id: string;
  subdomain_id: string;
  port: number;
  protocol: string;
  risk: RiskLevel;
  type: 'port';
  ai_reasoning?: string[];
  discovered_at?: string;
}

export interface Service {
  id: string;
  port_id: string;
  name: string;
  version: string;
  risk: RiskLevel;
  cves: string[];
  ai_reasoning?: string[];
  type: 'service';
  discovered_at?: string;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface ASMData {
  metadata: Organization;
  domains: Domain[];
  subdomains: Subdomain[];
  ports: Port[];
  services: Service[];
  relationships: {
    edges: GraphEdge[];
  };
}

export const mockASMData: ASMData = {
  metadata: {
    organization: "Acme Corp",
    environment: "Production",
    risk_score: 8.4
  },
  domains: [
    {
      id: "dom-1",
      name: "company.com",
      risk: "medium",
      internet_facing: true,
      type: "domain",
      discovered_at: "2023-01-01T00:00:00Z"
    },
    {
      id: "dom-2",
      name: "acquired-startup.io",
      risk: "high",
      internet_facing: true,
      type: "domain",
      discovered_at: "2024-01-03T09:00:00Z" // Very new
    }
  ],
  subdomains: [
    {
      id: "sub-1",
      domain_id: "dom-1",
      name: "api.company.com",
      ip: "34.102.88.19",
      risk: "high",
      internet_facing: true,
      type: "subdomain",
      discovered_at: "2023-06-15T12:00:00Z",
      ai_reasoning: [
        "Subdomain is internet-facing",
        "Port 8080 uses HTTP (unencrypted)",
        "Service version is outdated",
        "No authentication detected"
      ]
    },
    {
      id: "sub-2",
      domain_id: "dom-1",
      name: "admin.company.com",
      ip: "10.0.12.4",
      risk: "medium",
      internet_facing: false,
      type: "subdomain",
      discovered_at: "2024-01-03T10:00:00Z" // New
    },
    {
      id: "sub-3",
      domain_id: "dom-1",
      name: "dev.company.com",
      ip: "34.102.88.22",
      risk: "low",
      internet_facing: true,
      type: "subdomain",
      discovered_at: "2023-08-20T09:30:00Z"
    },
    {
      id: "sub-4",
      domain_id: "dom-2",
      name: "legacy.acquired-startup.io",
      ip: "192.168.1.105",
      risk: "high",
      internet_facing: true,
      type: "subdomain",
      discovered_at: "2024-01-03T09:15:00Z", // New
      ai_reasoning: [
        "Legacy system with multiple known vulnerabilities exposed to public internet",
        "End of life OS detected"
      ]
    }
  ],
  ports: [
    {
      id: "port-1",
      subdomain_id: "sub-1",
      port: 443,
      protocol: "HTTPS",
      risk: "low",
      type: "port",
      discovered_at: "2023-06-15T12:00:00Z"
    },
    {
      id: "port-2",
      subdomain_id: "sub-1",
      port: 8080,
      protocol: "HTTP",
      risk: "high",
      type: "port",
      discovered_at: "2024-01-02T15:00:00Z"
    },
    {
      id: "port-3",
      subdomain_id: "sub-2",
      port: 22,
      protocol: "SSH",
      risk: "medium",
      type: "port",
      discovered_at: "2024-01-03T10:05:00Z"
    },
    {
      id: "port-4",
      subdomain_id: "sub-4",
      port: 3389,
      protocol: "RDP",
      risk: "high",
      type: "port",
      discovered_at: "2024-01-03T09:20:00Z",
       ai_reasoning: ["RDP exposed to internet is a critical risk vector for ransomware"]
    },
    {
      id: "port-5",
      subdomain_id: "sub-3",
      port: 443,
      protocol: "HTTPS",
      risk: "low",
      type: "port",
      discovered_at: "2023-08-20T09:30:00Z"
    }
  ],
  services: [
    {
      id: "svc-1",
      port_id: "port-2",
      name: "Node.js REST API",
      version: "v14.17.0",
      risk: "high",
      cves: ["CVE-2023-30589"],
      ai_reasoning: ["Service is running an outdated Node.js version on an internet-facing port without authentication."],
      type: "service",
      discovered_at: "2024-01-02T15:00:00Z"
    },
    {
      id: "svc-2",
      port_id: "port-3",
      name: "OpenSSH",
      version: "8.2p1",
      risk: "medium",
      cves: [],
      type: "service",
      discovered_at: "2024-01-03T10:05:00Z"
    },
    {
      id: "svc-3",
      port_id: "port-4",
      name: "Windows RDP",
      version: "10.0.19041",
      risk: "high",
      cves: ["CVE-2019-0708"], // BlueKeep usage for effect
      ai_reasoning: ["Known RDP vulnerability (BlueKeep) potentially exploitable."],
      type: "service",
      discovered_at: "2024-01-03T09:20:00Z"
    },
    {
      id: "svc-4",
      port_id: "port-1",
      name: "Nginx",
      version: "1.18.0",
      risk: "low",
      cves: [],
      type: "service",
      discovered_at: "2023-06-15T12:00:00Z"
    }
  ],
  relationships: {
    edges: [
      { from: "dom-1", to: "sub-1" },
      { from: "dom-1", to: "sub-2" },
      { from: "dom-1", to: "sub-3" },
      { from: "sub-1", to: "port-1" },
      { from: "sub-1", to: "port-2" },
      { from: "sub-2", to: "port-3" },
      { from: "sub-3", to: "port-5" },
      { from: "port-2", to: "svc-1" },
      { from: "port-3", to: "svc-2" },
      { from: "port-1", to: "svc-4" },
      
      // New domain tree
      { from: "dom-2", to: "sub-4" },
      { from: "sub-4", to: "port-4" },
      { from: "port-4", to: "svc-3" }
    ]
  }
};
