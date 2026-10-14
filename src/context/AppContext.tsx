import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReportItem, AppNotification, ViewTab } from '../types';
import { INITIAL_REPORTS, INITIAL_NOTIFICATIONS } from '../data/initialData';

interface AppContextType {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  reports: ReportItem[];
  notifications: AppNotification[];
  unreadNotifsCount: number;
  markAllNotificationsRead: () => void;
  stats: {
    myReports: number;
    potentialMatches: number;
    pendingClaims: number;
    returned: number;
  };
  // Demo Case Flow State
  walletLostReport: ReportItem | undefined;
  walletFoundReport: ReportItem | undefined;
  verificationAnswer: string;
  setVerificationAnswer: (ans: string) => void;
  verificationError: string | null;
  isOwnerVerified: boolean;
  isItemReturned: boolean;
  verifyOwnership: (answerToTest?: string) => boolean;
  markAsReturned: () => void;
  loadDemoCase: () => void;
  addNewReport: (report: Partial<ReportItem>) => void;
  selectedReportForMatch: ReportItem | null;
  setSelectedReportForMatch: (rep: ReportItem | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'findback_campus_data_2026';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [reports, setReports] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [verificationAnswer, setVerificationAnswer] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isOwnerVerified, setIsOwnerVerified] = useState<boolean>(false);
  const [isItemReturned, setIsItemReturned] = useState<boolean>(false);
  const [selectedReportForMatch, setSelectedReportForMatch] = useState<ReportItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [reports]);

  const walletLostReport = reports.find(r => r.id === 'rep-lost-wallet');
  const walletFoundReport = reports.find(r => r.id === 'rep-found-wallet');

  // Sync local verification / return states with report status
  useEffect(() => {
    if (walletLostReport) {
      if (walletLostReport.status === 'verified') {
        setIsOwnerVerified(true);
        setIsItemReturned(false);
      } else if (walletLostReport.status === 'returned') {
        setIsOwnerVerified(true);
        setIsItemReturned(true);
      } else {
        setIsOwnerVerified(false);
        setIsItemReturned(false);
      }
    }
  }, [walletLostReport]);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Compute live statistics
  const stats = {
    myReports: reports.filter(r => r.isUserReport).length,
    potentialMatches: reports.filter(r => r.status === 'potential_match').length > 0 ? 1 : 0,
    pendingClaims: reports.filter(r => r.status === 'pending_verification' || r.status === 'verified').length,
    returned: 3 + (walletLostReport?.status === 'returned' ? 1 : 0)
  };

  // Ownership verification logic
  // Prompt requirement: "For the demo, accept: Blue Ganesh sticker"
  const verifyOwnership = (answerToTest?: string): boolean => {
    const candidate = (answerToTest !== undefined ? answerToTest : verificationAnswer).trim().toLowerCase();
    
    // Generous match check for demo robustness
    const isCorrect = 
      candidate.includes('blue ganesh') || 
      candidate.includes('ganesh sticker') ||
      candidate === 'blue ganesh sticker' ||
      candidate.includes('ganesh');

    if (isCorrect) {
      setVerificationError(null);
      setIsOwnerVerified(true);
      
      // Update reports status to verified
      setReports(prev => prev.map(r => {
        if (r.id === 'rep-lost-wallet' || r.id === 'rep-found-wallet') {
          return { ...r, status: 'verified' as const };
        }
        return r;
      }));

      // Add success notification
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        title: 'Ownership Verified ✓',
        message: 'Your ownership verification for Black Leather Wallet was accepted by the Recovery Desk.',
        time: 'Just now',
        read: false,
        type: 'verified',
        actionView: 'return-desk'
      };
      setNotifications(prev => [newNotif, ...prev]);
      return true;
    } else {
      setVerificationError('Incorrect answer. Only the legitimate owner knows the exact private detail. Hint: Blue Ganesh sticker');
      return false;
    }
  };

  // Mark as returned logic
  const markAsReturned = () => {
    setIsItemReturned(true);
    setReports(prev => prev.map(r => {
      if (r.id === 'rep-lost-wallet' || r.id === 'rep-found-wallet') {
        return { ...r, status: 'returned' as const };
      }
      return r;
    }));

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Item Returned & Closed',
      message: 'Black Leather Wallet recovery case closed. Handover confirmed at Library Security Desk.',
      time: 'Just now',
      read: false,
      type: 'returned',
      actionView: 'my-reports'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Reset to initial demo case state
  const loadDemoCase = () => {
    setReports(INITIAL_REPORTS);
    setVerificationAnswer('');
    setVerificationError(null);
    setIsOwnerVerified(false);
    setIsItemReturned(false);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveTab('dashboard');
  };

  const addNewReport = (newRep: Partial<ReportItem>) => {
    const isWallet = (newRep.title || '').toLowerCase().includes('wallet');
    const created: ReportItem = {
      id: `rep-custom-${Date.now()}`,
      type: newRep.type || 'lost',
      title: newRep.title || 'Untitled Item',
      category: newRep.category || 'Accessories',
      date: newRep.date || '16 Sep 2026',
      location: newRep.location || 'Campus Center',
      description: newRep.description || '',
      photoType: isWallet ? 'wallet' : 'generic',
      privateDetail: newRep.privateDetail,
      status: isWallet ? 'potential_match' : 'searching',
      reporterName: 'Karan (You)',
      timeAgo: 'Just now',
      isUserReport: true,
      matchScore: isWallet ? 87 : undefined
    };

    setReports(prev => [created, ...prev]);

    // Push notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `${created.type === 'lost' ? 'Lost' : 'Found'} Report Submitted`,
      message: `Your report for "${created.title}" is now active in the campus registry.`,
      time: 'Just now',
      read: false,
      type: 'info',
      actionView: 'my-reports'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        reports,
        notifications,
        unreadNotifsCount,
        markAllNotificationsRead,
        stats,
        walletLostReport,
        walletFoundReport,
        verificationAnswer,
        setVerificationAnswer,
        verificationError,
        isOwnerVerified,
        isItemReturned,
        verifyOwnership,
        markAsReturned,
        loadDemoCase,
        addNewReport,
        selectedReportForMatch,
        setSelectedReportForMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
