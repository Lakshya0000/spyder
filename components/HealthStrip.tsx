"use client";

import { Activity, CheckCircle2, Server, Shield } from "lucide-react";
import { SystemHealth } from "./data/home-data";

export default function HealthStrip({ health }: { health: SystemHealth }) {
  return (
    <div className="w-full h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pr-6 border-r border-slate-100 dark:border-slate-800">
             <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">System Healthy</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
            <Activity size={14} className="text-slate-400" />
            <span>Uptime: <strong className="text-slate-700 dark:text-slate-300 font-mono">{health.uptime}</strong></span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
            <Server size={14} className="text-slate-400" />
            <span>Active Nodes: <strong className="text-slate-700 dark:text-slate-300 font-mono">{health.activeNodes}</strong></span>
        </div>
      </div>

      <div className="flex items-center gap-2">
           <Shield size={14} className="text-slate-400" />
           <span className="text-xs text-slate-500">Last Scan: <span className="text-slate-700 dark:text-slate-300">{health.lastScan}</span></span>
      </div>
    </div>
  );
}
