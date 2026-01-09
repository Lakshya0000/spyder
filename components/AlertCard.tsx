"use client";

import { Alert, Severity } from "./data/notifications-data";
import { AlertTriangle, ShieldAlert, GitPullRequest, Info, Clock, ExternalLink, ShieldCheck, Play } from "lucide-react";

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  
  const getSeverityColor = (severity: Severity) => {
      switch(severity) {
          case 'critical': return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30';
          case 'high': return 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/30';
          case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30';
          default: return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30';
      }
  };

  const getIcon = () => {
      switch(alert.type) {
          case 'phishing': return <ShieldAlert className="text-red-600 dark:text-red-400" size={20} />;
          case 'incident': return <AlertTriangle className="text-orange-600 dark:text-orange-400" size={20} />;
          case 'change': return <GitPullRequest className="text-blue-600 dark:text-blue-400" size={20} />;
      }
  };

  return (
    <div className={`rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${getSeverityColor(alert.severity)}`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                    {getIcon()}
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{alert.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            alert.status === 'active' ? 'bg-red-100 text-red-700' :
                            alert.status === 'mitigated' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                        }`}>
                            {alert.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} /> {alert.timestamp}
                        </span>
                        <span>•</span>
                        <span>Source: <strong>{alert.source}</strong></span>
                    </div>
                </div>
            </div>
            
             {/* Actions */}
             <div className="flex gap-2">
                 {alert.actions?.map((action, i) => (
                     <button 
                        key={i}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                            action.primary 
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90' 
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                     >
                         {action.primary ? <Play size={12} /> : null}
                         {action.label}
                     </button>
                 ))}
             </div>
        </div>

        {/* The "Reasoning" Section (Why?) */}
        <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 mb-4 border border-slate-200/50 dark:border-slate-800/50">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info size={12} /> AI Analysis
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {alert.reasoning}
            </p>
        </div>

        {/* Technical Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {alert.technicalDetails?.map((detail, i) => (
                 <div key={i}>
                     <dt className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{detail.label}</dt>
                     <dd className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">{detail.value}</dd>
                 </div>
             ))}
             {/* Impacted Assets */}
             <div className="col-span-2">
                 <dt className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Impacted Assets</dt>
                  <dd className="flex gap-2">
                      {alert.assets.map((asset, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 font-mono">
                              {asset}
                          </span>
                      ))}
                  </dd>
             </div>
        </div>
    </div>
  );
}
