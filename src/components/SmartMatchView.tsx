import React from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Tag, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Info,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const SmartMatchView: React.FC = () => {
  const { 
    walletLostReport, 
    walletFoundReport, 
    setActiveTab, 
    isOwnerVerified,
    isItemReturned 
  } = useApp();

  const signals = [
    { label: 'Category', status: 'SAME', detail: 'Both registered under "Accessories"' },
    { label: 'Location', status: 'SAME / NEARBY', detail: 'Library Gate ↔ Central Library Entrance (~35m proximity)' },
    { label: 'Date', status: 'SAME', detail: 'Both reported on 16 September 2026' },
    { label: 'Text similarity', status: 'HIGH', detail: 'Direct keyword overlap: "black", "leather", "wallet"' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-14">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Explainable Campus Matching</span>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Potential Match Found
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-500">
          Potential match based on category, date, location and text.
        </p>
      </div>

      {/* Match Score Display Card (87% Match) */}
      <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-xs relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Circular Score Gauge */}
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              {/* SVG Gauge Circle */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeDasharray="87, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black font-mono tracking-tight text-indigo-950">87%</span>
                <span className="text-[9px] font-bold uppercase text-slate-400">Match</span>
              </div>
            </div>

            <div className="space-y-1">
              {/* Required Exact Label */}
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>Explainable Match Score</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">HIGH CONFIDENCE</span>
              </h2>
              {/* Required Subtitle */}
              <p className="text-xs text-slate-500">
                Potential match based on category, date, location and text.
              </p>
              <p className="text-[11px] text-slate-400">
                Transparent heuristic matching engine comparing structured metadata.
              </p>
            </div>
          </div>

          {/* Quick status button */}
          <div className="shrink-0 w-full md:w-auto">
            {isItemReturned ? (
              <button
                onClick={() => setActiveTab('my-reports')}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Case Already Returned</span>
              </button>
            ) : isOwnerVerified ? (
              <button
                onClick={() => setActiveTab('return-desk')}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verified! Proceed to Return Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('verify-owner')}
                className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Start Verification</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Side-By-Side Comparison Required by Section 6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: Your Lost Report */}
        <div className="p-6 rounded-3xl bg-white border border-rose-200/90 shadow-xs space-y-5 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-md border border-rose-200">
              Your Lost Report
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: FB-L-904</span>
          </div>

          <div className="flex items-center gap-4">
            <ItemVisual type="wallet" size="md" />
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Black Leather Wallet
              </h3>
              <p className="text-xs text-slate-500">Reported by Karan (You)</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Category
              </span>
              <span className="font-semibold text-slate-900">Accessories</span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Location
              </span>
              <span className="font-semibold text-slate-900">Library Gate</span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date
              </span>
              <span className="font-semibold text-slate-900 font-mono">16 Sep 2026</span>
            </div>
            <div className="py-1 border-t border-slate-50">
              <span className="text-slate-500 block mb-1">Description</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                Black leather wallet with multiple card slots.
              </p>
            </div>
          </div>

          {/* Hidden Private Proof Indicator */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Private identifying detail is encrypted and ready for verification challenge.</span>
          </div>

        </div>

        {/* RIGHT: Found Report */}
        <div className="p-6 rounded-3xl bg-white border border-emerald-200/90 shadow-xs space-y-5 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              Found Report
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: FB-F-418</span>
          </div>

          <div className="flex items-center gap-4">
            <ItemVisual type="wallet" size="md" />
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Black Leather Wallet
              </h3>
              <p className="text-xs text-slate-500">Reported by Library Staff (Desk #2)</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Category
              </span>
              <span className="font-semibold text-slate-900">Accessories</span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Location
              </span>
              <span className="font-semibold text-slate-900">Library</span>
            </div>
            <div className="flex items-center justify-between py-1 border-t border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Date
              </span>
              <span className="font-semibold text-slate-900 font-mono">16 Sep 2026</span>
            </div>
            <div className="py-1 border-t border-slate-50">
              <span className="text-slate-500 block mb-1">Description</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                Black wallet found near the library entrance.
              </p>
            </div>
          </div>

          {/* Custody location */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Secured in custody lockbox at Central Library Desk #2.</span>
          </div>

        </div>

      </div>

      {/* Explainable Matching Signals Required by Prompt */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Explainable Matching Signals
          </h3>
          <span className="text-xs text-slate-400 font-mono">4 of 4 Signals Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {signals.map((sig, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{sig.label}:</span>
                  <span className="text-[11px] font-bold text-emerald-700 font-mono">{sig.status}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{sig.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>FindBack relies on transparent, verifiable metadata heuristics — never black-box guesses.</span>
          </div>

          <button
            onClick={() => setActiveTab('verify-owner')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Start Verification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
