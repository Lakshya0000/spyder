"use client";

import { AlertTriangle, ArrowRight, Play, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

interface RequestInspectorProps {
  url: string;
  response: string | null;
  onSend: () => void;
  isSending: boolean;
}

export default function RequestInspector({ url, response, onSend, isSending }: RequestInspectorProps) {
  const [localUrl, setLocalUrl] = useState(url);
  
  // Sync prop url to local state when it changes
  useEffect(() => {
      setLocalUrl(url);
  }, [url]);

  const isInternal = localUrl.includes("169.254") || localUrl.includes("localhost");

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full font-mono">
         {/* Terminal Header */}
         <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
             <div className="flex items-center gap-2">
                 <Terminal size={14} className="text-slate-400" />
                 <span className="text-xs font-bold text-slate-300">Request Builder</span>
             </div>
             {isInternal && (
                 <span className="text-[10px] font-bold text-red-400 flex items-center gap-1 bg-red-900/20 px-2 py-0.5 rounded border border-red-900/50">
                     <AlertTriangle size={10} /> Internal Target
                 </span>
             )}
         </div>

         <div className="flex-1 flex flex-col">
             {/* Input Area */}
             <div className="p-4 space-y-4 border-b border-slate-800 bg-slate-900/50">
                 <div>
                     <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Target URL</label>
                     <div className="flex gap-2">
                         <div className="bg-slate-800 p-2 rounded text-xs text-blue-400 font-bold shrink-0">GET</div>
                         <input 
                            type="text" 
                            value={localUrl}
                            onChange={(e) => setLocalUrl(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                         />
                         <button 
                            onClick={onSend}
                            disabled={isSending || !localUrl}
                            className={`px-4 rounded text-xs font-bold flex items-center gap-2 ${isSending ? 'bg-slate-700 text-slate-500' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                         >
                             {isSending ? '...' : <Play size={12} />}
                             SEND
                         </button>
                     </div>
                 </div>

                 <div>
                     <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 block">Headers</label>
                     <div className="bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-400 font-mono space-y-1">
                         <div className="flex gap-2">
                             <span className="text-purple-400">User-Agent:</span>
                             <span>Mozilla/5.0 (PentestBot/1.0)</span>
                         </div>
                         <div className="flex gap-2">
                             <span className="text-purple-400">X-Custom-Auth:</span>
                             <span>test-token-123</span>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Response Area */}
             <div className="flex-1 p-4 bg-black overflow-auto no-scrollbar">
                 <label className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 block">Response Output</label>
                 
                 {response ? (
                     <div className="text-xs font-mono animate-in fade-in duration-300">
                         {/* Status Line */}
                         <div className="flex items-center gap-3 mb-2 pb-2 border-b border-slate-800">
                             <span className="text-green-400 font-bold">HTTP/1.1 200 OK</span>
                             <span className="text-slate-500">342ms</span>
                             <span className="text-slate-500">1.2kb</span>
                         </div>
                         
                         {/* Body */}
                         <div className="space-y-1">
                             {response.split('\n').map((line, i) => {
                                 // Highlight sensitive patterns
                                 const isSensitive = line.includes("secrets") || line.includes("password") || line.includes("role") || line.includes("arn:");
                                 return (
                                     <div key={i} className={`${isSensitive ? 'bg-red-900/20 text-red-300' : 'text-slate-400'} whitespace-pre-wrap break-all`}>
                                         {line}
                                     </div>
                                 );
                             })}
                         </div>
                     </div>
                 ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                         <ArrowRight size={24} className="opacity-20" />
                         <span className="text-xs">Ready to assert request</span>
                     </div>
                 )}
             </div>
         </div>
    </div>
  );
}
