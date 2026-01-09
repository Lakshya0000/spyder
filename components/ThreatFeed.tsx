"use client";

import { ThreatLog } from "./data/home-data";
import { AlertCircle, Ban, Eye, ShieldAlert, Terminal } from "lucide-react";

export default function ThreatFeed({ logs }: { logs: ThreatLog[] }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Terminal size={14} className="text-slate-400" />
                Live Threat Feed
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
        </div>
        <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {logs.map((log) => (
                <div key={log.id} className="group flex items-start gap-3 p-3 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs font-mono">
                    <div className="mt-0.5">
                        {log.severity === 'critical' || log.severity === 'high' ? (
                            <ShieldAlert size={14} className="text-red-500" />
                        ) : (
                            <AlertCircle size={14} className="text-orange-400" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-700 dark:text-slate-200 truncate">{log.type}</span>
                            <span className="text-slate-400">{log.timestamp}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500">
                             <span className="truncate max-w-[120px]">{log.source}</span>
                             <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold
                                ${log.action === 'blocked' || log.action === 'frozen' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                                  log.action === 'flagged' || log.action === 'throttled' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                  'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                                 {log.action}
                             </span>
                        </div>
                    </div>
                </div>
            ))}
             <div className="p-3 text-center opacity-50 text-[10px] animate-pulse">
                Awaiting new signals...
            </div>
        </div>
    </div>
  );
}
