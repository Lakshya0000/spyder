"use client";

import MapContainer from "../components/MapContainer"
import Image from "next/image"
import Link from "next/link"
import { TotalRequests, TopCountries, RegionCount, StatsGrid } from "../components/StatsDisplay"
import { useState } from "react"
import OnboardingWizard from "@/components/onboarding/OnboardingWizard"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <main className="font-mono h-screen w-full relative overflow-hidden flex flex-col bg-blue-50">
      {/* Background Map & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MapContainer />
      </div>
      <div className="absolute inset-0 bg-blue-50/30 backdrop-blur-[2px] z-10 pointer-events-none"></div>

      {/* Onboarding Wizard Modal */}
      <OnboardingWizard isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col p-6 md:p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="flex-none mb-10 mt-2 pl-4 md:pl-12">
          <div className="w-full text-left max-w-3xl bg-blue-50/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight leading-none mb-2 opacity-90 flex items-center gap-3">
              <span className="font-[family-name:var(--font-almendra)]">Spyder</span>
              <Image 
                src="/image.png" 
                alt="Spyder Logo" 
                width={50} 
                height={50} 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-extrabold mb-6 tracking-tight">
              Azure AI-Powered Security
            </p>
            <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-8">
              Autonomous threat prevention with Azure Agent & OpenAI.
              <br className="hidden md:block"/> See, trace, and stop attacks across your entire web infrastructure—in real time.
            </p>

             {/* Moved Buttons Here */}
             <div className="flex flex-row gap-3 justify-start pointer-events-auto">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg text-base"
                >
                  Enter Platform
                </button>
                <button className="px-6 py-3 border-2 border-blue-800 text-blue-800 font-bold rounded-lg hover:bg-white/50 transition-colors text-base">
                  Explore Live Demo
                </button>
             </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 min-h-0 w-full pl-4 md:pl-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Analytics Stats */}
          <div className="lg:col-span-4 w-full flex flex-col justify-start h-full">
            <div className="w-full md:w-[480px] space-y-4 bg-blue-50/60 backdrop-blur-md p-5 rounded-xl border border-white/50 shadow-md pointer-events-auto">
              <div className="border-b border-gray-300 pb-2 mb-2">
                 <h2 className="text-lg font-extrabold text-black mb-0">Live Traffic</h2>
                 <p className="text-gray-800 font-medium text-xs">Global Network Activity</p>
              </div>
              <TotalRequests />
              
              <div className="pt-2 border-t border-gray-300">
                <h3 className="font-bold text-black text-xs uppercase mb-2">Top Protected Regions</h3>
                <TopCountries limit={5} />
              </div>

               <RegionCount />
            </div>
          </div>

          {/* Middle/Right Column: Security Features & Map Visual Space */}
          <div className="lg:col-span-8 w-full h-full flex flex-col">
             {/* Security Features Grid - Floating over map */}
             <div className="w-full pointer-events-auto">
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-3xl font-bold text-slate-900">AI Defense Grid</h2>
                   <div className="h-px flex-1 bg-gradient-to-r from-gray-900 to-transparent"></div>
                </div>
                <div className="bg-blue-50/50 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg">
                  <StatsGrid />
                </div>
             </div>
          </div>
        </div>

      </div>
    </main>
  )
}
