"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import Step1Profile from "./steps/Step1Profile";
import Step2Assets from "./steps/Step2Assets";
import Step3Integrations from "./steps/Step3Integrations";
import { useRouter } from "next/navigation";

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingWizard({ isOpen, onClose }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    cisoName: "",
    techStack: [] as string[],
    cloudProvider: [] as string[],
    compliance: [] as string[],
    criticalAssets: "",
    primaryDomain: "",
    githubConnected: false,
    repositories: [] as string[]
  });

  if (!isOpen) return null;

  const updateData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate setup delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push("/home");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                     <h1 className="text-lg font-bold text-slate-900 dark:text-white">Platform Setup</h1>
                     <p className="text-xs text-slate-500">Step {step} of 3</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
            >
                <X size={20} />
            </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
            <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
            />
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <Step1Profile key="step1" data={formData} updateData={updateData} />
                )}
                {step === 2 && (
                    <Step2Assets key="step2" data={formData} updateData={updateData} />
                )}
                {step === 3 && (
                    <Step3Integrations key="step3" data={formData} updateData={updateData} />
                )}
            </AnimatePresence>
        </div>

        {/* Footer / Actions */}
        <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
            <button
                onClick={handleBack}
                disabled={step === 1 || isLoading}
                className={`flex items-center gap-2 px-4 py-2 font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
                <ChevronLeft size={18} /> Back
            </button>

            {step < 3 ? (
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Continue <ChevronRight size={18} />
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    {isLoading ? "Setting up..." : "Complete Setup"}
                </button>
            )}
        </div>

      </motion.div>
    </div>
  );
}
