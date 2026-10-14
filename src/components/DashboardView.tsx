import React from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Tag, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText,
  Building,
  Check,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    stats, 
    walletLostReport, 
    reports,
    isOwnerVerified, 
    isItemReturned 
  } = useApp();

  const currentWalletStatus = isItemReturned 
    ? 'Returned' 
    : isOwnerVerified 
    ? 'Owner Verified' 
    : 'Potential Match';

  // Recovery loop steps for Active Card
  const recoverySteps = [
    { title: 'Reported', done: true, current: false },
    { title: 'Matched (87%)', done: true, current: !isOwnerVerified && !isItemReturned },
    { title: 'Verified', done: isOwnerVerified || isItemReturned, current: isOwnerVerified && !isItemReturned },
    { title: 'Returned', done: isItemReturned, current: isItemReturned },
  ];

  const recentReports = reports.slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium mb-3 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Karan Borhade · Student ID #412</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Find your lost item faster.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Centralized campus recovery portal connecting reports, explainable matching, private verification, and safe custody handovers.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('search')}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100 transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            <span>Search Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('report-lost')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-indigo-200" />
            <span>Report Lost Item</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* My Reports */}
        <div 
          onClick={() => setActiveTab('my-reports')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">My Reports</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {stats.myReports}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
            <span>Active in campus registry</span>
          </div>
        </div>

        {/* Potential Matches */}
        <div 
          onClick={() => setActiveTab('smart-match')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group ring-1 ring-indigo-500/15"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Potential Matches</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
            {stats.potentialMatches}
          </div>
          <div className="mt-1 text-xs text-indigo-600/80 font-medium flex items-center gap-1">
            <span>Action recommended</span>
          </div>
        </div>

        {/* Pending Claims */}
        <div 
          onClick={() => setActiveTab('verify-owner')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Claims</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {stats.pendingClaims}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
            <span>Ready for desk proof</span>
          </div>
        </div>

        {/* Returned */}
        <div 
          onClick={() => setActiveTab('my-reports')}
          className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Returned</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
            {stats.returned}
          </div>
          <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">
            <span>Cases successfully closed</span>
          </div>
        </div>

      </div>

      {/* ACTIVE RECOVERY SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Recovery</h2>
            <p className="text-xs text-slate-500">Live priority match tracking for your reported items</p>
          </div>
          <button 
            onClick={() => setActiveTab('search')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Browse campus reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Prominent Card for: Black Leather Wallet */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-indigo-100/90 shadow-xs hover:shadow-sm transition-all relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              
              {/* Wallet Item Visual preview */}
              <div className="shrink-0">
                <ItemVisual type="wallet" size="md" className="ring-1 ring-slate-200" />
              </div>

              {/* Item Info */}
              <div className="space-y-2">
                
                {/* Title & Status Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Black Leather Wallet
                  </h3>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    isItemReturned 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : isOwnerVerified 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {isItemReturned ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isOwnerVerified ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{currentWalletStatus}</span>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    <span>Category: <strong>Accessories</strong></span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lost: <strong>16 Sep</strong></span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location: <strong>Library Gate</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  {isItemReturned 
                    ? 'Recovery completed. Handed over to verified owner Karan at Central Library Security Desk.' 
                    : isOwnerVerified 
                    ? 'Ownership verified with private proof (Blue Ganesh sticker). Ready for recovery handover at Library Security Desk #2.' 
                    : 'Found report by Library Security Desk #2 (87% explainable score based on category, date, and nearby location).'}
                </p>

              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {isItemReturned ? (
                <button
                  onClick={() => setActiveTab('my-reports')}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>View Case History</span>
                </button>
              ) : isOwnerVerified ? (
                <button
                  onClick={() => setActiveTab('return-desk')}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proceed to Return Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('smart-match')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View Match</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

          </div>

          {/* Interactive Recovery Stepper Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">Recovery Lifecycle</span>
              <span className="font-mono text-[11px] text-slate-400">Step {isItemReturned ? '4 of 4' : isOwnerVerified ? '3 of 4' : '2 of 4'}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {recoverySteps.map((s, idx) => (
                <div 
                  key={s.title}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    s.done 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800 font-bold' 
                      : s.current 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold ring-1 ring-indigo-400/40' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[11px]">
                    {s.done ? (
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    ) : (
                      <span className="text-[10px] text-slate-400">{idx + 1}.</span>
                    )}
                    <span className="truncate">{s.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Recent Campus Reports Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Campus Reports</h2>
            <p className="text-xs text-slate-500">Live central directory across all campus zones</p>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all ({reports.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentReports.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === 'rep-lost-wallet' || item.id === 'rep-found-wallet') {
                  setActiveTab('smart-match');
                } else {
                  setActiveTab('search');
                }
              }}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.type === 'found'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{item.timeAgo}</span>
                </div>

                <div className="flex items-center gap-3 mb-2.5">
                  <ItemVisual type={item.photoType} size="sm" className="shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono truncate max-w-[100px]">{item.date}</span>
                <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>View</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Report Cards */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Submit a Campus Report</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Logging items immediately enables automatic pairing against recovered property tickets.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => setActiveTab('report-lost')}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900">I Lost Something</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Protect with private proof</div>
            </button>

            <button
              onClick={() => setActiveTab('report-found')}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 transition-all text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-slate-900">I Found Something</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Turn into campus custody</div>
            </button>
          </div>
        </div>

        {/* Campus Recovery Stations */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Official Recovery Stations</h3>
            <span className="text-[11px] font-semibold text-emerald-600">3 Active Stations</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-medium text-slate-800">Central Library Desk #2</span>
              <span className="text-[11px] font-semibold text-emerald-600">Open 24/7 (Duty Custodian)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-medium text-slate-800">Student Center Info Hub</span>
              <span className="text-[11px] text-slate-500">8:00 AM – 8:00 PM</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
              <span className="font-medium text-slate-800">Sports Complex Security Post</span>
              <span className="text-[11px] text-slate-500">6:00 AM – 10:00 PM</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Present your verified claim token at the station for physical handover.
          </p>
        </div>

      </section>

    </div>
  );
};
