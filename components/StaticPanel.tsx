"use client";

import { StaticRule } from "./data/firewall-data";
import { ShieldAlert, ShieldCheck, Lock, AlertOctagon } from "lucide-react";

interface StaticPanelProps {
  rules: StaticRule[];
}

export default function StaticPanel({ rules }: StaticPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center shrink-0">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Lock size={16} className="text-slate-500" />
                 Static Rules
             </h3>
             <span className="text-[10px] text-slate-400 font-mono">v4.2.0</span>
        </div>

        {/* Rule List */}
        <div className="flex-1 p-4 flex flex-col gap-3">
             {rules.map((rule) => (
                 <div 
                    key={rule.id} 
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                        rule.status === 'breached' 
                        ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-75'
                    }`}
                 >
                     <div className="flex items-center gap-3">
                         {rule.status === 'breached' ? (
                             <AlertOctagon size={18} className="text-red-500" />
                         ) : (
                             <ShieldCheck size={18} className="text-slate-400" />
                         )}
                         <div>
                             <div className={`text-sm font-bold ${rule.status === 'breached' ? 'text-red-700 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                 {rule.name}
                             </div>
                             <div className="text-[10px] text-slate-400 font-mono">
                                 Last match: {rule.lastUpdated}
                             </div>
                         </div>
                     </div>
                     <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-bold uppercase ${rule.status === 'breached' ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
                              {rule.status === 'breached' ? 'NO MATCH' : 'ACTIVE'}
                          </span>
                     </div>
                 </div>
             ))}
             
             <div className="mt-auto pt-4 text-center">
                 <p className="text-xs text-slate-400 italic">
                     Rule set unchanged since last incident (14 days)
                 </p>
             </div>
        </div>
    </div>
  );
}
