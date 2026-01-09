"use client";

import { Alert } from "./data/notifications-data";
import { PieChart, Activity, ShieldAlert, BarChart3 } from "lucide-react";

interface AlertStatsPanelProps {
  alerts: Alert[];
}

export default function AlertStatsPanel({ alerts }: AlertStatsPanelProps) {
  const total = alerts.length;
  const critical = alerts.filter(a => a.severity === 'critical').length;
  const high = alerts.filter(a => a.severity === 'high').length;
  const active = alerts.filter(a => a.status === 'active').length;
  
  // Calculate percentages for the distribution bar
  const criticalPct = (critical / total) * 100;
  const highPct = (high / total) * 100;
  const otherPct = 100 - criticalPct - highPct;

  return (
    <div className="w-80 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full overflow-y-auto no-scrollbar hidden xl:block p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity size={16} className="text-blue-500" />
            Threat Landscape
        </h3>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="text-xs text-slate-500 mb-1">Active Threats</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{active}</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="text-xs text-red-600 dark:text-red-400 mb-1">Critical</div>
                <div className="text-xl font-bold text-red-700 dark:text-red-400">{critical}</div>
            </div>
        </div>

        {/* Severity Distribution */}
        <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <PieChart size={12} /> Severity Distribution
            </h4>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-2">
                <div style={{ width: `${criticalPct}%` }} className="h-full bg-red-500" />
                <div style={{ width: `${highPct}%` }} className="h-full bg-orange-500" />
                <div style={{ width: `${otherPct}%` }} className="h-full bg-blue-500" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Critical ({Math.round(criticalPct)}%)</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500" /> High ({Math.round(highPct)}%)</div>
            </div>
        </div>

        {/* Recent Activity Mini-Feed or Categories */}
        <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BarChart3 size={12} /> Top Categories
            </h4>
            <div className="space-y-2">
                {['Phishing', 'Identity', 'Network', 'Malware'].map((cat, i) => (
                    <div key={cat} className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">{cat}</span>
                        <div className="flex-1 mx-3 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full" style={{ width: `${80 - (i * 20)}%` }}></div>
                        </div>
                        <span className="font-mono text-slate-500">{12 - (i * 3)}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* AI Insight */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wide">
                <ShieldAlert size={14} /> AI Recommendation
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed">
                Spike in phishing attempts detected (top 15%). Recommend temporarily increasing email filter sensitivity to "Aggressive" for Finance department.
            </p>
            <button className="mt-3 w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                Apply Policy
            </button>
        </div>
    </div>
  );
}
