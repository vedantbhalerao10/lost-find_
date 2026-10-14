/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { SearchReportsView } from './components/SearchReportsView';
import { ReportLostView } from './components/ReportLostView';
import { ReportFoundView } from './components/ReportFoundView';
import { SmartMatchView } from './components/SmartMatchView';
import { VerifyOwnerView } from './components/VerifyOwnerView';
import { ReturnDeskView } from './components/ReturnDeskView';
import { MyReportsView } from './components/MyReportsView';
import { RotateCcw, Download } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, loadDemoCase } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Top Bar Contract Navigation */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'landing' ? (
          <LandingPage />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'search' && <SearchReportsView />}
            {activeTab === 'report-lost' && <ReportLostView />}
            {activeTab === 'report-found' && <ReportFoundView />}
            {activeTab === 'smart-match' && <SmartMatchView />}
            {activeTab === 'verify-owner' && <VerifyOwnerView />}
            {activeTab === 'return-desk' && <ReturnDeskView />}
            {activeTab === 'my-reports' && <MyReportsView />}
          </div>
        )}
      </main>

      {/* Persistent Quiet Footer for App Views */}
      {activeTab !== 'landing' && (
        <footer className="mt-auto py-6 bg-white border-t border-slate-200 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight">FINDBACK</span>
              <span>·</span>
              <span>Campus Lost &amp; Found Portal</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <a 
                href="/findback-project.zip" 
                download="findback-project.zip"
                className="text-indigo-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                title="Download complete zip to open in VS Code"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download VS Code Zip</span>
              </a>
              <span>·</span>
              <button 
                onClick={() => setActiveTab('landing')}
                className="hover:text-slate-800 cursor-pointer"
              >
                About Portal
              </button>
              <span>·</span>
              <button 
                onClick={loadDemoCase}
                className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1"
                title="Reset sample data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
