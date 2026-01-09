"use client";

import { motion } from "framer-motion";
import { EvolutionStage } from "./data/firewall-data";
import { Clock, CheckCircle2 } from "lucide-react";

interface NarrativeTimelineProps {
  stages: EvolutionStage[];
  currentIndex: number;
  onSetIndex: (index: number) => void;
}

export default function NarrativeTimeline({ stages, currentIndex, onSetIndex }: NarrativeTimelineProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sticky bottom-0 z-30 shadow-xl">
         {/* Narrative Header */}
         <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                      <Clock size={18} />
                  </div>
                  <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Attack Progression Timeline
                      </h4>
                      <p className="text-xs text-slate-500">
                          Interactive simulation of AI defense evolution
                      </p>
                  </div>
              </div>
              
              <div className="text-right">
                   <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Current State</div>
                   <div className="text-sm font-bold text-slate-900 dark:text-white">
                       {stages[currentIndex].label}
                   </div>
              </div>
         </div>

         {/* Timeline Bar */}
         <div className="relative h-16 flex items-center px-4">
             {/* Base Track */}
             <div className="absolute left-4 right-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
             
             {/* Progress Fill */}
             <motion.div 
                className="absolute left-4 h-1 bg-blue-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 50 }}
             />

             {/* Steps */}
             <div className="absolute inset-0 flex justify-between items-center">
                 {stages.map((stage, index) => {
                     const isPast = index < currentIndex;
                     const isCurrent = index === currentIndex;
                     
                     return (
                         <button 
                            key={stage.id}
                            onClick={() => onSetIndex(index)}
                            className="relative group flex flex-col items-center focus:outline-none"
                            style={{ width: '80px' }} // Fixed width for alignment
                         >
                             {/* Node */}
                             <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-300 z-10 
                                ${isCurrent 
                                    ? 'bg-blue-500 border-white dark:border-slate-900 shadow-lg scale-110' 
                                    : isPast 
                                        ? 'bg-blue-500 border-white dark:border-slate-900' 
                                        : 'bg-slate-200 dark:bg-slate-800 border-white dark:border-slate-900'
                                }`}
                             >
                                 {isPast ? (
                                    <CheckCircle2 size={14} className="text-white" />
                                 ) : (
                                    <span className={`text-[10px] font-bold ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                                        {stage.id}
                                    </span>
                                 )}
                             </div>

                             {/* Labels */}
                             <div className={`absolute top-10 flex flex-col items-center w-32 transition-all duration-300 ${isCurrent ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-1'}`}>
                                 <span className={`text-[10px] font-bold uppercase tracking-wide mb-0.5 ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                                     {stage.label}
                                 </span>
                             </div>
                         </button>
                     );
                 })}
             </div>
         </div>
    </div>
  );
}
