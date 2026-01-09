"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  ArrowLeft,
  SquaresFour,
  Gear,
  User,
  Bell,
  Globe,
  Bug,
  Warning,
  Code,
  ShieldCheck,
  ClipboardText,
} from "@phosphor-icons/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Image from "next/image";

const NavigationRail = () => {
 
    return (
    <div className="h-full w-14 md:w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 justify-between z-50 flex-shrink-0">
      <div className="flex flex-col items-center gap-4">
        <Link href="/home" className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
           DM
        </Link>
        <div className="h-px w-8 bg-slate-700" />
      </div>

       <div className="flex flex-col items-center gap-4 text-slate-400">
         <Link href="/notifications" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group relative">
             <Bell className="h-5 w-5 group-hover:text-white" weight="duotone" />
         </Link>
         <Link href="/settings" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group">
             <Gear className="h-5 w-5 group-hover:text-white" weight="duotone" />
         </Link>
         <Link href="/profile" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group">
             <div className="h-6 w-6 rounded-full bg-slate-700 overflow-hidden border border-slate-600 flex items-center justify-center">
                <User className="h-4 w-4 text-slate-300" weight="duotone" />
             </div>
         </Link>
         <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition-colors group mt-2">
             <ArrowLeft className="h-5 w-5 group-hover:text-red-400" weight="bold" />
         </Link>
       </div>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-slate-100 dark:bg-slate-900 w-full flex-1 mx-auto border border-slate-200 dark:border-slate-800 overflow-hidden",
        "h-screen" 
      )}
    >
      <NavigationRail />
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 mb-2">
                  {open ? "Security Overview" : "..."}
              </div>
              <SidebarLink
                link={{
                  label: "Overview",
                  href: "/home",
                  icon: (
                    <SquaresFour className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
              <SidebarLink
                link={{
                  label: "Attack Surface",
                  href: "/attack-surface",
                  icon: (
                    <Globe className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
              <SidebarLink
                link={{
                  label: "Vulnerabilities",
                  href: "/vulnerabilities",
                  icon: (
                    <Bug className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
              <SidebarLink
                link={{
                  label: "Incidents",
                  href: "/incidents",
                  icon: (
                    <Warning className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
              <SidebarLink
                link={{
                  label: "Code Security",
                  href: "/code-security",
                  icon: (
                    <Code className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
              <SidebarLink
                link={{
                  label: "Firewall",
                  href: "/firewall",
                  icon: (
                    <ShieldCheck className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
               <SidebarLink
                link={{
                  label: "Audits",
                  href: "/audits",
                  icon: (
                    <ClipboardText className="h-5 w-5 shrink-0 text-slate-700 dark:text-slate-300" weight="duotone" />
                  ),
                }}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 w-full h-full overflow-y-auto no-scrollbar bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
          {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/home"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/image.png"
        className="h-6 w-6 shrink-0 rounded-none object-contain"
        width={50}
        height={50}
        alt="Spyder"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Spyder
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/home"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/image.png"
        className="h-6 w-6 shrink-0 rounded-none object-contain"
        width={50}
        height={50}
        alt="Spyder"
      />
    </Link>
  );
};
