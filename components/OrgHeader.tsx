"use client";

import { OrgProfile } from "./data/profile-data";
import { Building2, Globe, Shield, Activity, Users } from "lucide-react";

interface OrgHeaderProps {
  profile: OrgProfile;
}

export default function OrgHeader({ profile }: OrgHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
             <Building2 size={120} />
         </div>

         <div className="flex justify-between items-start relative z-10">
             <div className="flex gap-4">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                     <Building2 size={32} />
                 </div>
                 <div>
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{profile.name}</h2>
                     <div className="flex items-center gap-3 text-sm text-slate-500">
                         <span className="flex items-center gap-1">
                             <Globe size={14} /> {profile.environment}
                         </span>
                         <span>•</span>
                         <span className="flex items-center gap-1">
                             <Activity size={14} /> Tier: {profile.tier}
                         </span>
                         <span>•</span>
                         <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                             {profile.id}
                         </span>
                     </div>
                 </div>
             </div>

             <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-slate-500 uppercase">Industry Risk Class</span>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                         profile.riskClass === 'High' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900' : 
                         profile.riskClass === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'
                     }`}>
                         {profile.riskClass}
                     </span>
                 </div>
                 
                 <div className="flex items-center -space-x-2">
                     {profile.contacts.map((contact, i) => (
                         <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 relative group cursor-pointer" title={`${contact.name} (${contact.role})`}>
                             {contact.name.charAt(0)}
                             <div className="absolute hidden group-hover:block bottom-full mb-2 right-0 w-max bg-slate-900 text-white text-xs p-2 rounded shadow-lg z-20">
                                 <div className="font-bold">{contact.name}</div>
                                 <div className="text-slate-400 text-[10px]">{contact.role}</div>
                             </div>
                         </div>
                     ))}
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-slate-400">
                         <Users size={14} />
                     </div>
                 </div>
             </div>
         </div>
    </div>
  );
}
