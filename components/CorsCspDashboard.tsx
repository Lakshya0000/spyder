"use client";

import { useState } from "react";
import { securePolicy, vulnerablePolicy, exploitSteps } from "./data/audit-data";
import PolicyDiffViewer from "./PolicyDiffViewer";
import LiveExploitSimulation from "./LiveExploitSimulation";
import ImpactFixControl from "./ImpactFixControl";

export default function CorsCspDashboard() {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="flex-1 grid grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Left: Policy Diff */}
        <div className="col-span-4 h-full min-h-0">
            <PolicyDiffViewer 
                secure={securePolicy} 
                vulnerable={vulnerablePolicy} 
                isFixed={isFixed}
            />
        </div>

        {/* Center: Live Exploit */}
        <div className="col-span-5 h-full min-h-0">
            <LiveExploitSimulation 
                steps={exploitSteps}
                isFixed={isFixed}
            />
        </div>

        {/* Right: Impact Control */}
        <div className="col-span-3 h-full min-h-0">
            <ImpactFixControl 
                isFixed={isFixed}
                onToggleFix={() => setIsFixed(!isFixed)}
            />
        </div>
    </div>
  );
}
