"use client";

import { ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";

interface ImpactFixControlProps {
  isFixed: boolean;
  onToggleFix: () => void;
}

export default function ImpactFixControl({ isFixed, onToggleFix }: ImpactFixControlProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
         <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Impact & Remediation</h3>
         </div>

         <div className="flex-1 p-6 flex flex-col justify-between">
             {/* Impact Meter */}
             <div>
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-xs font-bold text-slate-500 uppercase">Current Risk Level</span>
                     <span className={`text-xl font-black ${isFixed ? 'text-green-500' : 'text-red-600'}`}>
                         {isFixed ? 'LOW' : 'CRITICAL'}
                     </span>
                 </div>
                 
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-2">
                     {/* Low Segment */}
                     <div className={`flex-1 transition-opacity duration-300 ${isFixed ? 'opacity-100' : 'opacity-30'}`}>
                         <div className="h-full bg-green-500"></div>
                     </div>
                     {/* Medium Segment */}
                     <div className={`flex-1 border-l border-white dark:border-slate-900 transition-opacity duration-300 ${isFixed ? 'opacity-30' : 'opacity-30'}`}>
                         <div className="h-full bg-yellow-400"></div>
                     </div>
                     {/* Critical Segment */}
                     <div className={`flex-1 border-l border-white dark:border-slate-900 transition-opacity duration-300 ${isFixed ? 'opacity-30' : 'opacity-100'}`}>
                         <div className="h-full bg-red-600"></div>
                     </div>
                 </div>
                 
                 <div className="flex items-center gap-2 text-xs">
                     {isFixed ? (
                         <TrendingDown size={14} className="text-green-500" />
                     ) : (
                         <TrendingUp size={14} className="text-red-500" />
                     )}
                     <span className="text-slate-500">
                         {isFixed ? 'Risk mitigated via strict origin policy' : 'Data exfiltration likely via XHR'}
                     </span>
                 </div>
             </div>

             {/* Fix Control */}
             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                 <div className="flex items-center justify-between mb-3">
                     <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Apply Secure Policy Fix</span>
                     <button 
                        onClick={onToggleFix}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isFixed ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                     >
                         <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFixed ? 'translate-x-6' : 'translate-x-1'}`} />
                     </button>
                 </div>
                 
                 <p className="text-xs text-slate-500 mb-0">
                     Enforces <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Access-Control-Allow-Origin</code> whitelist and restrict <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">script-src</code> to <code className="text-blue-500">'self'</code>.
                 </p>
             </div>
             
             {isFixed && (
                 <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-200 dark:border-green-900/30">
                     <ShieldCheck size={18} />
                     <span className="text-xs font-bold">Configuration Secured</span>
                 </div>
             )}
         </div>
    </div>
  );
}
