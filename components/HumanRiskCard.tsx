"use client";

import { HumanRiskMetrics } from "./data/home-data";
import { Users, UserMinus, MailWarning, GraduationCap } from "lucide-react";

export default function HumanRiskCard({ metrics }: { metrics: HumanRiskMetrics }) {
  return (
    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col">
       <div className="flex justify-between items-start mb-4">
             <div>
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                     <Users size={14} className="text-slate-400" />
                     Human Layer
                 </h3>
                 <p className="text-[10px] text-slate-400 mt-1">Behavior & Training</p>
             </div>
             <div className="text-right">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.trainingStatus}%</span>
                 <p className="text-[10px] font-bold uppercase text-slate-400">Trained</p>
             </div>
       </div>

       <div className="flex-1 grid grid-cols-2 gap-2">
           <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 flex flex-col items-center justify-center border border-red-100 dark:border-red-900/30">
               <MailWarning size={16} className="text-red-500 mb-1" />
               <span className="text-xl font-bold text-red-700 dark:text-red-400">{metrics.phishingAttempts}</span>
               <span className="text-[9px] uppercase font-bold text-red-600/70 dark:text-red-400/70">Phishing Hits</span>
           </div>

           <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-3 flex flex-col items-center justify-center border border-orange-100 dark:border-orange-900/30">
               <UserMinus size={16} className="text-orange-500 mb-1" />
               <span className="text-xl font-bold text-orange-700 dark:text-orange-400">{metrics.anomalousLogins}</span>
               <span className="text-[9px] uppercase font-bold text-orange-600/70 dark:text-orange-400/70">Anomalies</span>
           </div>
           
           <div className="col-span-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-2.5 flex items-center justify-center gap-2 border border-blue-100 dark:border-blue-900/30">
               <GraduationCap size={14} className="text-blue-500" />
               <span className="text-xs font-bold text-blue-700 dark:text-blue-400">Training Campaign Active</span>
           </div>
       </div>
    </div>
  );
}
