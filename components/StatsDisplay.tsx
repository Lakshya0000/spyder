"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stats, formatNumber, formatCompactNumber, topCountries } from "./data/country-data";

function useAnimatedNumber(baseValue: number, incrementRatePerSecond: number) {
  const [value, setValue] = useState(baseValue);
  const [displayRate, setDisplayRate] = useState(incrementRatePerSecond);

  useEffect(() => {
    const updatesPerSecond = 20;
    const baseIncrement = incrementRatePerSecond / updatesPerSecond;
    
    const interval = setInterval(() => {
      const variation = 0.7 + Math.random() * 0.6;
      const increment = Math.max(1, Math.floor(baseIncrement * variation));
      setValue((v) => v + increment);
      
      const rateVariation = 0.85 + Math.random() * 0.3;
      setDisplayRate(Math.floor(incrementRatePerSecond * rateVariation));
    }, 1000 / updatesPerSecond);

    return () => clearInterval(interval);
  }, [incrementRatePerSecond]);

  return { value, rate: displayRate };
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function PixelGridTransition({
  firstContent,
  secondContent,
  isActive,
  gridSize = 30,
  animationStepDuration = 0.3,
  className,
}: {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  isActive: boolean;
  gridSize?: number;
  animationStepDuration?: number;
  className?: string;
}) {
  const [showPixels, setShowPixels] = useState(false);
  const [animState, setAnimState] = useState<"idle" | "growing" | "shrinking">("idle");
  const hasActivatedRef = useRef(false);

  const pixels = useMemo(() => {
    const total = gridSize * gridSize;
    const result = [];
    for (let n = 0; n < total; n++) {
      const row = Math.floor(n / gridSize);
      const col = n % gridSize;
      const color = Math.random() > 0.85 ? "var(--ds-blue-800, #0070f3)" : "var(--ds-gray-200, #333)";
      result.push({ id: n, row, col, color });
    }
    return result;
  }, [gridSize]);

  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);

  useEffect(() => {
    if (!hasActivatedRef.current && !isActive) return;
    if (isActive) hasActivatedRef.current = true;

    const indices = pixels.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledOrder(indices);

    setShowPixels(true);
    setAnimState("growing");

    const shrinkTimer = setTimeout(() => setAnimState("shrinking"), animationStepDuration * 1000);
    const hideTimer = setTimeout(() => {
      setShowPixels(false);
      setAnimState("idle");
    }, animationStepDuration * 2000);

    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(hideTimer);
    };
  }, [isActive, animationStepDuration, pixels]);

  const delayPerPixel = useMemo(() => animationStepDuration / pixels.length, [animationStepDuration, pixels.length]);
  const orderMap = useMemo(() => {
    const map = new Map<number, number>();
    shuffledOrder.forEach((idx, order) => map.set(idx, order));
    return map;
  }, [shuffledOrder]);

  return (
    <div className={`w-full overflow-hidden max-w-full relative ${className || ""}`}>
      <motion.div
        className="h-full"
        aria-hidden={isActive}
        initial={{ opacity: 1 }}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0, delay: animationStepDuration }}
      >
        {firstContent}
      </motion.div>

      <motion.div
        className="absolute inset-0 w-full h-full z-[2] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0, delay: animationStepDuration }}
        style={{ pointerEvents: isActive ? "auto" : "none" }}
        aria-hidden={!isActive}
      >
        {secondContent}
      </motion.div>

      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        <AnimatePresence>
          {showPixels &&
            pixels.map((pixel) => {
              const order = orderMap.get(pixel.id) ?? 0;
              return (
                <motion.div
                  key={pixel.id}
                  style={{
                    backgroundColor: pixel.color,
                    aspectRatio: "1 / 1",
                    gridArea: `${pixel.row + 1} / ${pixel.col + 1}`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: animState === "growing" ? 1 : 0,
                    scale: animState === "growing" ? 1 : 0,
                  }}
                  transition={{ duration: 0.01, delay: order * delayPerPixel }}
                />
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function StatCard({
  title,
  baseValue,
  incrementRate,
  displayValue,
  subtitle,
  children,
  infoContent,
  href,
  className,
}: {
  title: string;
  baseValue?: number;
  incrementRate?: number;
  displayValue?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  infoContent?: string;
  href?: string;
  className?: string;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const { value } = useAnimatedNumber(baseValue || 0, incrementRate || 0);
  
  const statsContent = (
    <div className="bg-gray-alpha-100 p-3 md:p-4 w-full min-h-[100px] h-full flex flex-col justify-between">
      <div className="space-y-2">
        <h2 className="my-0 font-mono font-medium text-sm tracking-tight uppercase text-gray-1000 pr-6">
          {title}
        </h2>
        
        {/* Main Value Display: Priority to displayValue, else animated number */}
        <div className="text-xl md:text-2xl tracking-tight font-mono font-bold text-gray-900 break-words">
          {displayValue ? displayValue : (baseValue !== undefined ? formatNumber(value) : null)}
        </div>
        
        {subtitle && (
           <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );

  const infoContentView = (
    <div className="bg-gray-alpha-100 p-4 md:p-6 w-full h-full overflow-y-auto no-scrollbar flex flex-col gap-y-2">
      {href ? (
        <a
          href={href}
          tabIndex={showInfo ? 0 : -1}
          className="my-0 font-mono font-medium text-sm tracking-tight uppercase text-gray-1000 hover:underline underline-offset-2 inline-flex gap-x-0.5 items-center w-fit shrink-0"
        >
          {title}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" />
          </svg>
        </a>
      ) : (
        <span className="my-0 font-mono font-medium text-sm tracking-tight uppercase text-gray-1000 shrink-0">
          {title}
        </span>
      )}
      <span className="tracking-tight text-sm text-gray-900 leading-relaxed line-clamp-6">
        {infoContent}
      </span>
    </div>
  );
  
  return (
    <div className={`relative group rounded-md overflow-hidden ${className || ""}`}>
      <PixelGridTransition
        firstContent={statsContent}
        secondContent={infoContentView}
        isActive={showInfo}
        gridSize={30}
        animationStepDuration={0.3}
        className="h-full"
      />
      {infoContent && (
        <div className={`absolute top-2 right-2 transition-opacity duration-150 z-[20] isolate ${showInfo ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"}`}>
          <button
            aria-label={`Learn more about ${title}`}
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 m-0 bg-transparent text-gray-alpha-600 md:text-gray-900 border-none md:border md:border-solid border-gray-alpha-400 hover:text-gray-1000 hover:bg-gray-alpha-200 transition-colors duration-150 flex items-center justify-center outline-none focus-visible:ring cursor-pointer"
          >
            <InfoIcon />
          </button>
        </div>
      )}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-1 mt-2 list-none pl-0">
      {features.map((feat, i) => (
         <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-mono">
            <span className="text-blue-600 font-bold">✓</span> {feat}
         </li>
      ))}
    </ul>
  );
}

export function TotalRequests() {
  return (
    <div className="space-y-3">
      <h2 className="my-0 font-sans font-bold text-xs tracking-wider uppercase text-gray-500">
        Platform Status
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative flex h-4 w-4 md:h-5 md:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-red-500"></span>
        </div>
        <div className="text-4xl md:text-5xl tracking-tight font-mono tabular-nums text-gray-900 font-bold">
          LIVE
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono tabular-nums bg-green-100/50 w-fit px-2 py-1 rounded-full border border-green-200">
        <span className="text-green-700 font-bold">● System Operational</span>
      </div>
    </div>
  );
}

// ... existing TopCountries / RegionCount code can stay or be simplified ...
// Simplifying TopCountries to just be a list of regions without fake counters
export function TopCountries({ limit = 5 }: { limit?: number }) {
  const regions = ["US East (N. Virginia)", "Europe (Frankfurt)", "Asia Pacific (Tokyo)", "US West (Oregon)", "South America (São Paulo)"];
  
  return (
    <div className="space-y-3">
      <h2 className="my-0 font-sans font-bold text-xs tracking-wider uppercase text-gray-500">
        Active Regions
      </h2>
      <ul className="list-none pl-0 space-y-2">
        {regions.slice(0, limit).map((region, index) => (
          <li key={index} className="flex items-center gap-2 text-sm font-mono text-gray-800">
             <span className="text-blue-500 text-[10px]">■</span> {region}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RegionCount() {
  return (
    <div className="flex items-center w-full md:w-fit justify-between md:justify-start mt-4 pt-4 border-t border-gray-200">
      <div className="text-left">
        <span className="font-medium text-sm text-gray-900 block">Infrastructure</span>
        <span className="text-xs text-gray-500">Serving from 19 Global Edge Locations</span>
      </div>
    </div>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="flex flex-col gap-2">
        <StatCard
          title="AI Threat Neutralization"
          displayValue="Autonomous Agent"
          subtitle="Web Archive & Defender"
          infoContent="Attacks identified and neutralized by the 'Threat Hunter' Azure Agent using Web Archive and Defender for Cloud."
          href="/attack-surface"
          className="flex-1 bg-white shadow-sm border border-gray-200"
        >
          <FeatureList features={[
             "Historical Discovery via Web Archive",
             "Automated Log Analysis",
             "Zero-Day Pattern Recognition"
          ]} />
        </StatCard>
        
        <StatCard
          title="Code Security Auditor"
          displayValue="GitHub Integrated"
          subtitle="OpenAI + GitHub MCP"
          infoContent="Real-time vulnerability analysis of Pull Requests using GitHub MCP and Azure OpenAI ('Code Auditor')."
          href="/code-security"
          className="flex-1"
        >
           <FeatureList features={[
             "Auto-scans every Pull Request",
             "OWASP Top 10 Vulnerabilities",
             "Context-aware Fix Suggestions"
          ]} />
        </StatCard>
      </div>

      <div className="flex flex-col gap-2">
        <StatCard
          title="Intelligent WAF"
          displayValue="Adaptive Rules"
          subtitle="Azure WAF Sync"
          infoContent="Adaptive protection using Azure WAF updated with real-time 'Learned Behaviors' from the AI analysis engine."
          href="/firewall"
          className="flex-1"
        >
           <FeatureList features={[
             "Dynamic Rule Generation",
             "Live Traffic Learning",
             "Legacy WAF Rule Import",
             "False Positive Reduction"
          ]} />
        </StatCard>
      </div>

      <div className="flex flex-col gap-1.5">
        <StatCard
          title="Identity & Bot Defense"
          displayValue="Behavioral AI"
          subtitle="Bot Detection"
          infoContent="Advanced behavioral analysis distinguishing humans from AI bots using Azure Monitor and Pattern Recognition."
          href="/audits"
          className="flex-1"
        >
           <FeatureList features={[
             "Pattern Recognition AI",
             "Zero-Captcha Verification",
             "Rate Limiting Optimization"
          ]} />
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-gray-500">Target Accuracy</span>
              <span className="font-mono font-bold text-blue-600">99.9%</span>
          </div>
        </StatCard>
        <StatCard
          title="Global Asset Search"
          displayValue="Continuous Discovery"
          subtitle="Cosmos DB + Bing"
          infoContent="Continuous discovery of exposed assets and subdomains using Cosmos DB and Bing Search."
          href="/attack-surface"
          className="flex-1 bg-white shadow-sm border border-gray-200"
        >
           <FeatureList features={[
             "Shadow IT Detection",
             "Subdomain Enumeration",
             "Exposed Port Scanning"
          ]} />
        </StatCard>
      </div>
    </div>
  );
}
