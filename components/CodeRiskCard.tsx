"use client";

import { CodeRiskMetrics } from "./data/home-data";
import { Code2, GitPullRequest, AlertTriangle, ShieldCheck } from "lucide-react";

export default function CodeRiskCard({ metrics }: { metrics: CodeRiskMetrics }) {
  return (
    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col">
       <div className="flex justify-between items-start mb-4">
             <div>
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                     <Code2 size={14} className="text-slate-400" />
                     Code Security
                 </h3>
                 <p className="text-[10px] text-slate-400 mt-1">Pipeline & Repo Status</p>
             </div>
             <div className="text-right">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.coverage}%</span>
                 <p className="text-[10px] font-bold uppercase text-slate-400">Coverage</p>
             </div>
       </div>

       <div className="flex-1 flex flex-col gap-2">
           <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-red-100 dark:bg-red-900/20 rounded text-red-600 dark:text-red-400">
                       <AlertTriangle size={12} />
                   </div>
                   <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Vulnerabilities</span>
               </div>
               <span className="font-mono font-bold text-slate-900 dark:text-white">{metrics.criticalVulnerabilities}</span>
           </div>

           <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">
                       <GitPullRequest size={12} />
                   </div>
                   <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Open PRs</span>
               </div>
               <span className="font-mono font-bold text-slate-900 dark:text-white">{metrics.openPRs}</span>
           </div>
           
           <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2">
                   <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded text-orange-600 dark:text-orange-400">
                       <ShieldCheck size={12} />
                   </div>
                   <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Risky Deps</span>
               </div>
               <span className="font-mono font-bold text-slate-900 dark:text-white">{metrics.riskyDependencies}</span>
           </div>
       </div>
    </div>
  );
}
