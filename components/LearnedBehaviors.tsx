"use client";

import { LearnedBehavior } from "./data/firewall-data";
import { Brain, Database, Share2, Check } from "lucide-react";

interface LearnedBehaviorsProps {
  behaviors: LearnedBehavior[];
}

export default function LearnedBehaviors({ behaviors }: LearnedBehaviorsProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-8">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center shrink-0">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Brain size={16} className="text-purple-500" />
                 Applied Learning
             </h3>
             <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                 <Database size={10} />
                 <span>Memory Bank</span>
             </div>
        </div>

        {/* List */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-2">
             {behaviors.map((item) => (
                 <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 
                          ${item.status === 'propagated' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'}`}>
                          {item.status === 'propagated' ? <Share2 size={12} /> : <Check size={12} />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                              {item.pattern}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-slate-400 capitalize bg-slate-100 dark:bg-slate-800 px-1.5 rounded">
                                  {item.status}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                  Seen {item.detectionCount}x
                              </span>
                          </div>
                      </div>
                 </div>
             ))}

             {behaviors.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs italic">
                    AI learning in progress...
                </div>
            )}
        </div>
    </div>
  );
}
