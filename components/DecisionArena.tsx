"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, Crosshair, Shield, Zap } from "lucide-react";
import { DecisionContext, DecisionCandidate } from "./data/firewall-data";
import { cn } from "@/lib/utils";

interface DecisionArenaProps {
  decisionContext?: DecisionContext;
}

export default function DecisionArena({ decisionContext }: DecisionArenaProps) {
  if (!decisionContext || decisionContext.candidates.length === 0) {
     if (decisionContext?.metrics && decisionContext.metrics.decisionConfidence > 0) {
         // Case for T3 (Completed) or empty T0
         return (
             <div className="h-full w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center ">
                 <div className="flex flex-col items-center text-slate-400">
                     <Shield size={32} className="mb-2 opacity-50" />
                     <span className="text-sm font-medium">Policy Reinforced</span>
                 </div>
             </div>
         )
     }
     
     // Case for T0 (No candidates yet)
    return (
      <div className="h-full w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center mt-10">
        <div className="flex flex-col items-center text-slate-400">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <Crosshair size={32} className="mb-2 relative z-10" />
            </div>
          <span className="text-sm font-medium animate-pulse">Awaiting Signals...</span>
        </div>
      </div>
    );
  }

  const { candidates, selectedId, metrics } = decisionContext;
  const selectedCandidate = candidates.find(c => c.id === selectedId);

  return (
    <div className="h-full w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm mt-10">
      
      {/* Header Metric Strip */}
      <div className="h-10 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 justify-between bg-slate-50/50 dark:bg-slate-950/50">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Zap size={12} className="text-amber-500" />
            Decision Arena
        </span>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400">Reward Signal:</span>
                <span className={`font-mono font-bold ${metrics.rewardSignal > 0.4 ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-300'}`}>
                    +{metrics.rewardSignal.toFixed(2)}
                </span>
            </div>
             <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400">Ex/Ex Ratio:</span>
                <div className="flex items-center h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${metrics.explorationRate}%` }}></div>
                    <div className="h-full bg-purple-500" style={{ width: `${metrics.exploitationRate}%` }}></div>
                </div>
                <span className="font-mono text-slate-500">{metrics.exploitationRate}%</span>
            </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-slate-100 dark:divide-slate-800">
        
        {/* Column 1: Candidate Actions */}
        <div className="col-span-4 p-4 flex flex-col gap-2 overflow-y-auto w-full no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Candidate Actions</span>
            {candidates.map((candidate) => (
                <div 
                    key={candidate.id}
                    className={cn(
                        "p-3 rounded-lg border text-sm transition-all relative w-full",
                        candidate.id === selectedId 
                            ? "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100 ring-1 ring-blue-500/20" 
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 opacity-60"
                    )}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold">{candidate.label}</span>
                        <span className="font-mono text-xs opacity-70">{candidate.score.toFixed(2)}</span>
                    </div>
                    {candidate.id === selectedId && (
                         <motion.div 
                            layoutId="selection-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1"
                        >
                             <div className="w-1 h-8 bg-blue-500 rounded-r-full"></div>
                        </motion.div>
                    )}
                     <div className="flex gap-1 flex-wrap">
                        {candidate.tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Column 2: Risk / Reward Tradeoff */}
        <div className="col-span-4 p-4 flex flex-col gap-4">
             <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Risk vs Reward Analysis</span>
             {selectedCandidate ? (
                 <div className="space-y-4">
                     <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                         <div className="flex justify-between text-xs text-slate-500 mb-1">
                             <span>Projected Reward</span>
                             <span className="font-mono font-bold text-green-600">+{selectedCandidate.reward.toFixed(2)}</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500" style={{ width: `${selectedCandidate.reward * 100}%` }}></div>
                         </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-transparent">
                            <span className="text-[10px] text-slate-500 block">Risk Level</span>
                            <span className={cn(
                                "text-sm font-bold",
                                selectedCandidate.riskLevel === 'High' ? "text-red-500" :
                                selectedCandidate.riskLevel === 'Medium' ? "text-orange-500" : "text-emerald-500"
                            )}>{selectedCandidate.riskLevel}</span>
                        </div>
                        <div className="p-2 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-transparent">
                            <span className="text-[10px] text-slate-500 block">Confidence</span>
                             <span className="text-sm font-bold text-blue-500">{metrics.decisionConfidence}%</span>
                        </div>
                     </div>
                     
                     <div className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-300 dark:border-slate-700 pl-3 py-1">
                         "Selecting this action maximizes reward while maintaining acceptable collateral risk."
                     </div>
                 </div>
             ) : (
                 <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                     Select an action to view analysis
                 </div>
             )}
        </div>

        {/* Column 3: Chosen Action */}
         <div className="col-span-4 bg-slate-50 dark:bg-slate-950/30 p-4 flex flex-col relative overflow-hidden">
             
            {selectedCandidate ? (
                <>
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                     <CheckCircle2 size={80} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Action Selected
                </span>
                
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                        {selectedCandidate.label}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        {selectedCandidate.description}
                    </p>
                    
                    <button className={cn(
                        "w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm",
                        selectedCandidate.riskLevel === 'High' ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400" :
                        "bg-blue-600 text-white shadow-blue-500/20 shadow-lg hover:shadow-blue-500/30"
                    )}>
                        Execute Strategy <ArrowRight size={12} />
                    </button>
                    
                    <div className="mt-6 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                             <span>False Positive Risk</span>
                             <span>{selectedCandidate.riskLevel === 'Low' ? '0.04%' : '2.1%'}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                             <span>Rollback Cost</span>
                             <span>Low</span>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400/50">
                    <span className="text-xs font-mono uppercase tracking-widest">Pending Decision</span>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
