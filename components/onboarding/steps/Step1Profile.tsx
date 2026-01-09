"use client";

import { motion } from "framer-motion";
import { Building2, Server, Code2, Database, ShieldAlert } from "lucide-react";

interface Step1Props {
  data: any;
  updateData: (data: any) => void;
}

export default function Step1Profile({ data, updateData }: Step1Props) {
  const techOptions = ["Node.js", "Python", "Go", "Rust", "Java", "Next.js", "React", "Vue", "PostgreSQL", "Redis"];
  const cloudOptions = ["AWS", "GCP", "Azure", "DigitalOcean", "Kubernetes", "Docker", "Vercel", "Netlify"];

  const toggleSelection = (field: string, value: string) => {
    const current = data[field] || [];
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    updateData({ [field]: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Profile</h2>
        <p className="text-slate-500 dark:text-slate-400">Define your technology stack to configure accurate security rules.</p>
      </div>

      <div className="space-y-6">
        
        {/* Core Info */}
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                   <Building2 size={16} /> Organization Name
                </label>
                <input
                    type="text"
                    value={data.companyName || ""}
                    onChange={(e) => updateData({ companyName: e.target.value })}
                    placeholder="Acme Inc."
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                   <ShieldAlert size={16} /> CISO / Tech Lead
                </label>
                <input
                    type="text"
                    value={data.cisoName || ""}
                    onChange={(e) => updateData({ cisoName: e.target.value })}
                    placeholder="Approver Name"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
             </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Code2 size={16} /> Core Technology Stack
           </label>
           <div className="flex flex-wrap gap-2">
              {techOptions.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleSelection('techStack', tech)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                        data.techStack?.includes(tech) 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {tech}
                  </button>
              ))}
           </div>
        </div>

        {/* Cloud Infrastructure */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Server size={16} /> Cloud & Infrastructure
           </label>
           <div className="flex flex-wrap gap-2">
              {cloudOptions.map(cloud => (
                  <button
                    key={cloud}
                    onClick={() => toggleSelection('cloudProvider', cloud)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                        data.cloudProvider?.includes(cloud) 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {cloud}
                  </button>
              ))}
           </div>
        </div>

        {/* Critical Assets */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Database size={16} /> Critical Assets Definition
            </label>
            <textarea
                value={data.criticalAssets || ""}
                onChange={(e) => updateData({ criticalAssets: e.target.value })}
                placeholder="Describe your most critical systems (e.g., 'Payment Gateway handling PII', 'User Database')..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none h-24 text-sm"
            />
        </div>

        {/* Compliance */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Required Compliance
            </label>
            <div className="grid grid-cols-3 gap-2">
                {['SOC2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI-DSS'].map((frame) => (
                    <label key={frame} className="flex items-center gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                        <input 
                            type="checkbox"
                            checked={data.compliance?.includes(frame) || false}
                            onChange={() => toggleSelection('compliance', frame)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{frame}</span>
                    </label>
                ))}
            </div>
        </div>

      </div>
    </motion.div>
  );
}
