"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ASMData, GraphEdge } from '../data';
import { useTheme } from 'next-themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface AttackSurfaceGraphProps {
  data: ASMData;
  onNodeClick: (node: any) => void;
  selectedNodeId?: string;
}

export default function AttackSurfaceGraph({ data, onNodeClick, selectedNodeId, timeline = 'all' }: AttackSurfaceGraphProps & { timeline?: string }) {
  const fgRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // 1. Filter Nodes based on Timeline
    const now = new Date();
    const isNodeVisible = (node: any) => {
        if (timeline === 'all') return true;
        if (!node.discovered_at) return true; // Show visible if no date
        const date = new Date(node.discovered_at);
        const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        if (timeline === '24h') return hoursDiff <= 48; // Relaxed for demo (mock data is static)
        if (timeline === '7d') return hoursDiff <= 24 * 7;
        return true;
    };

    // Transform ASMData into graph format
    const allNodes = [
      ...data.domains.map(d => ({ ...d, group: 'domain', val: 20 })),
      ...data.subdomains.map(s => ({ ...s, group: 'subdomain', val: 15 })),
      ...data.ports.map(p => ({ ...p, group: 'port', val: 8, name: `${p.port}/${p.protocol}` })),
      ...data.services.map(s => ({ ...s, group: 'service', val: 12 }))
    ];

    const visibleNodes = allNodes.filter(isNodeVisible);
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // Create a map for quick lookup
    const nodeMap = new Map(visibleNodes.map(n => [n.id, n]));
    
    // Process links to ensure source/target exist and are visible
    const links = data.relationships.edges
      .filter(e => visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to))
      .map(e => ({ source: e.from, target: e.to }));

    setGraphData({ nodes: visibleNodes, links });
  }, [data, timeline]);

  // Adjust camera to fit
  // Adjust camera to fit or focus on selected node
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      fgRef.current.d3Force('charge').strength(-400); 
      setTimeout(() => {
          if (!fgRef.current) return;
          
          const targetNode = selectedNodeId ? graphData.nodes.find(n => n.id === selectedNodeId) : null;
          if (targetNode && targetNode.x !== undefined && targetNode.y !== undefined) {
              fgRef.current.centerAt(targetNode.x, targetNode.y, 1000);
              fgRef.current.zoom(8, 1000);
          } else {
              fgRef.current.zoomToFit(400, 50);
          }
      }, 500);
    }
  }, [graphData.nodes.length, selectedNodeId]); // Add selectedNodeId to allow re-focusing when selection changes externally or initially

  // Update highlighted nodes when selectedNodeId changes
  useEffect(() => {
      if (!selectedNodeId) {
          setHighlightedIds(new Set());
          return;
      }

      // Find all connected nodes (Parents and Children)
      const connected = new Set<string>();
      connected.add(selectedNodeId);

      // Build Adjacency List for traversal
      const parentMap = new Map<string, string[]>(); // child -> parents
      const childMap = new Map<string, string[]>(); // parent -> children
      
      data.relationships.edges.forEach(edge => {
          if (!childMap.has(edge.from)) childMap.set(edge.from, []);
          childMap.get(edge.from)?.push(edge.to);

          if (!parentMap.has(edge.to)) parentMap.set(edge.to, []);
          parentMap.get(edge.to)?.push(edge.from);
      });

      // Traverse Up (Parents)
      const queueUp = [selectedNodeId];
      while (queueUp.length > 0) {
          const curr = queueUp.shift()!;
          const parents = parentMap.get(curr) || [];
          parents.forEach(p => {
              if (!connected.has(p)) {
                  connected.add(p);
                  queueUp.push(p);
              }
          });
      }

      // Traverse Down (Children)
      const queueDown = [selectedNodeId];
      while (queueDown.length > 0) {
          const curr = queueDown.shift()!;
          const children = childMap.get(curr) || [];
          children.forEach(c => {
              if (!connected.has(c)) {
                  connected.add(c);
                  queueDown.push(c);
              }
          });
      }
    
      setHighlightedIds(connected);

  }, [selectedNodeId, data]);


  const getNodeColor = (node: any) => {
    // Dimming logic handled in canvasObject, here return base color
    switch (node.group) {
        case 'domain': return '#3b82f6'; 
        case 'subdomain': return '#14b8a6'; 
        case 'port': return '#f97316'; 
        case 'service': return '#a855f7'; 
        default: return '#9ca3af';
    }
  };

  const getRiskColor = (risk: string) => {
      switch(risk) {
          case 'high': return '#ef4444'; 
          case 'medium': return '#eab308'; 
          case 'low': return '#22c55e'; 
          default: return '#9ca3af';
      }
  };

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden relative">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkColor={() => isDark ? '#475569' : '#cbd5e1'}
        linkWidth={(link: any) => {
             if (highlightedIds.size > 0) {
                 const isSourceHighlighted = highlightedIds.has(typeof link.source === 'object' ? link.source.id : link.source);
                 const isTargetHighlighted = highlightedIds.has(typeof link.target === 'object' ? link.target.id : link.target);
                 return (isSourceHighlighted && isTargetHighlighted) ? 3 : 1;
             }
             return 2;
        }}
        linkDirectionalParticles={highlightedIds.size > 0 ? 2 : 0}
        linkDirectionalParticleWidth={2}
        backgroundColor={isDark ? '#0f172a' : '#f8fafc'}
        onNodeClick={(node) => {
            onNodeClick(node);
            fgRef.current?.centerAt(node.x, node.y, 1000);
            fgRef.current?.zoom(4, 1000);
        }}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          
          // Dimming Logic
          const isHighlighted = highlightedIds.has(node.id);
          const hasSelection = highlightedIds.size > 0;
          const opacity = hasSelection && !isHighlighted ? 0.2 : 1;
          
          ctx.globalAlpha = opacity;

          // Draw shape based on group
          ctx.fillStyle = getNodeColor(node);
          
          // Selection glow
            if (node.id === selectedNodeId) {
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 10;
            } else {
                ctx.shadowBlur = 0;
            }

          // Risk border
          const riskColor = getRiskColor(node.risk);
          ctx.strokeStyle = riskColor;
          ctx.lineWidth = (isHighlighted ? 3 : 2) / globalScale;

          if (node.group === 'domain') {
              const w = 15;
              ctx.beginPath();
              ctx.roundRect(node.x - w/2, node.y - w/2, w, w, 2);
              ctx.fill();
              ctx.stroke();
          } else if (node.group === 'subdomain') {
              ctx.beginPath();
              ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.stroke();
          } else if (node.group === 'port') {
              ctx.beginPath();
              ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.stroke();
          } else if (node.group === 'service') {
              ctx.beginPath();
              const r = 7;
              for (let i = 0; i < 6; i++) {
                ctx.lineTo(node.x + r * Math.cos(i * 2 * Math.PI / 6), node.y + r * Math.sin(i * 2 * Math.PI / 6));
              }
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
          }

          // Risk Badges (The "No new UI" requirement)
          // 🌐 Internet-facing, 🔓 Unencrypted (HTTP), ⚠️ High Risk
          // Draw badges at top-right
          if (opacity > 0.3) { // Only draw badges if visible
              const badges = [];
              if (node.internet_facing) badges.push('🌐');
              if (node.risk === 'high') badges.push('⚠️');
              if (node.protocol === 'HTTP') badges.push('🔓');

              if (badges.length > 0) {
                  const badgeFontSize = 6/globalScale;
                  ctx.font = `${badgeFontSize}px Sans-Serif`;
                  badges.forEach((badge, i) => {
                      ctx.fillText(badge, node.x + 8 + (i*6/globalScale), node.y - 6);
                  });
              }
          }

          // Text Label
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b'; 
          ctx.shadowBlur = 0;
          ctx.font = `${fontSize}px Sans-Serif`; // Reset font
          ctx.fillText(label, node.x, node.y + 12);

          // Restore Alpha
          ctx.globalAlpha = 1;
        }}
      />
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 p-2 rounded border border-slate-200 dark:border-slate-700 text-xs shadow-lg backdrop-blur-sm pointer-events-none">
          <div className="font-semibold mb-1">Legend</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded bg-blue-500"></span> Domain</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-teal-500"></span> Subdomain</div>
          <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Port</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-md bg-purple-500"></span> Service</div>
      </div>
    </div>
  );
}
