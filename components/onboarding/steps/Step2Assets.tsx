"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShieldCheck, AlertTriangle, Loader2, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface Step2Props {
  data: any;
  updateData: (data: any) => void;
}

export default function Step2Assets({ data, updateData }: Step2Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startScan = () => {
    if (!data.primaryDomain) return;
    setIsScanning(true);
    setLogs([]);
    
    // Define steps with variable delays for realism
    const steps = [
        { msg: `Initializing discovery for ${data.primaryDomain}...`, delay: 500 },
        { msg: "Querying Wayback Machine (Web Archive)...", delay: 1500 },
        { msg: "Found 142 historical snapshots...", delay: 2500 },
        { msg: "Extracting sitemap.xml structure...", delay: 1000 },
        { msg: "Identifying exposed subdomains...", delay: 2000 },
        { msg: "Analysis complete. 42 assets mapped.", delay: 800 }
    ];

    let currentStep = 0;

    const runStep = () => {
        if (currentStep >= steps.length) {
            setIsScanning(false);
            setScanComplete(true);
            return;
        }

        const step = steps[currentStep];
        setLogs(prev => [...prev, step.msg]);
        currentStep++;

        // Schedule next step based on THIS step's delay (simulating processing time)
        // If there is a next step, wait for its delay. For the last step, wait just a bit before finishing.
        const nextDelay = currentStep < steps.length ? steps[currentStep].delay : 1000;
        setTimeout(runStep, nextDelay);
    };

    // Start the first step after its initial delay
    setTimeout(runStep, steps[0].delay);
  };

  // Auto-start scan if domain was already present (e.g. back navigation)
  useEffect(() => {
      if (data.primaryDomain && !scanComplete && !isScanning && data.primaryDomain.includes('.')) {
         // Optional: Auto-trigger or wait for user? 
         // Let's require a click for effect, or auto-trigger if they pause typing.
      }
  }, [data.primaryDomain]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Attack Surface Discovery</h2>
        <p className="text-slate-500 dark:text-slate-400">Enter your primary domain. We will automatically map your external assets.</p>
      </div>

      <div className="space-y-6">
        {/* Primary Domain */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Globe size={16} />
            Primary Domain
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
                <input
                type="text"
                value={data.primaryDomain || ""}
                onChange={(e) => {
                    updateData({ primaryDomain: e.target.value });
                    setScanComplete(false); // Reset on change
                }}
                placeholder="company.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                />
                <div className="absolute left-3 top-3.5 text-slate-400">
                    <Globe size={18} />
                </div>
            </div>
            <button
                onClick={startScan}
                disabled={!data.primaryDomain || isScanning || scanComplete}
                className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg disabled:opacity-50 hover:bg-slate-800 transition-colors"
            >
                {isScanning ? <Loader2 size={18} className="animate-spin" /> : "Scan"}
            </button>
          </div>
          <p className="text-xs text-slate-500 ml-1">Do not include https:// or www.</p>
        </div>

        {/* Console / Scan Output */}
        <AnimatePresence>
            {(isScanning || scanComplete) && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 font-mono text-xs"
                >
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-slate-400">
                        <Terminal size={14} />
                        <span>Security Scanner</span>
                    </div>
                    <div className="p-4 space-y-1.5 text-green-400 min-h-[160px]">
                        {logs.map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {log}
                            </motion.div>
                        ))}
                        {isScanning && (
                            <motion.div 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Success Card */}
        {scanComplete && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30"
            >
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-sm mb-2">
                    <ShieldCheck size={16} />
                    Asset Mapping Complete
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    We successfully mapped the external attack surface for <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{data.primaryDomain}</span>.
                </p>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
}
