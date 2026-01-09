"use client";

import { OrgProfile } from "../profile-data";
import { TrendingUp, ShieldCheck, Zap, Lock } from "lucide-react";

interface SecurityScorecardProps {
  profile: OrgProfile;
}

export default function SecurityScorecard({ profile }: SecurityScorecardProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Risk Score */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 absolute top-6 left-6">Overall Risk Score</h3>
             
             <div className="relative w-32 h-32 flex items-center justify-center">
                 {/* Circular Progress Placeholder */}
                 <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                     <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-blue-500" strokeDasharray={`${(profile.riskScore / 100) * 351} 351`} strokeLinecap="round" />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                     <span className="text-4xl font-black text-slate-900 dark:text-white">{profile.riskScore}</span>
                     <span className="text-[10px] text-slate-400 uppercase font-bold">Excellent</span>
                 </div>
             </div>

             <div className="flex items-center gap-2 mt-2 text-green-500 text-xs font-bold">
                 <TrendingUp size={14} /> +5% since last month
             </div>
        </div>

        {/* Autonomy Level */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Autonomy Level</h3>
                 <Zap size={18} className="text-purple-500" />
             </div>
             
             <div className="mt-4">
                 <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{profile.autonomyLevel}</div>
                 <p className="text-xs text-slate-500 mb-4">
                     {profile.autonomyLevel === 'Semi-Autonomous' 
                        ? 'AI suggests actions; Human approves critical changes.' 
                        : 'AI operates freely within defined boundaries.'}
                 </p>
                 
                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-2/3"></div>
                 </div>
             </div>
        </div>

        {/* Critical Exposures (Summary) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Exposures</h3>
                 <ShieldCheck size={18} className="text-green-500" />
             </div>
             
             <div className="space-y-3 mt-2">
                 <div className="flex justify-between items-center">
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Identity Governance</span>
                     <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded">0 Issues</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Data Loss Prevention</span>
                     <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded">2 Warnings</span>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Infrastructure</span>
                     <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded">Secure</span>
                 </div>
             </div>
        </div>
    </div>
  );
}
