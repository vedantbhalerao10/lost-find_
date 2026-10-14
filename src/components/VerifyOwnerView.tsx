import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  KeyRound,
  HelpCircle
} from 'lucide-react';

export const VerifyOwnerView: React.FC = () => {
  const { 
    verificationAnswer, 
    setVerificationAnswer, 
    verificationError, 
    isOwnerVerified, 
    verifyOwnership, 
    setActiveTab, 
    isItemReturned 
  } = useApp();

  const [inputVal, setInputVal] = useState(verificationAnswer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationAnswer(inputVal);
    verifyOwnership(inputVal);
  };

  const handleFillDemoAnswer = () => {
    setInputVal('Blue Ganesh sticker');
    setVerificationAnswer('Blue Ganesh sticker');
    verifyOwnership('Blue Ganesh sticker');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-14">
      
      {/* Page Title & Intro */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-purple-600" />
          <span>Trust &amp; Safety Protocol</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Verify Ownership
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Before handing over the item, answer the private verification question.
        </p>
      </div>

      {/* Item Context Pill */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ItemVisual type="wallet" size="sm" />
          <div>
            <div className="text-xs font-bold text-slate-900">Black Leather Wallet</div>
            <div className="text-[11px] text-slate-500">Lost at Library Gate · Matched at Library (87%)</div>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
          Claimant: Karan (Student #412)
        </span>
      </div>

      {isOwnerVerified ? (
        /* OWNER VERIFIED SUCCESS STATE */
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-md text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Animated checkmark circle */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-pulse-glow">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
              <span>Owner Verified</span>
              <span className="text-emerald-600">✓</span>
            </h2>

            <p className="text-sm font-semibold text-emerald-800 bg-emerald-50 py-2 px-4 rounded-xl border border-emerald-200">
              The claimant successfully verified the private identifying detail.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs text-slate-600 mt-4 space-y-1">
              <div className="text-slate-400 font-semibold uppercase text-[10px]">Verified Proof Token</div>
              <div className="font-mono text-slate-900 font-bold">"Blue Ganesh sticker"</div>
              <div className="text-[11px] text-slate-500 pt-1">
                Matches the encrypted registration token logged during initial lost report.
              </div>
            </div>
          </div>

          {/* Action button: Proceed to Return */}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('return-desk')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-200 hover:shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Proceed to Return</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      ) : (
        /* VERIFICATION CHALLENGE FORM */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          
          {/* Section: Private Proof */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <KeyRound className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Private Proof
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Question */}
            <div className="space-y-1.5">
              <label className="text-base font-extrabold text-slate-900 block leading-snug">
                What unique detail is present inside your wallet?
              </label>
              
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Only the legitimate owner should know this information.</span>
              </p>
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <span>Case-insensitive verification</span>
                <button
                  type="button"
                  onClick={() => setInputVal('Blue Ganesh sticker')}
                  className="text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                  title="Fill registration token"
                >
                  (Registered detail: Blue Ganesh sticker)
                </button>
              </div>
            </div>

            {/* Error Message if wrong */}
            {verificationError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{verificationError}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all shadow-md shadow-purple-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Owner</span>
            </button>

          </form>

        </div>
      )}

      {/* Trust Guarantee Note */}
      <div className="text-center text-xs text-slate-400">
        FindBack Security Layer · Zero unverified handovers · Campus Custodial Chain #418-2026
      </div>

    </div>
  );
};
