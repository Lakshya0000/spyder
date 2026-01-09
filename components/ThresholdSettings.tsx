"use client";

import { SettingsConfig } from "./data/settings-data";
import { Sliders, AlertTriangle, Fingerprint } from "lucide-react";
import { useState } from "react";

interface ThresholdSettingsProps {
  config: SettingsConfig['thresholds'];
}

export default function ThresholdSettings({ config }: ThresholdSettingsProps) {
  const [autoBlock, setAutoBlock] = useState(config.autoBlockScore);
  const [approval, setApproval] = useState(config.requireApprovalScore);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 flex items-center justify-center">
                <Sliders size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Risk Thresholds</h3>
                <p className="text-xs text-slate-500">Define confidence scores required for automated responses.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Auto-Block Threshold */}
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Auto-Block Confidence</label>
                    <span className="text-sm font-mono font-bold text-orange-600 dark:text-orange-400">{autoBlock}%</span>
                </div>
                <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={autoBlock} 
                    onChange={(e) => setAutoBlock(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-600 mb-2"
                />
                <p className="text-xs text-slate-500">
                    Threats with a risk score above this value are blocked immediately without waiting for human input.
                </p>
            </div>

            {/* Approval Threshold */}
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Human Approval Trigger</label>
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">{approval}%</span>
                </div>
                <input 
                    type="range" 
                    min="20" 
                    max="90" 
                    value={approval} 
                    onChange={(e) => setApproval(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                />
                <p className="text-xs text-slate-500">
                    Incidents scoring above this value (but below auto-block) will generate a "Pending Approval" alert.
                </p>
            </div>
        </div>
    </div>
  );
}
