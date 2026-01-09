
export type LayerStatus = 'idle' | 'active' | 'learning' | 'locked';

export interface IntelligenceLayer {
  id: string;
  label: string;
  status: LayerStatus;
  description: string;
  activity?: string;
}

export interface StaticRule {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'breached';
  lastUpdated: string;
}

export interface ImpactCard {
  id: string;
  title: string;
  type: 'Analysis' | 'Defense' | 'Evolution';
  scope: string;
  confidenceGain: number;
  status: 'active' | 'pending';
  timestamp: string;
}

export interface LearnedBehavior {
  id: string;
  pattern: string;
  status: 'stored' | 'reusable' | 'propagated';
  detectionCount: number;
}

export interface DecisionCandidate {
  id: string;
  label: string;
  score: number; // 0.0 - 1.0
  riskLevel: 'Low' | 'Medium' | 'High';
  reward: number; // e.g. +0.34
  description: string;
  tags: string[]; // e.g. ["Low Collateral", "High Entropy"]
}

export interface DecisionContext {
  candidates: DecisionCandidate[];
  selectedId: string | null;
  metrics: {
      rewardSignal: number;
      explorationRate: number; // percentage
      exploitationRate: number; // percentage
      decisionConfidence: number; // percentage
  };
}

export interface EvolutionStage {
  id: string;
  label: string;
  description: string;
  
  layers: IntelligenceLayer[];
  staticRules: StaticRule[];
  impactCards: ImpactCard[];
  learnedBehaviors: LearnedBehavior[];
  decisionContext?: DecisionContext;
  
  packetColor: 'red' | 'orange' | 'green';
  isThreatNeutralized: boolean;
}

export const evolutionScenarios: EvolutionStage[] = [
  {
    id: "T0",
    label: "Unseen Behavior",
    description: "Firewall observes traffic with no matching policy. No action taken to avoid false positives.",
    layers: [
      { id: "signal", label: "Signal Intake", status: "active", description: "Raw traffic ingestion", activity: "Collecting baseline" },
      { id: "feature", label: "Feature Extraction", status: "idle", description: "Awaiting signal stability" },
      { id: "correlation", label: "Behavior Correlation", status: "idle", description: "Insufficient context" },
      { id: "policy", label: "Policy Mutation", status: "idle", description: "No action selected" }
    ],
    staticRules: [
      { id: "sqli", name: "SQL Injection Block", status: "breached", lastUpdated: "14 days ago" },
      { id: "xss", name: "XSS Filter", status: "breached", lastUpdated: "14 days ago" },
      { id: "auth", name: "Auth Header Check", status: "breached", lastUpdated: "14 days ago" }
    ],
    impactCards: [
      {
        id: "i1",
        title: "Anomalous Request Observed (No Action)",
        type: "Analysis",
        scope: "Edge Gateway",
        confidenceGain: 0,
        status: "active",
        timestamp: "T+0s"
      }
    ],
    learnedBehaviors: [],
    decisionContext: {
        candidates: [],
        selectedId: null,
        metrics: {
            rewardSignal: 0,
            explorationRate: 100,
            exploitationRate: 0,
            decisionConfidence: 0
        }
    },
    packetColor: "red",
    isThreatNeutralized: false
  },
  {
    id: "T1",
    label: "Exploratory Response",
    description: "Firewall tests low-impact mitigation while gathering reward feedback.",
    layers: [
      { id: "signal", label: "Signal Intake", status: "active", description: "Traffic ingestion" },
      { id: "feature", label: "Feature Extraction", status: "active", description: "Entropy & header variance", activity: "Entropy spike detected" },
      { id: "correlation", label: "Behavior Correlation", status: "learning", description: "Cross-request similarity emerging" },
      { id: "policy", label: "Policy Mutation", status: "idle", description: "Evaluating candidate actions" }
    ],
    staticRules: [
      { id: "sqli", name: "SQL Injection Block", status: "breached", lastUpdated: "14 days ago" },
      { id: "xss", name: "XSS Filter", status: "breached", lastUpdated: "14 days ago" },
      { id: "auth", name: "Auth Header Check", status: "breached", lastUpdated: "14 days ago" }
    ],
    impactCards: [
      {
        id: "i2",
        title: "Exploratory Rate Limiting Applied",
        type: "Defense",
        scope: "Gateway",
        confidenceGain: 12,
        status: "active",
        timestamp: "T+2s"
      },
      {
        id: "i3",
        title: "Behavior Pattern Stored (Low Confidence)",
        type: "Analysis",
        scope: "Session Layer",
        confidenceGain: 8,
        status: "pending",
        timestamp: "T+2.3s"
      }
    ],
    learnedBehaviors: [
      {
        id: "lb1",
        pattern: "High Header Entropy Burst",
        status: "stored",
        detectionCount: 7
      }
    ],
    decisionContext: {
        candidates: [
            { id: "c1", label: "Rate Limit (Soft)", score: 0.61, riskLevel: "Low", reward: 0.12, description: "Throttle requests to baseline", tags: ["Low Impact", "Explorative"] },
            { id: "c2", label: "Header Strip", score: 0.42, riskLevel: "Low", reward: 0.05, description: "Remove anomalous headers", tags: ["Sanitization"] },
            { id: "c3", label: "Session Kill", score: 0.25, riskLevel: "Medium", reward: 0.00, description: "Terminate user session", tags: ["User Impact"] },
            { id: "c4", label: "Global Block", score: 0.11, riskLevel: "High", reward: 0.00, description: "IP-based firewall block", tags: ["High Risk"] }
        ],
        selectedId: "c1",
        metrics: {
            rewardSignal: 0.12,
            explorationRate: 85,
            exploitationRate: 15,
            decisionConfidence: 45
        }
    },
    packetColor: "orange",
    isThreatNeutralized: false
  },
  {
    id: "T2",
    label: "Policy Selection",
    description: "Firewall commits to the highest-reward mitigation based on accumulated feedback.",
    layers: [
      { id: "signal", label: "Signal Intake", status: "active", description: "Traffic ingestion" },
      { id: "feature", label: "Feature Extraction", status: "active", description: "Payload context stabilized" },
      { id: "correlation", label: "Behavior Correlation", status: "active", description: "Attack intent confirmed", activity: "Intent confidence > 0.85" },
      { id: "policy", label: "Policy Mutation", status: "learning", description: "Selecting optimal action", activity: "Evaluating reward matrix" }
    ],
    staticRules: [
      { id: "sqli", name: "SQL Injection Block", status: "breached", lastUpdated: "14 days ago" },
      { id: "xss", name: "XSS Filter", status: "breached", lastUpdated: "14 days ago" },
      { id: "auth", name: "Auth Header Check", status: "breached", lastUpdated: "14 days ago" }
    ],
    impactCards: [
      {
        id: "i4",
        title: "Session Termination Selected",
        type: "Defense",
        scope: "Auth Middleware",
        confidenceGain: 42,
        status: "active",
        timestamp: "T+5s"
      },
      {
        id: "i5",
        title: "False Positive Risk Reduced",
        type: "Evolution",
        scope: "Global",
        confidenceGain: 18,
        status: "active",
        timestamp: "T+5.4s"
      }
    ],
    learnedBehaviors: [
      {
        id: "lb1",
        pattern: "High Header Entropy Burst",
        status: "reusable",
        detectionCount: 31
      },
      {
        id: "lb2",
        pattern: "Auth Token Replay Sequence",
        status: "stored",
        detectionCount: 6
      }
    ],
    decisionContext: {
         candidates: [
            { id: "c3", label: "Session Kill", score: 0.91, riskLevel: "Medium", reward: 0.42, description: "Terminate user session", tags: ["Targeted", "High Reward"] },
             { id: "c1", label: "Rate Limit (Soft)", score: 0.22, riskLevel: "Low", reward: 0.15, description: "Throttle requests to baseline", tags: ["Ineffective"] },
            { id: "c2", label: "Header Strip", score: 0.35, riskLevel: "Low", reward: 0.11, description: "Remove anomalous headers", tags: ["Bypassed"] },
            { id: "c4", label: "Global Block", score: 0.55, riskLevel: "High", reward: 0.98, description: "IP-based firewall block", tags: ["Blast Radius High"] }
        ],
        selectedId: "c3",
        metrics: {
            rewardSignal: 0.42,
            explorationRate: 28,
            exploitationRate: 72,
            decisionConfidence: 86
        }
    },
    packetColor: "orange",
    isThreatNeutralized: false
  },
  {
    id: "T3",
    label: "Reinforcement Complete",
    description: "Successful policy reinforced and propagated. Future occurrences blocked pre-execution.",
    layers: [
      { id: "signal", label: "Signal Intake", status: "active", description: "Traffic ingestion" },
      { id: "feature", label: "Feature Extraction", status: "active", description: "Payload fingerprinting" },
      { id: "correlation", label: "Behavior Correlation", status: "active", description: "Pattern recognized immediately" },
      { id: "policy", label: "Policy Mutation", status: "locked", description: "Optimal action reinforced", activity: "Reward convergence achieved" }
    ],
    staticRules: [
      { id: "sqli", name: "SQL Injection Block", status: "breached", lastUpdated: "14 days ago" },
      { id: "xss", name: "XSS Filter", status: "breached", lastUpdated: "14 days ago" },
      { id: "auth", name: "Auth Header Check", status: "breached", lastUpdated: "14 days ago" }
    ],
    impactCards: [
      {
        id: "i6",
        title: "Attack Blocked at Ingress",
        type: "Defense",
        scope: "Edge",
        confidenceGain: 55,
        status: "active",
        timestamp: "Now"
      },
      {
        id: "i7",
        title: "Policy Reinforced Across Cluster",
        type: "Evolution",
        scope: "All Nodes",
        confidenceGain: 35,
        status: "active",
        timestamp: "Now"
      }
    ],
    learnedBehaviors: [
      {
        id: "lb1",
        pattern: "High Header Entropy Burst",
        status: "propagated",
        detectionCount: 142
      },
      {
        id: "lb2",
        pattern: "Auth Token Replay Sequence",
        status: "propagated",
        detectionCount: 61
      }
    ],
    decisionContext: {
        candidates: [],
        selectedId: "c3", // Persist explanation
        metrics: {
            rewardSignal: 0.95,
            explorationRate: 2,
            exploitationRate: 98,
            decisionConfidence: 99
        }
    },
    packetColor: "green",
    isThreatNeutralized: true
  }
];
