import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ItemVisual } from './ItemVisual';
import { ReportItem } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';

export const SearchReportsView: React.FC = () => {
  const { reports, setActiveTab, setSelectedReportForMatch } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const categories = ['all', 'Accessories', 'Bottles & Containers', 'Electronics', 'Cards & IDs', 'Keys'];
  const locations = ['all', 'Library', 'Library Gate', 'Canteen', 'Science Hall 102', 'Admin Block', 'Sports Complex'];

  // Quick fill query helper for presentation
  const handleQuickDemoSearch = () => {
    setSearchQuery('black wallet');
  };

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;

      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // Location filter
      if (locationFilter !== 'all' && !item.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;

      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesLocation || matchesCategory;
      }

      return true;
    });
  }, [reports, typeFilter, categoryFilter, locationFilter, searchQuery]);

  // Check if both Black Wallets are currently in the filtered view
  const hasMatchedWalletPair = useMemo(() => {
    const hasLostWallet = filteredReports.some(r => r.id === 'rep-lost-wallet');
    const hasFoundWallet = filteredReports.some(r => r.id === 'rep-found-wallet');
    return hasLostWallet && hasFoundWallet;
  }, [filteredReports]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Search Campus Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse centralized campus lost and found items. Explainable signals pair candidate reports automatically.
        </p>
      </div>

      {/* Search Input Bar & Live Filters */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm text-slate-900 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {categories.map((c) => {
            const isSelected = categoryFilter === c;
            return (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {c === 'all' ? 'All Categories' : c}
              </button>
            );
          })}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 text-xs">
          
          {/* Lost / Found Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types ({reports.length})
            </button>
            <button
              onClick={() => setTypeFilter('lost')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                typeFilter === 'lost' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setTypeFilter('found')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors cursor-pointer ${
                typeFilter === 'found' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Found Only
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l === 'all' ? 'All Locations' : l}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Matched Pair Highlight Banner when related wallet pair is in view */}
      {hasMatchedWalletPair && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-indigo-950">High-Confidence Pair Detected</span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono">87% SCORE</span>
              </div>
              <p className="text-xs text-indigo-900/80 mt-0.5">
                Found "Black leather wallet" (Library) correlates with your Lost "Black Leather Wallet" (Library Gate).
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('smart-match')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <span>Compare &amp; View Match</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((item) => {
          const isWalletPair = item.id === 'rep-lost-wallet' || item.id === 'rep-found-wallet';
          const isFound = item.type === 'found';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-white border transition-all relative flex flex-col justify-between ${
                isWalletPair 
                  ? 'border-indigo-300 ring-2 ring-indigo-500/10 shadow-sm' 
                  : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                
                {/* Card Header: Type Tag & Time Ago */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      isFound 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {isFound ? 'Found' : 'Lost'}
                    </span>

                    {item.isUserReport && (
                      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Your Report
                      </span>
                    )}

                    {isWalletPair && (
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Pair Available</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 font-mono">{item.timeAgo}</span>
                </div>

                {/* Main Content Info */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <ItemVisual type={item.photoType} size="md" />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {item.title}
                    </h3>

                    {/* Metadata unboxed text */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {item.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-[150px]">
                  Logged by: {item.reporterName}
                </span>

                {isWalletPair ? (
                  <button
                    onClick={() => {
                      setSelectedReportForMatch(item);
                      setActiveTab('smart-match');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>View Possible Match</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('smart-match')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Check Matches</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No matching reports found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting keywords or selecting "All Categories".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('all');
              setCategoryFilter('all');
              setLocationFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
