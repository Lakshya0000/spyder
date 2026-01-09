"use client";

import { SsrEndpoint } from "./data/audit-data";
import { Archive, Github, Globe, AlertCircle, Clock } from "lucide-react";

interface DiscoveredEndpointsProps {
  endpoints: SsrEndpoint[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function DiscoveredEndpoints({ endpoints, selectedId, onSelect }: DiscoveredEndpointsProps) {
  
  const getSourceIcon = (source: string) => {
      switch(source) {
          case 'GitHub': return <Github size={12} />;
          case 'Wayback': return <Clock size={12} />;
          default: return <Globe size={12} />;
      }
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'internal': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
          case 'interesting': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
          default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
         <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Archive size={16} className="text-purple-500" />
                 Recovered Endpoints
             </h3>
             <span className="text-[10px] text-slate-400 font-mono">{endpoints.length} found</span>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-2">
             {endpoints.map((endpoint) => {
                 const isMetadata = endpoint.url.includes("169.254") || endpoint.url.includes("metadata");
                 
                 return (
                     <button
                        key={endpoint.id}
                        onClick={() => onSelect(endpoint.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all duration-200 group relative ${
                            selectedId === endpoint.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500/20' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                     >
                         <div className="flex justify-between items-start mb-1.5">
                             <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${getStatusColor(endpoint.status)}`}>
                                 {endpoint.status}
                             </span>
                             <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                 {getSourceIcon(endpoint.source)}
                                 <span>{endpoint.source}</span>
                             </div>
                         </div>
                         
                         <div className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all mb-1">
                             {endpoint.url}
                         </div>
                         
                         <div className="flex items-center justify-between">
                             <span className="text-[10px] text-slate-400">
                                 Last seen: {endpoint.lastSeen}
                             </span>
                             {isMetadata && (
                                 <AlertCircle size={12} className="text-red-500" />
                             )}
                         </div>
                     </button>
                 );
             })}
         </div>
    </div>
  );
}
