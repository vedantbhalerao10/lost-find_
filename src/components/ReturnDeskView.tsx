import React from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { 
  CheckCircle2, 
  MapPin, 
  User, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Clock, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Building
} from 'lucide-react';

export const ReturnDeskView: React.FC = () => {
  const { 
    isOwnerVerified, 
    isItemReturned, 
    markAsReturned, 
    setActiveTab, 
    loadDemoCase 
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-14">
      
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Building className="w-3.5 h-3.5 text-emerald-600" />
          <span>Central Library Security Desk #2</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Recovery Desk
        </h1>

        <p className="text-xs sm:text-sm text-slate-500">
          Final campus custodial verification &amp; physical handover clearance.
        </p>
      </div>

      {/* Main Recovery Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Item Header & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <ItemVisual type="wallet" size="md" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Black Leather Wallet
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>Accessories</span>
                <span>·</span>
                <span>Logged 16 Sep 2026</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div>
            {isItemReturned ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold font-mono tracking-wider border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>RETURNED ✓</span>
              </span>
            ) : isOwnerVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold font-mono tracking-wider border border-purple-300">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>VERIFIED OWNER</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold font-mono tracking-wider border border-amber-300">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>PENDING VERIFICATION</span>
              </span>
            )}
          </div>
        </div>

        {/* 4-Step Recovery Timeline Required by Prompt */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Recovery Lifecycle
          </h3>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            
            {/* 1. Reported */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Reported</span>
                <p className="text-[11px] text-slate-500">16 Sep 2026, 10:15 AM · Lost report created by Karan (Library Gate)</p>
              </div>
            </div>

            {/* 2. Potential Match */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Potential Match</span>
                <p className="text-[11px] text-slate-500">16 Sep 2026, 12:40 PM · 87% explainable match detected with Found item at Library</p>
              </div>
            </div>

            {/* 3. Verified */}
            <div className="relative flex items-start gap-3">
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center ring-4 ring-white shadow-xs ${
                isOwnerVerified || isItemReturned ? 'bg-emerald-500' : 'bg-slate-300'
              }`}>
                {isOwnerVerified || isItemReturned ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Verified</span>
                <p className="text-[11px] text-slate-500">
                  {isOwnerVerified || isItemReturned 
                    ? '16 Sep 2026, 02:15 PM · Private proof "Blue Ganesh sticker" confirmed' 
                    : 'Pending private proof confirmation from claimant'}
                </p>
              </div>
            </div>

            {/* 4. Returned */}
            <div className="relative flex items-start gap-3">
              <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center ring-4 ring-white shadow-xs ${
                isItemReturned ? 'bg-emerald-500' : 'bg-indigo-600 animate-pulse'
              }`}>
                {isItemReturned ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <span className={`text-xs font-bold ${isItemReturned ? 'text-emerald-700' : 'text-slate-900'}`}>
                  Returned
                </span>
                <p className="text-[11px] text-slate-500">
                  {isItemReturned 
                    ? '16 Sep 2026, 02:22 PM · Item handed over in person. Case officially closed.' 
                    : 'Ready for physical handover signature at Library Desk #2.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Handover Details Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Custody Location</span>
            <span className="font-semibold text-slate-800">Library Desk #2 Lockbox</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Duty Custodian</span>
            <span className="font-semibold text-slate-800">Officer R. Sharma (ID #88)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimant Verification</span>
            <span className="font-semibold text-emerald-700 font-mono">Proof Match: PASSED</span>
          </div>
        </div>

        {/* Action Button Section Required by Section 8 */}
        <div className="pt-2">
          {isItemReturned ? (
            /* RETURNED SUCCESS STATE */
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                RETURNED ✓
              </h3>

              <p className="text-sm font-bold text-emerald-900">
                Item successfully returned to its verified owner.
              </p>

              <p className="text-xs text-emerald-700 font-medium">
                Recovery case closed.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('my-reports')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open My Reports (Case Closed)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* MARK AS RETURNED BUTTON */
            <div className="space-y-3">
              <button
                onClick={markAsReturned}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm tracking-wide transition-all shadow-md shadow-emerald-200 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>Mark as Returned</span>
              </button>
              <p className="text-center text-[11px] text-slate-400">
                Completes the full recovery loop: REPORT → DISCOVER → MATCH → VERIFY → RETURN
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
