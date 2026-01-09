"use client";

import { useState } from "react";
import CorsCspDashboard from "@/components/CorsCspDashboard";
import SsrfDashboard from "@/components/SsrfDashboard";
import { ShieldAlert, Globe, Radio } from "lucide-react";

export default function Audits() {
  const [activeTab, setActiveTab] = useState<'cors' | 'ssrf'>('cors');

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 z-20">
             <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Security Audits 
                    <span className="text-xs font-normal text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">v1.2</span>
                </h1>
                <p className="text-xs text-slate-500">Vulnerability scanning and policy validation</p>
             </div>

             {/* Tabs */}
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                 <button 
                    onClick={() => setActiveTab('cors')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'cors' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                 >
                     <ShieldAlert size={14} className={activeTab === 'cors' ? 'text-blue-500' : ''} />
                     CORS & CSP Visualizer
                 </button>
                 <button 
                    onClick={() => setActiveTab('ssrf')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'ssrf' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                 >
                     <Radio size={14} className={activeTab === 'ssrf' ? 'text-purple-500' : ''} />
                     SSRF Pentester
                 </button>
             </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 p-6 relative overflow-hidden bg-slate-100 dark:bg-black/20">
            {activeTab === 'cors' ? (
                <CorsCspDashboard />
            ) : (
                <SsrfDashboard />
            )}
        </div>
    </div>
  );
}
