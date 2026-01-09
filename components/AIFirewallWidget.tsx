"use client";

import { AIState } from "./data/home-data";
import { Brain, Zap } from "lucide-react";

export default function AIFirewallWidget({ aiState }: { aiState: AIState }) {
  return (
    <div className="h-full bg-slate-900 dark:bg-black border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col relative overflow-hidden text-white">
        {/* Background Glow */}
        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-purple-600/20 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-start mb-4">
             <div>
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                     <Brain size={14} className="text-purple-400" />
                     AI Sentinel
                 </h3>
                 <p className="text-[10px] text-slate-400 mt-1">Autonomous Protection</p>
             </div>
             <div className={`px-2 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider ${
                 aiState.mode === 'autonomous' 
                 ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                 : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
             }`}>
                 {aiState.mode}
             </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center relative">
            {/* Confidence Circle */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                 <svg className="w-full h-full -rotate-90">
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-purple-500" strokeDasharray={`${aiState.confidence * 2.51} 251`} strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-2xl font-bold">{aiState.confidence}%</span>
                     <span className="text-[8px] text-slate-400 uppercase tracking-widest">Confidence</span>
                 </div>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-6 border-t border-slate-800 pt-4">
                 <div className="text-center">
                     <span className="block text-lg font-bold text-white">{aiState.activeRules}</span>
                     <span className="block text-[10px] text-slate-500 uppercase">Active Rules</span>
                 </div>
                 <div className="text-center">
                     <span className="block text-lg font-bold text-purple-400 flex items-center justify-center gap-1">
                         <Zap size={10} fill="currentColor" /> {aiState.learningRate}
                     </span>
                     <span className="block text-[10px] text-slate-500 uppercase">Learning Rate</span>
                 </div>
            </div>
        </div>
    </div>
  );
}
