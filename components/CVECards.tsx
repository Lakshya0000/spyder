"use client";

import { useState } from "react";
import { CVE } from "./data/vulnerabilities-data";
import { AlertCircle, CheckCircle2, ShieldAlert, Cpu, ChevronRight, X, Activity, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CVECardsProps {
  cves: CVE[];
}

export default function CVECards({ cves }: CVECardsProps) {
  const [selectedCVE, setSelectedCVE] = useState<CVE | null>(null);

  return (
    <div className="flex gap-6 h-full min-h-[500px]">
      {/* Grid of Cards */}
      <div className={`flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 content-start transition-all duration-300 ${selectedCVE ? 'w-2/3' : 'w-full'}`}>
        {cves.map((cve) => (
          <motion.div
            key={cve.id}
            layoutId={`card-${cve.id}`}
            onClick={() => setSelectedCVE(cve)}
            className={`cursor-pointer group relative bg-white dark:bg-slate-900/50 rounded-xl border p-5 transition-all hover:shadow-md ${
                selectedCVE?.id === cve.id 
                ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Header: Product & Badge */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-500 mb-0.5">{cve.product}</span>
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        {cve.cve_id}
                        {cve.known_exploit && (
                            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                <ShieldAlert size={10} /> EXPLOIT
                            </span>
                        )}
                    </div>
                </div>
                <RiskBadge level={cve.ai_predicted_risk} knownExploit={cve.known_exploit} />
            </div>

            {/* Asset Context - The "Personal" Touch */}
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                <Globe size={14} className="text-slate-400" />
                <span>Seen on:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {cve.affected_asset_names?.join(", ") || `${cve.affected_assets} assets`}
                </span>
            </div>
            
            {/* Metrics Row */}
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                 {/* Probability Bar */}
                 <div className="flex flex-col gap-1 min-w-[100px]">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold">Probability</span>
                    <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${cve.exploit_probability > 70 ? 'bg-red-500' : 'bg-orange-500'}`} 
                                style={{ width: `${cve.exploit_probability}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold">{cve.exploit_probability}%</span>
                    </div>
                 </div>

                 <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

                 {/* Blast Radius */}
                 <div className="flex flex-col gap-1">
                     <span className="text-[10px] uppercase text-slate-400 font-semibold">Blast Radius</span>
                     <BlastRadiusIndicator radius={cve.factors.blast_radius} />
                 </div>
            </div>

            {/* Footer: Time & Action */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                     <div className="flex items-center gap-1" title="First seen in environment">
                        <Activity size={12} className={cve.trend === 'increasing' ? 'text-red-500' : 'text-slate-400'} />
                        <span>First seen {cve.first_seen}</span>
                     </div>
                </div>
                <button className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded transition-colors hover:bg-blue-100">
                    Why is this risky? <ChevronRight size={12} />
                </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Reasoning Panel (Side Sheet) */}
      <AnimatePresence>
        {selectedCVE && (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-1/3 min-w-[350px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col shrink-0"
            >
                {/* Header */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-950/50">
                    <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">AI Risk Analysis</div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCVE.cve_id}</h2>
                    </div>
                    <button 
                        onClick={() => setSelectedCVE(null)}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-400 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-6">
                    {/* Why is this risky? */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400 font-semibold">
                            <Cpu size={18} />
                            <span>Why Is This Risky?</span>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800/30 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                            {selectedCVE.ai_reasoning}
                        </div>
                    </div>

                    {/* Risk Factor Breakdown */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Risk Factor Breakdown</h4>
                        <div className="space-y-3">
                            <FactorRow label="Exposure" value={selectedCVE.factors.exposure} danger={selectedCVE.factors.exposure === 'Internet-facing'} />
                            <FactorRow label="Criticality" value={selectedCVE.factors.asset_criticality} danger={selectedCVE.factors.asset_criticality === 'Production'} />
                            <FactorRow label="Complexity" value={selectedCVE.factors.attack_complexity} danger={selectedCVE.factors.attack_complexity === 'Low'} />
                            <FactorRow label="Privileges" value={selectedCVE.factors.privilege_required} danger={selectedCVE.factors.privilege_required === 'None'} />
                            <FactorRow label="Blast Radius" value={selectedCVE.factors.blast_radius} danger={selectedCVE.factors.blast_radius === 'Full Network'} />
                        </div>
                    </div>
                    
                    {/* Affected Assets */}
                     <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Impact Scope</h4>
                        <div className="flex flex-col gap-2 p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950">
                            <div className="flex items-center gap-2">
                                <ShieldAlert size={16} className="text-slate-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    <strong className="text-slate-900 dark:text-slate-200">{selectedCVE.affected_assets}</strong> assets affected
                                </span>
                            </div>
                            <div className="pl-6 text-xs text-slate-500">
                                {selectedCVE.affected_asset_names?.join(", ") || "Loading assets..."}
                            </div>
                            <button className="ml-auto text-xs text-blue-600 font-medium hover:underline mt-1">View Full Asset List</button>
                        </div>
                    </div>

                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RiskBadge({ level, knownExploit }: { level: string, knownExploit: boolean }) {
    if (knownExploit) {
        // Red solid is handled in header next to ID, but if we want it here too or instead:
        // The redesign puts EXPLOIT next to ID. 
        // This badge is for "AI Predicted Risk".
        return (
             <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1">
                PREDICTED {level.toUpperCase()}
            </span>
        );
    }

    const colors = {
        'Low': 'text-slate-600 border-slate-200 bg-slate-50',
        'Medium': 'text-yellow-700 border-yellow-200 bg-yellow-50',
        'High': 'text-orange-700 border-orange-200 bg-orange-50 ring-1 ring-orange-100', // Outlined orange
        'Critical': 'text-red-700 border-red-200 bg-red-50 ring-1 ring-red-100', // Outlined red
    };
    // @ts-ignore
    const classes = colors[level] || colors['Low'];
    
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${classes}`}>
            {level.toUpperCase()}
        </span>
    );
}

function BlastRadiusIndicator({ radius }: { radius: string }) {
    // Map string to 1-5 level
    const level = radius === 'Full Network' ? 5 : radius === 'Multiple Services' ? 3 : 1;
    
    return (
        <div className="flex gap-0.5" title={`Impact: ${radius}`}>
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    className={`h-2 w-2 rounded-full ${i < level ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-800'}`}
                />
            ))}
        </div>
    );
}

function FactorRow({ label, value, danger }: { label: string, value: string, danger: boolean }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">{label}</span>
            <span className={`font-medium px-2 py-0.5 rounded ${danger ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                {value}
            </span>
        </div>
    );
}
