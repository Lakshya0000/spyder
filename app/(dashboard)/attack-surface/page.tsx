"use client";

import { useState } from 'react';
import { mockASMData } from '../../../components/data/attack-surface-data';
import AssetList from '@/components/AssetList';
import AttackSurfaceGraph from '@/components/AttackSurfaceGraph';
import AssetDetails from '@/components/AssetDetails';
import { Search, Info, LayoutTemplate, PanelLeftClose, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttackSurface() {
  // Default to api.company.com (sub-1)
  const initialNode = mockASMData.subdomains.find(s => s.id === 'sub-1');
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>('sub-1');
  const [selectedNode, setSelectedNode] = useState<any>(initialNode ? { ...initialNode, group: 'subdomain' } : null);
  
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [timeline, setTimeline] = useState('all');

  const [searchQuery, setSearchQuery] = useState('');

  // Smart Filtering to preserve hierarchy
  const q = searchQuery.toLowerCase();
  
  // 1. Find matching sub-items first
  const matchingServices = mockASMData.services.filter(s => s.name.toLowerCase().includes(q));
  const matchingPorts = mockASMData.ports.filter(p => 
    p.port.toString().includes(q) || 
    p.protocol.toLowerCase().includes(q) || 
    matchingServices.some(s => s.port_id === p.id)
  );
  const matchingSubdomains = mockASMData.subdomains.filter(s => 
    s.name.toLowerCase().includes(q) || 
    matchingPorts.some(p => p.subdomain_id === s.id)
  );
  const matchingDomains = mockASMData.domains.filter(d => 
    d.name.toLowerCase().includes(q) || 
    matchingSubdomains.some(s => s.domain_id === d.id)
  );

  const filteredData = {
    ...mockASMData,
    domains: matchingDomains,
    subdomains: matchingSubdomains,
    ports: matchingPorts,
    services: matchingServices
  };

  // If search is active, we might want to pass all matching nodes. 
  // For Graph, let's keep it simple: pass filtered data or just highlight? 
  // Let's pass filtered data to AssetList, but keep Graph full or full context?
  // User asked for "search assets functional". Usually means the list filters.
  
  const handleSelect = (id: string, type: string) => {
    setSelectedNodeId(id);
    
    // Find the node object from data (using full data to ensure lookup works even if hidden from list?)
    // Actually if it's not in the list, we can't click it? 
    // Let's stick to full data lookup.
    let node = null;
    if (type === 'domain') node = mockASMData.domains.find(d => d.id === id);
    else if (type === 'subdomain') node = mockASMData.subdomains.find(s => s.id === id);
    else if (type === 'port') node = mockASMData.ports.find(p => p.id === id);
    else if (type === 'service') node = mockASMData.services.find(s => s.id === id);
    
    if (node) setSelectedNode({ ...node, group: type }); 
    else if (!id) setSelectedNode(null); 
  };

  const handleGraphClick = (node: any) => {
    if (node) {
        setSelectedNodeId(node.id);
        setSelectedNode(node);
        if (!showRightPanel) setShowRightPanel(true);
    } else {
        setSelectedNodeId(undefined);
        setSelectedNode(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-black text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 bg-white dark:bg-slate-950 shadow-sm z-20 shrink-0 gap-4">
        <div className="flex items-center gap-3">
            {!showLeftPanel && (
                <button 
                    onClick={() => setShowLeftPanel(true)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    title="Show Inventory"
                >
                    <LayoutTemplate className="w-5 h-5" />
                </button>
            )}
            <h1 className="text-xl font-bold flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                <span className="w-2.5 h-7 bg-blue-600 rounded-sm shadow-blue-500/20 shadow-lg"></span>
                Attack Surface
            </h1>
        </div>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 font-medium">Context:</span>
            <span className="font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-md flex items-center gap-2 text-slate-700 dark:text-slate-300">
                {mockASMData.metadata.organization}
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded ml-1">{mockASMData.metadata.environment}</span>
            </span>
        </div>

        <div className="ml-auto flex items-center gap-4">
             <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search visible assets..." 
                    className="h-10 pl-10 pr-32 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-96 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
                 {/* Active Tab Badge inside search */}
                <div className="absolute inset-y-0 right-1.5 flex items-center">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 uppercase tracking-widest">
                        Attack Surface
                    </span>
                </div>
             </div>
             
             <div className="flex items-center gap-3 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 bg-slate-50 dark:bg-slate-900 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 px-2 uppercase tracking-wide">Risk Score</div>
                <div className="text-lg font-black text-white bg-red-600 px-3 py-0.5 rounded-lg shadow-red-600/20 shadow-md">
                    {mockASMData.metadata.risk_score}
                </div>
             </div>

             {!showRightPanel && (
                <button 
                    onClick={() => setShowRightPanel(true)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm"
                    title="Show Details Panel"
                >
                    <PanelRightOpen className="w-5 h-5" />
                </button>
             )}
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Asset Inventory (20%) */}
        <AnimatePresence mode="wait">
            {showLeftPanel && (
                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "18rem", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative group z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
                >
                    <div className="w-72 h-full flex flex-col"> 
                        <AssetList 
                            data={filteredData}  // Use filtered data
                            onSelect={handleSelect} 
                            selectedId={selectedNodeId} 
                        />
                         <button 
                            onClick={() => setShowLeftPanel(false)}
                            className="absolute top-3 right-3 p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Collapse"
                         >
                             <PanelLeftClose className="w-4 h-4" />
                         </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Center Pane: Graph */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950/50 p-6 relative min-w-0">
            <AttackSurfaceGraph 
                data={mockASMData} // Graph can show full context, or we can filter it too. Let's keep graph full for context.
                onNodeClick={handleGraphClick}
                selectedNodeId={selectedNodeId}
                timeline={timeline}
            />
            
            {/* Overlay Title */}
            <div className="absolute top-6 left-6 pointer-events-none opacity-50">
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500">Visualization</h2>
                <div className="text-sm font-semibold">Network Graph</div>
            </div>
        </div>

        {/* Right Pane: Asset Details (25%) */}
        <AnimatePresence mode="wait">
            {showRightPanel && (
                <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "20rem", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-10 relative group overflow-hidden"
                >
                    <div className="w-80 h-full"> {/* Inner fixed width */}
                        <AssetDetails node={selectedNode} />
                        <button 
                            onClick={() => setShowRightPanel(false)}
                            className="absolute top-2 right-2 p-1 bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            title="Collapse"
                         >
                             <PanelRightClose className="w-4 h-4" />
                         </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      {/* Bottom Bar */}
      <div className="h-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center px-4 text-xs text-slate-500 justify-between shrink-0">
          <div className="flex gap-4 items-center">
              <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">Filters: All Attributes</span>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Time Range:</span>
                  <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-0.5">
                      <button 
                        onClick={() => setTimeline('all')}
                        className={`px-2 py-0.5 rounded text-[10px] transition-colors ${timeline === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'hover:text-slate-900 dark:hover:text-slate-300'}`}
                      >
                        All History
                      </button>
                      <button 
                        onClick={() => setTimeline('7d')}
                        className={`px-2 py-0.5 rounded text-[10px] transition-colors ${timeline === '7d' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'hover:text-slate-900 dark:hover:text-slate-300'}`}
                      >
                        Last 7d
                      </button>
                      <button 
                        onClick={() => setTimeline('24h')}
                        className={`px-2 py-0.5 rounded text-[10px] transition-colors ${timeline === '24h' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'hover:text-slate-900 dark:hover:text-slate-300'}`}
                      >
                        Last 24h
                      </button>
                  </div>
              </div>
          </div>
          <div className="flex items-center gap-1">
              <Info size={12} />
              <span>Data updated 5 mins ago</span>
          </div>
      </div>
    </div>
  );
}
