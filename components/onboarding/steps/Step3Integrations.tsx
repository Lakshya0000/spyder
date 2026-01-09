"use client";

import { motion } from "framer-motion";
import { Github, CheckCircle2, Loader2, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface Step3Props {
  data: any;
  updateData: (data: any) => void;
}

export default function Step3Integrations({ data, updateData }: Step3Props) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const handleGithubConnect = () => {
    setIsAuthenticating(true);
    // Mock Auth Delay
    setTimeout(() => {
        setIsAuthenticating(false);
        updateData({ 
            githubConnected: true, 
            repositories: ["spyder-web", "spyder-api", "infrastructure-iac"] 
        });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Connect Source Code</h2>
        <p className="text-slate-500 dark:text-slate-400">Grant access to repositories for PR-level security scanning.</p>
      </div>

      <div className="space-y-6">
        
        {/* GitHub Connect Button */}
        {!data.githubConnected ? (
            <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-slate-50/50 dark:bg-slate-900/50">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                    <Github size={24} className="text-slate-900 dark:text-white" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">GitHub</h3>
                    <p className="text-xs text-slate-500">Scan pull requests & commit history</p>
                </div>
                <button 
                    onClick={handleGithubConnect}
                    disabled={isAuthenticating}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {isAuthenticating ? <Loader2 size={16} className="animate-spin" /> : <LinkIcon size={16} />}
                    {isAuthenticating ? "Connecting..." : "Connect GitHub"}
                </button>
            </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
            >
                 <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                            <Github size={20} className="text-green-700 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                                datmedevil17 <span className="px-2 py-0.5 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-[10px] rounded-full">Connected</span>
                            </div>
                            <div className="text-xs text-slate-500">GitHub Organization</div>
                        </div>
                    </div>
                    <CheckCircle2 size={24} className="text-green-500" />
                 </div>

                 {/* Repo List */}
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Repositories to Monitor</label>
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                        {data.repositories?.map((repo: string) => (
                            <div key={repo} className="p-3 flex items-center gap-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{repo}</span>
                            </div>
                        ))}
                    </div>
                 </div>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
}
