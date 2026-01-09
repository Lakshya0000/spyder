"use client";

import { useState, useEffect } from "react";
import { incidentScenarios } from "../../../components/data/incidents-data";
import AttackTimeline from "../../../components/AttackTimeline";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { vs2015, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "next-themes";
import { BrainCircuit, MessageSquare, Code, CornerDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

SyntaxHighlighter.registerLanguage('javascript', js);

export default function IncidentsPage() {
  const [activeScenario, setActiveScenario] = useState(incidentScenarios[0]);
  const [activeStep, setActiveStep] = useState(0);
  const { theme } = useTheme();
  
  // Auto-play animation on load
 useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
        if (step < activeScenario.timeline.length - 1) {
            step++;
            setActiveStep(step);
        } else {
            clearInterval(interval);
        }
    }, 1500); // 1.5s per hop for dramatic effect
    return () => clearInterval(interval);
  }, [activeScenario]);
  
  const currentNode = activeScenario.timeline[activeStep];
  const isCodeNode = currentNode?.type === 'code' && currentNode.codeContext;


  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden">
        
        {/* Top Bar: Selector & Header */}
        <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Incident Response
                    <span className="text-xs font-normal text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">Live Replay</span>
                </h1>                 
                <div className="flex items-center gap-3">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scenario:</span>
                     <div className="relative">
            <select className="appearance-none bg-slate-100 dark:bg-slate-800 border-none text-sm font-bold text-slate-700 dark:text-slate-200 py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500" value={activeScenario.id}
             onChange={(e) => {
                                const scenario = incidentScenarios.find(s => s.id === e.target.value);
                                if (scenario) {
                                    setActiveScenario(scenario);
                                    setActiveStep(0); // Reset step on change
                                }
                            }}
                         >
                             {incidentScenarios.map(s => (
                                 <option key={s.id} value={s.id}>{s.type} ({s.id})</option>
                             ))}
             </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                     </div>
                 </div>
            </div>
            
            {/* Reuse Header layout but pass activeScenario */}
            <div className="px-6 pb-6">
                 <div className="flex items-start justify-between">
                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                 activeScenario.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50' : 
                                 activeScenario.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50' :
                                 'bg-blue-50 text-blue-700 border-blue-200'
                             }`}>
                                 {activeScenario.severity} Severity

                             </span>
                             <span className="text-sm font-mono text-slate-500">{activeScenario.id}</span>
                         </div>
                         <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                             {activeScenario.type}
                         </h2>
                         <p className="text-sm text-slate-500 max-w-2xl">
                             {activeScenario.description}
                         </p>
                     </div>
                     <div className="text-right">
                         <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Time Detected</div>
                         <div className="font-mono text-sm text-slate-700 dark:text-slate-300">{activeScenario.time_detected}</div>
                     </div>
                 </div>
            </div>
        </div>

        {/* Middle: Interactive Timeline */}
        <div className="shrink-0 p-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Attack Path Reconstruction</h3>
            <AttackTimeline 
                nodes={activeScenario.timeline} 
                activeStep={activeStep} 
                onStepClick={setActiveStep} 
            />
        </div>

        {/* Bottom: Splitscreen - AI Explanation & Code Impact */}
        <div className="flex-1 flex min-h-0 border-t border-slate-200 dark:border-slate-800">
            
            {/* Left: AI Context Panel */}
            <div className="w-1/3 min-w-[400px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-2 mb-4 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wide text-sm">
                    <BrainCircuit size={18} />
                    AI Root Cause Analysis
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-6">
                    {activeScenario.ai_analysis}
                </p>

                {/* Micro-Improvements: Impact & Context */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800/30">
                        <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1">Potential Blast Radius</div>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                            <li>Auth bypass for all users</li>
                            <li>Privilege escalation possible</li>
                        </ul>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                         <div>
                            <div className="text-xs font-bold text-slate-500 uppercase mb-1">Seen Before?</div>
                            <div className="text-xs text-slate-700 dark:text-slate-300">
                                Similar Pattern Detected: <strong>2 previous PRs</strong>
                            </div>
                         </div>
                         <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] text-slate-400 uppercase">Prevented By</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                                → Intent Detection Rule #ID-42
                            </div>
                         </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                             <MessageSquare size={16} className="text-blue-500" />
                             Why it happened
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            The attacker exploited a <strong>logic flaw</strong> in the middleware, not a traditional CVE. The debug header provided a "skeleton key" into the system.
                        </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/30">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                             <CornerDownRight size={16} className="text-green-500" />
                             Recommended Fix
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Remove the conditional block checking `X-Debug-Root` entirely. Validate all requests via the centralized `AuthService`.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Code View (Dynamic) */}
            <div className="flex-1 bg-slate-50 dark:bg-[#1e1e1e] relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {isCodeNode ? (
                         <motion.div 
                            key="code-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex flex-col"
                         >
                            <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-2 text-sm">
                                    <Code size={16} className="text-red-500" />
                                    <span className="font-mono text-slate-600 dark:text-slate-300">
                                        {currentNode.codeContext?.file} : {currentNode.codeContext?.function}
                                    </span>
                                </div>
                                <span className="text-xs font-bold text-red-500 uppercase">Vulnerable Entry Point</span>
                            </div>

                            <div className="flex-1 overflow-auto text-sm p-4">
                                <SyntaxHighlighter 
                                    language="javascript" 
                                    style={theme === 'dark' ? vs2015 : githubGist}
                                    showLineNumbers={true}
                                    startingLineNumber={currentNode.codeContext?.line ? currentNode.codeContext.line - 2 : 138}
                                    wrapLines={true}
                                    lineProps={(line) => ({
                                        style: { display: 'block', backgroundColor: line === 143 ? (theme === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(254, 226, 226, 0.5)') : undefined }
                                    })}
                                    customStyle={{ margin: 0, background: 'transparent' }}
                                >
                                    {currentNode.codeContext?.snippet || ''}
                                </SyntaxHighlighter>
                            </div>
                         </motion.div>
                    ) : (
                         <motion.div 
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-slate-400"
                        >
                            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
                                <Code size={32} />
                            </div>
                            <p className="text-lg font-medium">Tracking Attack Execution...</p>
                            <p className="text-sm">Source code will appear when execution reaches application logic.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    </div>
  );
}
