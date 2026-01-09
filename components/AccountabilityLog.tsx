"use client";

import { ActivityLog } from "./data/profile-data";
import { CheckCircle2, XCircle, Clock, Shield } from "lucide-react";

interface AccountabilityLogProps {
  logs: ActivityLog[];
}

export default function AccountabilityLog({ logs }: AccountabilityLogProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Accountability Ledger</h3>
                <p className="text-xs text-slate-500">Audit trail of human and AI security decisions.</p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">Export CSV</button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                        <th className="px-6 py-3 font-bold text-slate-500 uppercase text-xs tracking-wider">Action</th>
                        <th className="px-6 py-3 font-bold text-slate-500 uppercase text-xs tracking-wider">Actor</th>
                        <th className="px-6 py-3 font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                        <th className="px-6 py-3 font-bold text-slate-500 uppercase text-xs tracking-wider">Time</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-800 dark:text-white">{log.action}</div>
                                <div className="text-xs text-slate-500">{log.details}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${log.role === 'AI Agent' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                                        {log.role === 'AI Agent' ? <Shield size={12} /> : log.actor.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-700 dark:text-slate-300">{log.actor}</div>
                                        <div className="text-[10px] text-slate-400">{log.role}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                                    log.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                    log.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                }`}>
                                    {log.status === 'approved' ? <CheckCircle2 size={12} /> : 
                                     log.status === 'rejected' ? <XCircle size={12} /> : 
                                     <Clock size={12} />}
                                    {log.status}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-mono text-slate-500">
                                {log.timestamp}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
