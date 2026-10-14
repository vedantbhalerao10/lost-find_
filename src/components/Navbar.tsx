import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ViewTab } from '../types';
import { Bell, Sparkles, CheckCircle2, Search, ArrowRight, User, ShieldCheck, PlusCircle, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    notifications, 
    unreadNotifsCount, 
    markAllNotificationsRead, 
    loadDemoCase 
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; tab: ViewTab }[] = [
    { label: 'Dashboard', tab: 'dashboard' },
    { label: 'Search Reports', tab: 'search' },
    { label: 'Report Lost', tab: 'report-lost' },
    { label: 'Report Found', tab: 'report-found' },
    { label: 'My Reports', tab: 'my-reports' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ZONE 1: Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  FINDBACK
                </span>
                <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
                  Campus Lost &amp; Found
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-indigo-600 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Notifications & Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Report Item Button */}
            <button
              onClick={() => setActiveTab('report-lost')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-200" />
              <span>Report Item</span>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (!showNotifDropdown) markAllNotificationsRead();
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Campus Alerts</span>
                    <span className="text-xs text-slate-500">{notifications.length} updates</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-3.5 hover:bg-slate-50 transition-colors text-left ${!notif.read ? 'bg-indigo-50/30' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                            {notif.type === 'verified' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            {notif.type === 'match' && <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                            {notif.title}
                          </p>
                          <span className="text-[11px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                        
                        {notif.actionView && (
                          <button
                            onClick={() => {
                              setActiveTab(notif.actionView as ViewTab);
                              setShowNotifDropdown(false);
                            }}
                            className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          >
                            <span>{notif.type === 'match' ? 'Review Match' : 'View Action'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setActiveTab('my-reports');
                        setShowNotifDropdown(false);
                      }}
                      className="text-xs text-slate-600 hover:text-indigo-600 font-medium"
                    >
                      View All Activity in My Reports
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  KB
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">Karan</span>
                  <span className="text-[10px] text-slate-500 leading-tight">Student #412</span>
                </div>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Karan Borhade</p>
                    <p className="text-xs text-slate-500">karan@campus.edu</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Verified Student Account</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('my-reports'); setShowUserDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Reports & Claims</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('search'); setShowUserDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span>Search Campus Lost & Found</span>
                  </button>
                  <a 
                    href="/findback-project.zip" 
                    download="findback-project.zip"
                    onClick={() => setShowUserDropdown(false)}
                    className="w-full text-left px-4 py-2 text-xs text-indigo-600 hover:bg-indigo-50 font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Download Project (.zip)</span>
                  </a>
                  <div className="border-t border-slate-100 my-1" />
                  <button 
                    onClick={() => { loadDemoCase(); setShowUserDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-500 hover:text-indigo-600 hover:bg-slate-50 font-medium cursor-pointer"
                  >
                    Reset Case Data
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
