"use client";

import { settingsData } from "../../../components/data/settings-data";
import AutonomyControl from "../../../components/AutonomyControl";
import ThresholdSettings from "../../../components/ThresholdSettings";
import IntegrationsGrid from "../../../components/IntegrationsGrid";

export default function Settings() {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-950 font-[family-name:var(--font-sans)] overflow-hidden">
        {/* Main Workspace */}
        <div className="flex-1 p-6 relative overflow-hidden overflow-y-auto no-scrollbar">
            <div className="max-w-full mx-auto pb-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">System Configuration</h1>
                    <p className="text-sm text-slate-500">Define operational parameters for autonomous security decisions.</p>
                </div>

                <AutonomyControl config={settingsData.autonomy} />
                <ThresholdSettings config={settingsData.thresholds} />
                <IntegrationsGrid integrations={settingsData.integrations} />
            </div>
        </div>
    </div>
  );
}
