"use client";

import { AiSuggestion } from "./data/audit-data";
import { Bot, Zap, ShieldAlert, ArrowRight } from "lucide-react";

interface AICopilotProps {
  suggestions: AiSuggestion[];
  onTest: (payload: string) => void;
}

export default function AICopilot({ suggestions, onTest }: AICopilotProps) {
  
  const getRiskColor = (level: string) => {
      switch(level) {
          case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'medium': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800';
          default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
         <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-purple-50 dark:bg-purple-900/10 flex justify-between items-center">
             <h3 className="text-sm font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                 <Bot size={16} />
                 AI Testing Assistant
             </h3>
             <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-bold uppercase">Advisory Only</span>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">
             <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-600 dark:text-slate-400 italic">
                 "I've analyzed the endpoint patterns. Based on the <code>/metadata</code> path, I recommend testing for cloud instance credential exposure."
             </div>

             {suggestions.map((suggestion) => (
                 <div key={suggestion.id} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3 hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
                     <div className="flex justify-between items-start mb-2">
                         <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getRiskColor(suggestion.riskLevel)}`}>
                             {suggestion.riskLevel} Risk
                         </span>
                         <span className="text-[10px] text-slate-400 uppercase tracking-wider">{suggestion.type}</span>
                     </div>
                     
                     <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                         {suggestion.reason}
                     </p>
                     
                     <div className="bg-slate-100 dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800 mb-3 font-mono text-[10px] text-slate-500 break-all">
                         {suggestion.payload}
                     </div>

                     <div className="flex items-center gap-2">
                         <button 
                            onClick={() => onTest(suggestion.payload)}
                            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors"
                         >
                             <Zap size={12} /> Test Payload
                         </button>
                         <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold">
                             Ignore
                         </button>
                     </div>
                 </div>
             ))}
         </div>
    </div>
  );
}
