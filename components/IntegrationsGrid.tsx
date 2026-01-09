"use client";

import { SettingsConfig } from "./data/settings-data";
import { Github, Slack, Cloud, Trello, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface IntegrationsGridProps {
  integrations: SettingsConfig['integrations'];
}

export default function IntegrationsGrid({ integrations }: IntegrationsGridProps) {
  
  const getIcon = (iconName: string) => {
      switch(iconName) {
          case 'Github': return <Github size={24} />;
          case 'Slack': return <Slack size={24} />;
          case 'Cloud': return <Cloud size={24} />;
          case 'Trello': return <Trello size={24} />;
          default: return <RefreshCw size={24} />;
      }
  };

  return (
    <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Connected Ecosystem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {integrations.map((integration) => (
                <div key={integration.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                                    integration.connected 
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                                }`}>
                                    {getIcon(integration.icon)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{integration.name}</h4>
                                    <span className={`text-[10px] font-bold uppercase flex items-center gap-1 ${
                                        integration.connected ? 'text-green-600 dark:text-green-400' : 'text-slate-400'
                                    }`}>
                                        {integration.connected ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                        {integration.connected ? 'Active' : 'Disconnected'}
                                    </span>
                                </div>
                            </div>
                            
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={integration.connected} readOnly />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <p className="text-xs text-slate-500 mb-4 h-8">
                            {integration.description}
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Permissions</span>
                        <div className="flex flex-wrap gap-1.5">
                            {integration.permissions.map((perm, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] font-mono text-slate-600 dark:text-slate-300">
                                    {perm}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
