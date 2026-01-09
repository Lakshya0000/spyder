"use client";

import { TimelineNode } from "./data/incidents-data";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Server, Database, Code, ShieldCheck, ShieldAlert, Cpu } from "lucide-react";

interface AttackTimelineProps {
  nodes: TimelineNode[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

export default function AttackTimeline({ nodes, activeStep, onStepClick }: AttackTimelineProps) {
  
  const getIcon = (type: string) => {
      switch(type) {
          case 'request': return <Globe size={20} />;
          case 'gateway': return <Server size={20} />;
          case 'service': return <Cpu size={20} />;
          case 'database': return <Database size={20} />;
          case 'code': return <Code size={20} />;
          default: return <Globe size={20} />;
      }
  };

  const getNodeColor = (status: string, isActive: boolean) => {
      if (!isActive) return 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700';
      
      switch(status) {
          case 'normal': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
          case 'suspicious': return 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
          case 'compromised': return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
          default: return 'bg-slate-100';
      }
  };

  return (
    <div className="w-full flex items-center justify-between relative px-10 py-12 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0"></div>
        
        {/* Animated Progress Line */}
        <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-red-500/50 -z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: activeStep / (nodes.length - 1) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {nodes.map((node, index) => {
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;

            return (
                <div key={node.id} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => onStepClick(index)}>
                    {/* Node Circle */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isActive ? 1 : 0.9, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-sm ${getNodeColor(node.status, isActive)} ${isCurrent ? 'ring-4 ring-offset-2 ring-blue-100 dark:ring-blue-900/30' : ''}`}
                    >
                        {getIcon(node.type)}
                    </motion.div>

                    {/* Label */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="absolute top-16 w-32 text-center"
                    >
                        <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                            {node.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                            {node.timestamp}
                        </div>
                    </motion.div>

                    {/* Popup / Tooltip on Hover or Active */}
                    {isCurrent && (
                        <motion.div
                            layoutId="node-details"
                            className="absolute bottom-20 w-48 bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xl z-50"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{node.type} Details</div>
                            <div className="space-y-1.5">
                                {node.details.map((detail, i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-500">{detail.key}:</span>
                                        <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[100px]" title={detail.value}>{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            );
        })}
    </div>
  );
}
