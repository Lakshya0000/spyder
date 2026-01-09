"use client";

import { SettingsConfig } from "./data/settings-data";
import { Zap, Shield, BrainCircuit } from "lucide-react";
import { useState } from "react";

interface AutonomyControlProps {
  config: SettingsConfig['autonomy'];
}

export default function AutonomyControl({ config }: AutonomyControlProps) {
  const [level, setLevel] = useState(config.level);

  const getMode = (val: number) => {
      if (val < 40) return 'Advisory';
      if (val < 80) return 'Supervised';
      return 'Autonomous';
  };

  const mode = getMode(level);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                mode === 'Autonomous' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' :
                mode === 'Supervised' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }`}>
                <BrainCircuit size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Autonomy Governance</h3>
                <p className="text-xs text-slate-500">Control the level of agency granted to defensive AI agents.</p>
            </div>
        </div>

        <div className="mb-8 px-2">
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={level} 
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between mt-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className={mode === 'Advisory' ? 'text-slate-700 dark:text-white' : ''}>Advisory</span>
                <span className={mode === 'Supervised' ? 'text-blue-600 dark:text-blue-400' : ''}>Supervised</span>
                <span className={mode === 'Autonomous' ? 'text-purple-600 dark:text-purple-400' : ''}>Autonomous</span>
            </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    {mode} Mode Active
                </h4>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    mode === 'Autonomous' ? 'bg-purple-100 text-purple-600' :
                    mode === 'Supervised' ? 'bg-blue-100 text-blue-600' :
                    'bg-slate-200 text-slate-600'
                }`}>
                    Level {level}%
                </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {mode === 'Autonomous' ? 'AI independently analyzes threats and deploys mitigations. Human review is post-action.' :
                 mode === 'Supervised' ? 'AI suggests actions and can autonomously block high-confidence (>90%) threats. Complex actions require approval.' :
                 'AI only provides analysis and recommendations. No actions are taken without explicit human command.'}
            </p>
        </div>
    </div>
  );
}
