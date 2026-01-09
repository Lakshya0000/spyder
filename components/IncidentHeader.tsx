"use client";

import { IncidentReplayData } from "./data/incidents-data";
import { AlertTriangle, Clock, Server, ShieldAlert } from "lucide-react";

interface IncidentHeaderProps {
  incident: IncidentReplayData;
}

export default function IncidentHeader({ incident }: IncidentHeaderProps) {
  const getSeverityStyle = (severity: string) => {
      switch(severity) {
          case 'Critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
          case 'High': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400';
          default: return 'text-slate-600 bg-slate-50 border-slate-200';
      }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex items-start justify-between shadow-sm shrink-0">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="text-red-500" />
                    {incident.type}
                </h1>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getSeverityStyle(incident.severity)}`}>
                    {incident.severity}
                </span>
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-4">
                 <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                     {incident.id}
                 </span>
                 <span className="flex items-center gap-1.5">
                     <Server size={14} />
                     Affected Service: <strong className="text-slate-700 dark:text-slate-300">{incident.service}</strong>
                 </span>
                 <span className="flex items-center gap-1.5">
                     <Clock size={14} />
                     Detected: {incident.time_detected}
                 </span>
            </div>
        </div>
        
        <div className="max-w-lg text-sm text-slate-600 dark:text-slate-400 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
            {incident.description}
        </div>
    </div>
  );
}
