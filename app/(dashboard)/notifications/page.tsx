"use client";

import { alerts } from "../../../components/data/notifications-data";
import AlertFeed from "../../../components/AlertFeed";
import AlertStatsPanel from "../../../components/AlertStatsPanel";
import { Bell } from "lucide-react";

export default function Notifications() {
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 z-20">
             <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Alerts Center
                    <span className="text-xs font-normal text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">Live Feed</span>
                </h1>
                <p className="text-xs text-slate-500">Real-time security signal aggregation and reasoning</p>
             </div>

             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                     </span>
                     <span className="text-xs font-bold text-red-700 dark:text-red-400">
                         {criticalCount} Critical Actions Pending
                     </span>
                 </div>
             </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex overflow-hidden bg-slate-100 dark:bg-black/20">
            <div className="flex-1 relative overflow-y-auto no-scrollbar p-6">
                <div className="max-w-4xl mx-auto h-full">
                    <AlertFeed alerts={alerts} />
                </div>
            </div>
            <AlertStatsPanel alerts={alerts} />
        </div>
    </div>
  );
}
