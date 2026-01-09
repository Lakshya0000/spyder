import { ExternalLink, ShieldAlert, Cpu, Activity, Globe } from 'lucide-react';
// Helper types from our data definition

interface AssetDetailsProps {
    node: any; // Using any to accept the joined graph node type derived from the union
}

export default function AssetDetails({ node }: AssetDetailsProps) {
    if (!node) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
                <Activity size={48} className="mb-4 opacity-20" />
                <p>Select an asset from the list or graph to view details.</p>
            </div>
        );
    }

    const { type, risk, internet_facing, ip, protocol, port, version, cves, ai_reasoning } = node;

    const RiskIndicator = ({ level }: { level: string }) => {
        const bg = level === 'high' ? 'bg-red-500' : level === 'medium' ? 'bg-yellow-500' : 'bg-green-500';
        return (
            <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${bg} animate-pulse`} />
                <span className="text-lg font-semibold capitalize">{level} Risk</span>
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 p-6">
            <div className="mb-6">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">{type}</div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 break-words">
                    {node.name || `${port}/${protocol}`}
                </h2>
            </div>
            
            <RiskIndicator level={risk || 'low'} />

            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">Technical Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {ip && (
                            <div>
                                <span className="block text-slate-500 mb-1">IP Address</span>
                                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{ip}</span>
                            </div>
                        )}
                        {protocol && (
                            <div>
                                <span className="block text-slate-500 mb-1">Protocol</span>
                                <span className="font-medium">{protocol}</span>
                            </div>
                        )}
                        {version && (
                            <div>
                                <span className="block text-slate-500 mb-1">Version</span>
                                <span className="font-mono">{version}</span>
                            </div>
                        )}
                        {internet_facing !== undefined && (
                            <div>
                                <span className="block text-slate-500 mb-1">Exposure</span>
                                <span className={`inline-flex items-center gap-1 font-medium ${internet_facing ? 'text-red-500' : 'text-green-500'}`}>
                                    {internet_facing ? <Globe size={12} /> : <ShieldAlert size={12} />}
                                    {internet_facing ? 'Internet Facing' : 'Internal Only'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Reasoning Section */}
                {ai_reasoning && ai_reasoning.length > 0 && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-lg mt-6">
                        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-semibold mb-3 text-sm border-b border-purple-200 dark:border-purple-800/30 pb-2">
                            <Cpu size={16} />
                            AI Risk Explanation
                        </div>
                        <ul className="space-y-2">
                            {ai_reasoning.map((reason: string, idx: number) => (
                                <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {cves && cves.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-red-600 dark:text-red-400 border-b border-red-200 dark:border-red-900/50 pb-2 mb-3">Vulnerabilities</h3>
                        <div className="flex flex-wrap gap-2">
                            {cves.map((cve: string) => (
                                <a key={cve} href={`https://nvd.nist.gov/vuln/detail/${cve}`} target="_blank" rel="noopener noreferrer" 
                                   className="flex items-center gap-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                                    <ExternalLink size={10} />
                                    {cve}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
