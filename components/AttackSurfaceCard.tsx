"use client";

import { AttackSurfaceMetrics } from "./data/home-data";
import { Globe, Monitor, Network, ShieldAlert } from "lucide-react";

export default function AttackSurfaceCard({ metrics }: { metrics: AttackSurfaceMetrics }) {
  return (
    <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
             <div>
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                     <Globe size={14} className="text-slate-400" />
                     Attack Surface
                 </h3>
                 <p className="text-[10px] text-slate-400 mt-1">External exposure summary</p>
             </div>
             <div className="flex flex-col items-end">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.riskScore}</span>
                 <span className={`text-[10px] font-bold uppercase ${metrics.trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                     Risk Score
                 </span>
             </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2">
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-2.5 flex flex-col justify-center border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Network size={12} />
                    <span className="text-[10px] uppercase font-bold">Open Ports</span>
                </div>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{metrics.openPorts}</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-2.5 flex flex-col justify-center border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Monitor size={12} />
                    <span className="text-[10px] uppercase font-bold">Assets</span>
                </div>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{metrics.exposedAssets}</span>
            </div>
            
             <div className="col-span-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg p-2.5 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldAlert size={12} className="text-orange-400" />
                    <span className="text-[10px] uppercase font-bold">Shadow IT Detected</span>
                </div>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{metrics.shadowIT}</span>
            </div>
        </div>
    </div>
  );
}
