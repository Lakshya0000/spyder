"use client";

import { 
  aiState, 
  attackSurface, 
  codeRisk, 
  humanRisk, 
  systemHealth, 
  threatFeed 
} from "../../../components/data/home-data";

import AIFirewallWidget from "../../../components/AIFirewallWidget";
import AttackSurfaceCard from "../../../components/AttackSurfaceCard";
import CodeRiskCard from "../../../components/CodeRiskCard";
import HealthStrip from "../../../components/HealthStrip";
import HumanRiskCard from "../../../components/HumanRiskCard";
import PolicyTimeline from "../../../components/PolicyTimeline";
import ThreatFeed from "../../../components/ThreatFeed";

export default function Home() {
  return (
    <div className="flex-1 p-6 flex flex-col gap-6 bg-slate-100 dark:bg-black/20 overflow-hidden h-full">
      {/* Top: Global Health Strip */}
      <div className="shrink-0">
          <HealthStrip health={systemHealth} />
      </div>

      {/* Main Analysis Grid */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6">
          
          {/* Left: Real-time Threat Feed (Tall) */}
          <div className="col-span-12 lg:col-span-3 h-full min-h-0">
              <ThreatFeed logs={threatFeed} />
          </div>

          {/* Center: Live Intelligence & Exposure */}
          <div className="col-span-12 lg:col-span-6 h-full min-h-0 grid grid-rows-2 gap-6">
              <div className="min-h-0">
                  <AIFirewallWidget aiState={aiState} />
              </div>
              <div className="min-h-0">
                  <AttackSurfaceCard metrics={attackSurface} />
              </div>
          </div>

          {/* Right: Risk Domains */}
          <div className="col-span-12 lg:col-span-3 h-full min-h-0 grid grid-rows-2 gap-6">
              <div className="min-h-0">
                  <CodeRiskCard metrics={codeRisk} />
              </div>
              <div className="min-h-0">
                  <HumanRiskCard metrics={humanRisk} />
              </div>
          </div>

      </div>

      {/* Bottom: Evolution Timeline */}
      <div className="h-48 shrink-0">
           <PolicyTimeline />
      </div>
    </div>
  );
}
