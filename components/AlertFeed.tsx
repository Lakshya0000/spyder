"use client";

import { useState } from "react";
import { Alert, AlertType } from "./data/notifications-data";
import AlertCard from "./AlertCard";
import { Filter, Search } from "lucide-react";

interface AlertFeedProps {
  alerts: Alert[];
}

export default function AlertFeed({ alerts }: AlertFeedProps) {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter);

  return (
    <div className="flex flex-col h-full">
         {/* Toolbar */}
         <div className="flex justify-between items-center mb-6">
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                 {(['all', 'phishing', 'incident', 'change'] as const).map((type) => (
                     <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-md text-base font-semibold capitalize transition-all ${
  filter === type 
    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
}`}

                     >
                         {type}
                     </button>
                 ))}
             </div>

             <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search alerts..."
                    className="pl-9 pr-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-64"
                 />
             </div>
         </div>

         {/* Feed */}
         <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
             {filteredAlerts.length > 0 ? (
                 filteredAlerts.map((alert) => (
                     <AlertCard key={alert.id} alert={alert} />
                 ))
             ) : (
                 <div className="text-center py-12 text-slate-400">
                     No alerts found for this filter.
                 </div>
             )}
         </div>
    </div>
  );
}
