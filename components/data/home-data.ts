
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'critical';
  uptime: string;
  activeNodes: number;
  threatLevel: 'low' | 'elevated' | 'critical';
  lastScan: string;
}

export interface ThreatLog {
  id: string;
  timestamp: string;
  source: string;
  type: string;
  action: 'blocked' | 'monitored' | 'flagged' | 'frozen' | 'throttled';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AttackSurfaceMetrics {
  openPorts: number;
  exposedAssets: number;
  shadowIT: number;
  riskScore: number; // 0-100
  trend: 'up' | 'down' | 'stable';
}

export interface AIState {
  mode: 'autonomous' | 'supervised' | 'learning';
  confidence: number; // 0-100
  activeRules: number;
  learningRate: number; // mock metric
}

export interface CodeRiskMetrics {
  criticalVulnerabilities: number;
  openPRs: number;
  riskyDependencies: number;
  coverage: number;
}

export interface HumanRiskMetrics {
  phishingAttempts: number;
  anomalousLogins: number;
  compromisedDevices: number;
  trainingStatus: number; // percentage
}

export const systemHealth: SystemHealth = {
  status: 'healthy',
  uptime: '99.99%',
  activeNodes: 142,
  threatLevel: 'low',
  lastScan: 'Just now'
};

export const attackSurface: AttackSurfaceMetrics = {
  openPorts: 24,
  exposedAssets: 12,
  shadowIT: 3,
  riskScore: 12,
  trend: 'down'
};

export const aiState: AIState = {
  mode: 'autonomous',
  confidence: 94,
  activeRules: 2451,
  learningRate: 0.85
};

export const codeRisk: CodeRiskMetrics = {
  criticalVulnerabilities: 0,
  openPRs: 8,
  riskyDependencies: 2,
  coverage: 88
};

export const humanRisk: HumanRiskMetrics = {
  phishingAttempts: 14,
  anomalousLogins: 2,
  compromisedDevices: 0,
  trainingStatus: 92
};

export const threatFeed: ThreatLog[] = [
  { id: '1', timestamp: '10:42:05', source: '192.168.1.105', type: 'SQL Injection', action: 'blocked', severity: 'high' },
  { id: '2', timestamp: '10:41:58', source: 'Auth Service', type: 'Brute Force', action: 'frozen', severity: 'medium' },
  { id: '3', timestamp: '10:41:22', source: 'API Gateway', type: 'Rate Limit Exceeded', action: 'throttled', severity: 'low' },
  { id: '4', timestamp: '10:40:15', source: '203.0.113.45', type: 'XSS Payload', action: 'blocked', severity: 'critical' },
  { id: '5', timestamp: '10:38:50', source: 'Internal', type: 'Privilege Escalation', action: 'flagged', severity: 'high' },
  { id: '6', timestamp: '10:35:12', source: 'WAF', type: 'Bad Bot', action: 'blocked', severity: 'low' },
];
