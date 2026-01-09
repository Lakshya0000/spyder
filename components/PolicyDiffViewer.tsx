"use client";

import { PolicyLine } from "./data/audit-data";
import { AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";

interface PolicyDiffViewerProps {
  secure: PolicyLine[];
  vulnerable: PolicyLine[];
  isFixed: boolean;
}

export default function PolicyDiffViewer({ secure, vulnerable, isFixed }: PolicyDiffViewerProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
         <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <ShieldAlert size={16} className="text-blue-500" />
                 Policy Configuration Diff
             </h3>
             <span className="text-[10px] text-slate-400 font-mono">apache2.conf / nginx.conf</span>
         </div>
         
         <div className="flex-1 grid grid-cols-2 text-xs font-mono overflow-auto no-scrollbar">
             {/* Left: Secure Policy */}
             <div className="bg-slate-50/50 dark:bg-slate-950/30 border-r border-slate-200 dark:border-slate-800 p-2">
                 <div className="mb-2 text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                     <CheckCircle size={12} /> Desired State (Secure)
                 </div>
                 {secure.map((line) => (
                     <div key={line.id} className="mb-1 p-1 rounded bg-green-100/50 dark:bg-green-900/10 text-slate-700 dark:text-slate-300 border border-green-200/50 dark:border-green-900/20">
                         {line.content}
                     </div>
                 ))}
             </div>

             {/* Right: Vulnerable Policy */}
             <div className="p-2 relative">
                 <div className={`mb-2 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isFixed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                     {isFixed ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                     {isFixed ? 'Current State (Remediated)' : 'Current State (Vulnerable)'}
                 </div>
                 
                 {isFixed ? (
                     // Fixed State (Mirror Secure)
                     secure.map((line) => (
                        <div key={line.id} className="mb-1 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-transparent">
                            {line.content}
                        </div>
                     ))
                 ) : (
                     // Vulnerable State
                     vulnerable.map((line) => (
                        <div key={line.id} className={`mb-2 p-1 rounded relative group ${line.isVulnerable ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50' : 'bg-transparent text-slate-500'}`}>
                            <span className={line.isVulnerable ? 'text-red-700 dark:text-red-300 font-semibold' : ''}>
                                {line.content}
                            </span>
                            
                            {line.isVulnerable && line.warning && (
                                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 translate-x-full px-2">
                                     <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                                         {line.warning}
                                     </span>
                                </div>
                            )}
                        </div>
                     ))
                 )}

                 {!isFixed && (
                    <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse z-0"></div>
                 )}
             </div>
         </div>
    </div>
  );
}
