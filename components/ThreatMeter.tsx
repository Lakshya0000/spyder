"use client";

import { motion } from "framer-motion";

interface ThreatMeterProps {
  score: number; // 0-100
  level: string;
  confidence: string;
  label?: string;
}

export default function ThreatMeter({ score, level, confidence, label }: ThreatMeterProps) {
  // SVG Parameters
  const radius = 80;
  const stroke = 12;
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = radius * Math.PI; // Semi-circle
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Color gradient logic based on score
  const getColor = (s: number) => {
    if (s < 25) return "#22c55e"; // Green
    if (s < 50) return "#eab308"; // Yellow
    if (s < 75) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };
  
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Threat Probability Meter</h3>
      
      <div className="relative w-48 h-28 flex items-end justify-center overflow-hidden">
        <svg className="w-48 h-48 absolute top-0 transform rotate-180" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
              className="text-slate-100 dark:text-slate-800"
              strokeDasharray={circumference}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
            {/* Progress Arc */}
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={circumference} // Start empty
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
        </svg>
        
        {/* Score Text */}
        <div className="flex flex-col items-center justify-end z-10 mb-2">
             <div className="text-4xl font-bold text-slate-900 dark:text-white flex items-start">
                {score}
                <span className="text-lg text-slate-400 font-normal ml-0.5">%</span>
             </div>
             <div className={`text-sm font-medium px-2 py-0.5 rounded-full mt-1 bg-opacity-10`} style={{ backgroundColor: color + '20', color: color }}>
                {level} Risk
             </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center text-center space-y-1">
          <div className="text-xs text-slate-400">AI Confidence Level</div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{confidence}</div>
          
          {label && (
              <div className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
                  {label}
              </div>
          )}
      </div>
    </div>
  );
}
