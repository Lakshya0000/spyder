"use client";

import { History } from "lucide-react";

export default function PolicyTimeline() {
  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col">
       <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <History size={14} className="text-slate-400" />
                Policy Evolution
            </h3>
             <div className="flex gap-2 text-[10px] text-slate-400">
                 <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Auto-Generated</span>
                 <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Manual</span>
             </div>
       </div>
       
       <div className="flex-1 w-full relative overflow-hidden">
           {/* Simple CSS-based Area Chart Mock */}
           <div className="absolute inset-x-0 bottom-0 top-4 flex items-end justify-between px-2 gap-1">
               {[40, 60, 45, 70, 85, 60, 75, 90, 80, 65, 85, 95].map((h, i) => (
                   <div key={i} className="group relative w-full h-full flex flex-col justify-end">
                       <div 
                         style={{ height: `${h}%` }} 
                         className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-sm group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-all relative overflow-hidden"
                        >
                            <div style={{ height: `${h * 0.4}%` }} className="absolute bottom-0 w-full bg-purple-500/20"></div>
                        </div>
                   </div>
               ))}
           </div>
           
           {/* Overlay Line */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
               <path d="M0,80 C50,60 100,90 150,50 C200,10 250,50 300,30 C350,10 400,40 500,20 L500,150 L0,150 Z" fill="none" stroke="none" />
           </svg>
       </div>
    </div>
  );
}
