"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImpactCard } from "./data/firewall-data";
import { Zap, Target, ArrowUpRight, Shield } from "lucide-react";

interface ImpactFeedProps {
  cards: ImpactCard[];
}

export default function ImpactFeed({ cards }: ImpactFeedProps) {
  
  const getTypeColor = (type: string) => {
      switch(type) {
          case 'Analysis': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
          case 'Defense': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
          case 'Evolution': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
          default: return 'text-slate-500 bg-slate-100 dark:bg-slate-800';
      }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mt-8">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center shrink-0">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Target size={16} className="text-red-500" />
                 Impact Analysis
             </h3>
             <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Live</span>
             </div>
        </div>

        {/* Feed */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3 bg-slate-50/50 dark:bg-slate-950/30">
            <AnimatePresence mode='popLayout'>
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getTypeColor(card.type)}`}>
                                 {card.type}
                             </span>
                             <span className="text-[10px] font-mono text-slate-400">{card.timestamp}</span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                            {card.title}
                        </h4>
                        
                        <div className="flex items-center justify-between mt-2">
                             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                 <Shield size={12} />
                                 <span>Scope: <strong className="text-slate-700 dark:text-slate-300">{card.scope}</strong></span>
                             </div>
                             
                             {card.confidenceGain > 0 && (
                                 <div className="flex items-center gap-1">
                                      <ArrowUpRight size={12} className="text-green-500" />
                                      <span className="text-xs font-bold text-green-600 dark:text-green-400">
                                          +{card.confidenceGain}%
                                      </span>
                                 </div>
                             )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {cards.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs italic">
                    Waiting for threat data...
                </div>
            )}
        </div>
    </div>
  );
}
