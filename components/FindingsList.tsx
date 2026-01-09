"use client";

import { SecurityIssue } from "./data/code-security-data";
import { AlertCircle, CheckCircle2, ShieldAlert, FileCode, Lock, Zap } from "lucide-react";

interface FindingsListProps {
  issues: SecurityIssue[];
  selectedId?: string;
  onSelect: (issue: SecurityIssue) => void;
}

export default function FindingsList({ issues, selectedId, onSelect }: FindingsListProps) {
  
  const getIcon = (type: string) => {
      switch(type) {
          case 'Vulnerability': return <ShieldAlert size={16} />;
          case 'Secret Exposure': return <Lock size={16} />;
          case 'Suspicious Intent': return <Zap size={16} />;
          default: return <AlertCircle size={16} />;
      }
  };

  const getSeverityColor = (severity: string) => {
      switch(severity) {
          case 'Critical': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
          case 'High': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400';
          case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400';
          case 'Low': return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400';
          default: return 'text-slate-600';
      }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Scan Results <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{issues.length}</span>
            </h3>
            {/* Sort/Filter could go here */}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {issues.map(issue => (
                <div 
                    key={issue.id}
                    onClick={() => onSelect(issue)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group ${selectedId === issue.id ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                >
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3">
                             <div className={`mt-0.5 p-1.5 rounded-md shrink-0 ${issue.type === 'Suspicious Intent' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                 {getIcon(issue.type)}
                             </div>
                             <div>
                                 <h4 className={`font-medium text-sm text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${selectedId === issue.id ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                                    {issue.title}
                                 </h4>
                                 <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                     <span className="flex items-center gap-1">
                                        <FileCode size={12} />
                                        {issue.file}:{issue.line}
                                     </span>
                                     <span>•</span>
                                     <span>{issue.type}</span>
                                 </div>
                                 
                                 {/* Only show badges in list if compact, usually important */}
                                 <div className="flex gap-2">
                                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getSeverityColor(issue.severity)}`}>
                                         {issue.severity.toUpperCase()}
                                     </span>
                                     {issue.intent_risk !== 'Low' && (
                                         <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                                            INTENT: {issue.intent_risk.toUpperCase()}
                                         </span>
                                     )}
                                 </div>
                             </div>
                        </div>
                        <div className="text-xs font-medium text-slate-400 shrink-0">
                            {issue.status}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
