"use client";

import { SecurityIssue } from "./data/code-security-data";
import { BrainCircuit, ShieldCheck, CornerDownRight, MessageSquare, AlertTriangle } from "lucide-react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { githubGist, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "next-themes";

SyntaxHighlighter.registerLanguage('javascript', js);

interface CodeContextPanelProps {
  issue: SecurityIssue | null;
}

export default function CodeContextPanel({ issue }: CodeContextPanelProps) {
  const { theme } = useTheme();
  
  if (!issue) {
      return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <ShieldCheck size={48} className="mb-4 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-medium">Select a finding to view details</p>
          </div>
      );
  }

  const isIntent = issue.type === 'Suspicious Intent';

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto">
        {/* Detail Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-1 flex flex-col">
            {/* Header */}
            <div className={`p-4 border-b ${isIntent ? 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/50' : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800'}`}>
                <div className="flex items-start gap-3">
                     <div className={`p-2 rounded-lg shrink-0 ${isIntent ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300' : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300'}`}>
                        {isIntent ? <AlertTriangle size={20} /> : <AlertTriangle size={20} />}
                     </div>
                     <div>
                         <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">
                             {issue.title}
                         </h3>
                         <div className="text-sm text-slate-500 flex items-center gap-2">
                             <span>{issue.type}</span>
                             <span>•</span>
                             <span>Confirmed by DeepAnalysis™</span>
                             <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                 92% CONFIDENCE
                             </span>
                         </div>
                     </div>
                </div>
            </div>

            {/* Code View */}
            <div className="relative border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1e1e1e]">
                 <div className="absolute top-2 right-2 z-10 text-[10px] uppercase font-bold text-slate-400 bg-slate-200/50 dark:bg-white/10 px-2 py-0.5 rounded">
                     {issue.file}
                 </div>
                 <div className="text-xs">
                    <SyntaxHighlighter 
                        language="javascript" 
                        style={theme === 'dark' ? vs2015 : githubGist}
                        showLineNumbers={true}
                        startingLineNumber={issue.line - 2} // Approximate context window
                        wrapLines={true}
                        lineProps={(line) => {
                             // Assuming mock data has exact lines, we highlight the middle one or search content
                             // Mock data `line` is the vulnerable line
                             // Logic here implies the code snippet matches the line number
                             return {
                                 style: { display: 'block', backgroundColor: line === 3 ? (theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(254, 202, 202, 0.4)') : undefined }
                             };
                        }}
                        customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', lineHeight: '1.5' }}
                    >
                        {issue.code_snippet}
                    </SyntaxHighlighter>
                 </div>
            </div>

            {/* AI Analysis Panel */}
            <div className="p-6 space-y-6 bg-white dark:bg-slate-900 flex-1">
                
                {/* Intent Analysis (Conditional) */}
                {isIntent && issue.intent_analysis && (
                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                        <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-bold text-sm uppercase tracking-wide">
                            <BrainCircuit size={16} />
                            Intent Detection Analysis
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {issue.intent_analysis}
                        </p>
                    </div>
                )}

                {/* AI Reasoning */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <MessageSquare size={16} className="text-blue-500" />
                        AI Reasoning
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {issue.ai_reasoning}
                    </p>
                </div>

                {/* Remediation */}
                 <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <CornerDownRight size={16} className="text-green-500" />
                        Recommended Action
                    </h4>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 text-sm text-slate-700 dark:text-slate-300">
                        {issue.remediation_suggestion}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}
