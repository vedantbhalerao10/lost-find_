import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { ReportItem } from '../types';
import { 
  FileText, 
  Tag, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  PlusCircle,
  Filter
} from 'lucide-react';

export const MyReportsView: React.FC = () => {
  const { 
    reports, 
    setActiveTab, 
    isItemReturned, 
    isOwnerVerified 
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');

  const userReports = reports.filter(r => {
    if (!r.isUserReport && r.id !== 'rep-found-wallet') return false;
    if (filterType !== 'all' && r.type !== filterType) return false;
    return true;
  });

  const getStatusBadge = (item: ReportItem) => {
    if (item.id === 'rep-lost-wallet' || item.id === 'rep-found-wallet') {
      if (isItemReturned) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Returned</span>
          </span>
        );
      }
      if (isOwnerVerified) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Verified Owner</span>
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Potential Match</span>
        </span>
      );
    }

    if (item.status === 'returned') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Returned</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>Searching</span>
      </span>
    );
  };

  const handleRowClick = (item: ReportItem) => {
    if (item.id === 'rep-lost-wallet' || item.id === 'rep-found-wallet') {
      if (isItemReturned) {
        setActiveTab('return-desk');
      } else if (isOwnerVerified) {
        setActiveTab('return-desk');
      } else {
        setActiveTab('smart-match');
      }
    } else {
      setActiveTab('search');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            My Reports &amp; Claims
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track registered lost items, campus matches, and completed recoveries in your personal ledger.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report-lost')}
          className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Lost Report</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
            filterType === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFilterType('lost')}
          className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
            filterType === 'lost' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Lost Reports
        </button>
        <button
          onClick={() => setFilterType('found')}
          className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
            filterType === 'found' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Found / Desk Log
        </button>
      </div>

      {/* Structured Reports Table & Card Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6">Item</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userReports.map((item) => {
                const isWallet = item.id === 'rep-lost-wallet' || item.id === 'rep-found-wallet';
                return (
                  <tr 
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Item with Visual */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <ItemVisual type={item.photoType} size="sm" className="shrink-0" />
                        <div>
                          <div className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        item.type === 'lost' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {item.type}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-600 font-mono">
                      {item.date}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item)}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      {isWallet ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(item);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <span>{isItemReturned ? 'Closed Case' : isOwnerVerified ? 'Return Desk' : 'View Match'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-slate-400 group-hover:text-slate-600 flex items-center justify-end gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-100">
          {userReports.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleRowClick(item)}
              className="p-5 space-y-3 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ItemVisual type={item.photoType} size="sm" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="capitalize">{item.type}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <div>{getStatusBadge(item)}</div>
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Recovery summary footer */}
      <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-indigo-950 font-medium">
          FindBack ensures each verified return is permanently archived in the campus safety records.
        </div>
        <div className="text-indigo-600 font-mono font-bold shrink-0">
          Recovery Desk Active · Desk #2
        </div>
      </div>

    </div>
  );
};
