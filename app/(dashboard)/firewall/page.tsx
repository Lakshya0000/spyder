"use client";

import { useState } from "react";
import { evolutionScenarios } from "../../../components/data/firewall-data";
import DecisionArena from "../../../components/DecisionArena";
import IntelligenceStack from "../../../components/IntelligenceStack";
import StaticPanel from "../../../components/StaticPanel";
import NarrativeTimeline from "../../../components/NarrativeTimeline";
import ImpactFeed from "../../../components/ImpactFeed";
import LearnedBehaviors from "../../../components/LearnedBehaviors";
import { ShieldAlert, ShieldCheck, Activity } from "lucide-react";

export default function FirewallPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const currentStage = evolutionScenarios[stageIndex];
  const decisionMetrics = currentStage.decisionContext?.metrics;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden">
        
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 z-20">
             <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Adaptive Intelligent Firewall
                    <span className="text-xs font-normal text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">v2.4-Hybrid</span>
                </h1>
                <p className="text-xs text-slate-500">Autonomous Policy Evolution & Reinforcement System</p>
             </div>

             <div className="flex items-center gap-6">
                 {/* New Metrics */}
                 {decisionMetrics && (
                     <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Decision Confidence</span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
                                {decisionMetrics.decisionConfidence}%
                            </span>
                        </div>
                        <div className="h-8 w-px bg-slate-100 dark:bg-slate-800"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Rollback Cost</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Low
                            </span>
                        </div>
                     </div>
                 )}
                 
                 <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

                 <div className="flex flex-col items-end">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Defense Status</span>
                     {currentStage.isThreatNeutralized ? (
                          <span className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5">
                              <ShieldCheck size={16} /> IMMUNE
                          </span>
                     ) : (
                          <span className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                              <Activity size={16} className="animate-pulse" /> ACTIVE
                          </span>
                     )}
                 </div>
             </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 p-6 grid grid-rows-[minmax(0,3.5fr)_minmax(0,3fr)_minmax(0,3.5fr)] gap-6 min-h-0 bg-slate-100 dark:bg-black/20 overflow-hidden relative">
            
            {/* Top Section: Static vs AI Analysis - Gives context */}
            <div className="grid grid-cols-12 gap-6 min-h-0 relative z-10">
                {/* Left: Static - Fails */}
                <div className="col-span-4 h-full">
                    <StaticPanel rules={currentStage.staticRules} />
                </div>
                
                {/* Right: AI - Signals */}
                <div className="col-span-8 h-full">
                    <IntelligenceStack stage={currentStage} />
                </div>
            </div>

            {/* Middle Section: The Decision Arena (The "Breakthrough" Layer) */}
            <div className="w-full min-h-0 relative z-0">
                <DecisionArena decisionContext={currentStage.decisionContext} />
            </div>

            {/* Bottom Section: Evidence & Timeline - The result */}
            <div className="grid grid-cols-12 gap-6 min-h-0 relative z-10">
                
                {/* Left: Impact & Learning */}
                <div className="col-span-8 grid grid-cols-2 gap-6 h-full min-h-0">
                     <div className="h-full min-h-0 overflow-hidden">
                         <LearnedBehaviors behaviors={currentStage.learnedBehaviors} />
                     </div>
                     <div className="h-full min-h-0 overflow-hidden no-scrollbar">
                         <ImpactFeed cards={currentStage.impactCards} />
                     </div>
                </div>

                {/* Right: Timeline Control */}
                <div className="col-span-4 h-full flex flex-col justify-end">
                    <NarrativeTimeline 
                        stages={evolutionScenarios} 
                        currentIndex={stageIndex} 
                        onSetIndex={setStageIndex} 
                    />
                </div>
            </div>

        </div>
    </div>
  );
}
