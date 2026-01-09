"use client";

import { useState } from "react";
import { prScenarios, SecurityIssue } from "../../../components/data/code-security-data";
import FindingsList from "../../../components/FindingsList";
import CodeContextPanel from "../../../components/CodeContextPanel";
import { GitPullRequest, GitBranch, Github, CheckCircle2, XCircle, AlertCircle, Shield, Play, Loader2, ChevronDown } from "lucide-react";

export default function CodeSecurityPage() {
  const [activeScenario, setActiveScenario] = useState(prScenarios[0]);
  const [selectedIssue, setSelectedIssue] = useState<SecurityIssue | null>(activeScenario.issues[0]);
  
  const [isScanning, setIsScanning] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleScan = () => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
  };
  
  const handleRequest = () => {
      setIsRequesting(true);
      setTimeout(() => setIsRequesting(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-black font-[family-name:var(--font-sans)] overflow-hidden">
        
        {/* Top Bar: Repository Context & Selector */}
        <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Github size={20} className="text-black dark:text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-0.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">{activeScenario.context.repository}</span>
                        <span className="text-slate-300">/</span>
                        {/* PR Selector Dropdown */}
                         <div className="relative group">
                            <select 
                                className="appearance-none bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold text-blue-600 dark:text-blue-400 py-0.5 pl-2 pr-6 rounded-md cursor-pointer focus:outline-none transition-colors"
                                value={activeScenario.id}
                                onChange={(e) => {
                                    const scenario = prScenarios.find(s => s.id === e.target.value);
                                    if (scenario) {
                                        setActiveScenario(scenario);
                                        setSelectedIssue(scenario.issues[0]); // Reset selection
                                    }
                                }}
                            >
                                {prScenarios.map(s => (
                                    <option key={s.id} value={s.id}>PR #{s.context.pr_number}: {s.context.branch}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-slate-400">
                                <ChevronDown size={12} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-400">
                             <GitBranch size={12} />
                             {activeScenario.context.branch}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <span className="font-mono">{activeScenario.context.commit_hash}</span>
                             <span>by {activeScenario.context.author.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                 {/* Status Badge & Gate Reason */}
                 <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border mb-1.5 shadow-sm ${
                        activeScenario.context.status === 'Blocked' 
                           ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
                           : 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-400'
                    }`}>
                        {activeScenario.context.status === 'Blocked' ? <XCircle size={14} /> : <AlertCircle size={14} />}
                        <span className="text-xs font-bold uppercase tracking-wide">{activeScenario.context.status === 'Blocked' ? 'Merge Blocked' : 'Check Failed'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 animate-pulse"></div>
                            {activeScenario.context.stats.critical_issues} Critical
                        </span>
                        <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                            {activeScenario.context.stats.intent_risks} Suspicious
                        </span>
                    </div>
                 </div>
                 
                 <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

                 <div className="flex gap-3">
                     <button 
                        onClick={handleScan}
                        disabled={isScanning}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-70"
                     >
                        {isScanning ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                        {isScanning ? 'Scanning...' : 'Re-run Scan'}
                     </button>
                      <button 
                        onClick={handleRequest}
                        disabled={isRequesting}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex items-center gap-2 disabled:bg-red-800"
                     >
                        {isRequesting ? <CheckCircle2 size={16} /> : <Play size={16} />}
                        {isRequesting ? 'Request Sent' : 'Request Changes'}
                     </button>
                 </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
             {/* Left: Findings List */}
             <div className="w-1/3 min-w-[400px] flex flex-col">
                  <FindingsList 
                      issues={activeScenario.issues} 
                      selectedId={selectedIssue?.id} 
                      onSelect={setSelectedIssue} 
                  />
                  
                  {/* Summary Stats (Bottom Left) */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">{activeScenario.context.stats.total_issues}</span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total</span>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-800/30 flex flex-col items-center">
                          <span className="text-2xl font-bold text-red-600 dark:text-red-400">{activeScenario.context.stats.critical_issues}</span>
                          <span className="text-[10px] text-red-600/70 dark:text-red-400/70 uppercase tracking-wider">Critical</span>
                      </div>
                       <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30 flex flex-col items-center">
                          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{activeScenario.context.stats.intent_risks}</span>
                          <span className="text-[10px] text-purple-600/70 dark:text-purple-400/70 uppercase tracking-wider">Intent</span>
                      </div>
                  </div>
             </div>

             {/* Right: Code Context */}
             <div className="flex-1 min-w-0">
                 <CodeContextPanel issue={selectedIssue} />
             </div>
        </div>

    </div>
  );
}
