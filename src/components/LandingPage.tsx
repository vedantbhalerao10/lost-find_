import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Fingerprint,
  RefreshCw,
  Clock,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, loadDemoCase } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Soft Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Campus Portal Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Campus Lost &amp; Found Portal</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            FINDBACK
          </h1>
          
          <p className="mt-4 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            From lost → matched → verified → returned.
          </p>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A trusted campus Lost &amp; Found system that connects reports, matching, verification and recovery in one simple workflow.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('search')}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 hover:shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Find an Item</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('report-lost')}
              className="px-6 py-3 rounded-xl bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-all border border-slate-300 shadow-xs hover:border-slate-400 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Report Lost Item</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-all border border-slate-200 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-3xl mx-auto grid grid-cols-3 gap-4 sm:gap-6 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">87%</div>
              <div className="text-xs text-slate-500 mt-0.5">Match Accuracy</div>
            </div>
            <div className="text-center border-x border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">&lt;24h</div>
              <div className="text-xs text-slate-500 mt-0.5">Campus Recovery Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Private Proof Verified</div>
            </div>
          </div>

        </div>
      </section>

      {/* The 4-Step Recovery Loop */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Recovery Loop</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              REPORT → MATCH → VERIFY → RETURN
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Most campus groups fail after the report stage. FindBack provides the complete handover loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1: Report */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Report</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Log lost or found items with location, timestamp, and a crucial <strong>hidden private proof detail</strong>.
              </p>
            </div>

            {/* Step 2: Match */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Match</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Explainable matching highlights candidate pairs using category, geographic proximity, timestamp, and keywords.
              </p>
            </div>

            {/* Step 3: Verify */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Verify</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Claimants must solve the confidential private proof challenge before any item handover occurs.
              </p>
            </div>

            {/* Step 4: Return */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Return</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Secure custody desk releases the item, closes the ticket, and updates the student ledger as Returned.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Core Product Principles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Built for Campus Trust</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              4 Product Principles
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Why FindBack succeeds where unorganized social media posts fail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Principle 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">1. One Trusted Campus Pool</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Lost and found reports are united into a single university-wide directory, ending the chaos of scattered WhatsApp groups, Telegram chats, and library notice boards.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">2. Search Before Scrolling</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Students quickly filter by campus location, exact category, and lost dates with instant keyword matching rather than scrolling through hundreds of unorganized photos.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">3. Match Before Handover</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Potential matches are highlighted using transparent, explainable matching signals so both students and campus desks see exactly why an item is a candidate.
                </p>
              </div>
            </div>

            {/* Principle 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">4. Verify Before Return</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Private identifying details (like engravings, hidden stickers, or serial numbers) stay confidential until the claimant proves ownership during recovery.
                </p>
              </div>
            </div>

          </div>

          {/* Quick CTA footer */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Enter FindBack Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 FINDBACK · Campus Lost &amp; Found Recovery System</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Library Helpdesk</span>
            <span>·</span>
            <span>Security Control Room</span>
            <span>·</span>
            <span>Student Council</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
