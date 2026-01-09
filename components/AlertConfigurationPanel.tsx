"use client";

import { useState } from "react";
import { Bell, ShieldAlert, Mail, Slack, Smartphone, X } from "lucide-react";
import { motion } from "framer-motion";

interface AlertConfigurationPanelProps {
  onClose: () => void;
}

export default function AlertConfigurationPanel({ onClose }: AlertConfigurationPanelProps) {
  const [channels, setChannels] = useState({
    email: true,
    slack: true,
    sms: false
  });

  const [triggers, setTriggers] = useState({
    critical: true,
    high: true,
    medium: false,
    newExploit: true,
    anomaly: true
  });

  return (
    <motion.div 
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        className="w-80 h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xl z-30"
    >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell size={18} className="text-blue-500" />
                Alert Settings
            </h3>
            <button 
                onClick={onClose}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-all"
            >
                <X size={16} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
            
            {/* 1. Notification Channels */}
            <section>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Delivery Channels</h4>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">
                                <Mail size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Digest</span>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={channels.email}
                            onChange={(e) => setChannels({...channels, email: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-slate-100 dark:bg-slate-800 border-none" 
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-purple-600 dark:text-purple-400">
                                <Slack size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Slack Webhook</span>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={channels.slack}
                            onChange={(e) => setChannels({...channels, slack: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-slate-100 dark:bg-slate-800 border-none" 
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-600 dark:text-green-400">
                                <Smartphone size={16} />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">SMS (Critical Only)</span>
                        </div>
                        <input 
                            type="checkbox" 
                            checked={channels.sms}
                            onChange={(e) => setChannels({...channels, sms: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-slate-100 dark:bg-slate-800 border-none" 
                        />
                    </label>
                </div>
            </section>

            {/* 2. Triggers */}
            <section>
                <div className="flex items-center justify-between mb-4">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trigger Conditions</h4>
                     <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">Reset Defaults</span>
                </div>
               
                <div className="space-y-1">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Critical Severity CVEs</span>
                        <div 
                            className={`w-10 h-5 rounded-full flex items-center transition-colors px-1 cursor-pointer ${triggers.critical ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                            onClick={() => setTriggers({...triggers, critical: !triggers.critical})}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${triggers.critical ? 'translate-x-[18px]' : ''}`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">High Severity CVEs</span>
                        <div 
                             className={`w-10 h-5 rounded-full flex items-center transition-colors px-1 cursor-pointer ${triggers.high ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                             onClick={() => setTriggers({...triggers, high: !triggers.high})}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${triggers.high ? 'translate-x-[18px]' : ''}`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Medium / Low Severity</span>
                        <div 
                             className={`w-10 h-5 rounded-full flex items-center transition-colors px-1 cursor-pointer ${triggers.medium ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                             onClick={() => setTriggers({...triggers, medium: !triggers.medium})}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${triggers.medium ? 'translate-x-[18px]' : ''}`} />
                        </div>
                    </div>
                    
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>

                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 dark:text-slate-400">New Public Exploit</span>
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] rounded font-bold uppercase">Urgent</span>
                        </div>
                        <div 
                             className={`w-10 h-5 rounded-full flex items-center transition-colors px-1 cursor-pointer ${triggers.newExploit ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                             onClick={() => setTriggers({...triggers, newExploit: !triggers.newExploit})}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${triggers.newExploit ? 'translate-x-[18px]' : ''}`} />
                        </div>
                    </div>
                     <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">AI Anomaly Detection</span>
                        <div 
                             className={`w-10 h-5 rounded-full flex items-center transition-colors px-1 cursor-pointer ${triggers.anomaly ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                             onClick={() => setTriggers({...triggers, anomaly: !triggers.anomaly})}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${triggers.anomaly ? 'translate-x-[18px]' : ''}`} />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm text-sm">
                Save Preferences
            </button>
        </div>
    </motion.div>
  );
}
