"use client";

import { motion } from "framer-motion";
import { EvolutionStage, IntelligenceLayer } from "./data/firewall-data";
import { Radio, Scan, Share2, ShieldCheck, Zap } from "lucide-react";

interface IntelligenceStackProps {
  stage: EvolutionStage;
}

export default function IntelligenceStack({ stage }: IntelligenceStackProps) {
  
  const getIcon = (id: string) => {
    switch(id) {
      case 'signal': return <Radio size={18} />;
      case 'feature': return <Scan size={18} />;
      case 'correlation': return <Share2 size={18} />;
      case 'policy': return <ShieldCheck size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-purple-50/20 dark:bg-purple-900/10 flex justify-between items-center shrink-0">
             <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Zap size={16} className="text-purple-500" />
                 Layered Intelligence Stack
             </h3>
             <div className="flex items-center gap-2">
                 <span className="text-[10px] text-slate-400 uppercase tracking-wider">Status</span>
                 <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stage.isThreatNeutralized ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                     {stage.isThreatNeutralized ? 'IMMUNE' : 'ACTIVE'}
                 </span>
             </div>
        </div>

        {/* Stack Layers */}
        <div className="flex-1 p-4 flex flex-col gap-3 relative">


             {stage.layers.map((layer, index) => {
                 const isActive = layer.status === 'active' || layer.status === 'learning' || layer.status === 'locked';
                 const isLearning = layer.status === 'learning';
                 
                 return (
                     <LayoutLayer 
                        key={layer.id} 
                        layer={layer} 
                        index={index} 
                        isActive={isActive}
                        isLearning={isLearning}
                        icon={getIcon(layer.id)}
                     />
                 );
             })}
        </div>
    </div>
  );
}

function LayoutLayer({ layer, index, isActive, isLearning, icon }: { layer: IntelligenceLayer, index: number, isActive: boolean, isLearning: boolean, icon: React.ReactNode }) {
    return (
        <div className={`flex-1 relative rounded-lg border flex items-center px-4 gap-4 transition-all duration-500 ${
            isActive 
            ? 'bg-slate-50 dark:bg-slate-800/50 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.05)]' 
            : 'bg-transparent border-slate-200 dark:border-slate-800 opacity-50'
        }`}>
            {/* Connector Line */}
            {index < 3 && (
                <div className={`absolute left-8 bottom-[-14px] w-0.5 h-[14px] z-10 ${isActive ? 'bg-purple-500/30' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            )}

            {/* Icon Box */}
            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                isActive ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <span className={`text-sm font-bold ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500'}`}>
                        {layer.label}
                    </span>
                    {layer.activity && isActive && (
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 px-1.5 py-0.5 rounded"
                        >
                            {layer.activity}
                        </motion.span>
                    )}
                </div>
                <div className="text-xs text-slate-500 truncate">{layer.description}</div>
            </div>

            {/* Processing Indicator */}
            {isLearning && (
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500 animate-pulse rounded-r-lg"></div>
            )}
        </div>
    );
}
