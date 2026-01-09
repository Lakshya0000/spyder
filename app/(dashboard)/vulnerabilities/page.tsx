"use client";

import { useState } from "react";
import ThreatMeter from "../../../components/ThreatMeter";
import CVECards from "../../../components/CVECards";
import AlertConfigurationPanel from "../../../components/AlertConfigurationPanel";
import { mockCVEData, mockThreatStats } from "../../../components/data/vulnerabilities-data";
import { ShieldCheck, Calendar, Bell } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function VulnerabilitiesPage() {
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<'all' | '30d'>('all');

  // Filter CVEs
  const filteredCVEs = mockCVEData.filter(cve => {
      if (dateFilter === 'all') return true;
      // Simple logic: if 'first_seen' contains 'hour' or 'day', it's recent. 
      // If 'week', check if < 4 weeks. 'month', 'year' -> exclude.
      // Mock data has '2 days ago', '4 hours ago', '1 week ago', '6 days ago'.
      // All fit within 30 days except maybe old ones?
      // Let's just exclude 'month' and 'year' for the '30d' filter logic as a heuristic.
      const t = cve.first_seen.toLowerCase();
      if (t.includes('month') || t.includes('year')) return false;
      return true;
  });

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-black p-6 font-[family-name:var(--font-sans)] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
             <ShieldCheck className="text-blue-600" />
             CVE & Zero-Day Intelligence
           </h1>
           <p className="text-slate-500 mt-1 font-medium">Pre-exploit risk reasoning and threat forecasting.</p>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={() => setDateFilter(prev => prev === 'all' ? '30d' : 'all')}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === '30d' 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
             >
                <Calendar size={16} />
                {dateFilter === '30d' ? 'Last 30 Days (Active)' : 'Last 30 Days'}
             </button>
             <button 
                onClick={() => setIsAlertPanelOpen(!isAlertPanelOpen)}
                className={`flex items-center gap-2 px-4 py-2 ${isAlertPanelOpen ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50'} border rounded-lg text-sm font-medium transition-colors shadow-sm`}
             >
                <Bell size={16} />
                Configure Alerts
             </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden ">
        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left: Threat Meter */}
                <div className="space-y-6">
                    <ThreatMeter 
                        score={mockThreatStats.score} 
                        level={mockThreatStats.level} 
                        confidence={mockThreatStats.confidence} 
                        label={mockThreatStats.label} 
                    />
                    
                    {/* Additional Stats */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-3xl"></div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Total Analysed</h3>
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                            {filteredCVEs.length < mockCVEData.length ? filteredCVEs.length : '1,402'}
                        </div>
                        <div className="text-xs font-semibold text-green-600 flex items-center gap-1 bg-green-50 dark:bg-green-900/20 w-fit px-2 py-1 rounded-full">
                            +12 new today
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {/* Middle Section: CVE Intelligence Cards */}
                    <CVECards cves={filteredCVEs} />
                </div>
            </div>
        </div>

        {/* Right Panel: Alerts Config */}
        <AnimatePresence>
            {isAlertPanelOpen && (
                <div className="shrink-0 h-full"> 
                    <AlertConfigurationPanel onClose={() => setIsAlertPanelOpen(false)} />
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
