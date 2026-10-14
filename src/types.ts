export type ReportType = 'lost' | 'found';

export type ReportStatus =
  | 'searching'
  | 'potential_match'
  | 'pending_verification'
  | 'verified'
  | 'returned';

export interface ReportItem {
  id: string;
  type: ReportType;
  title: string;
  category: 'Accessories' | 'Electronics' | 'Cards & IDs' | 'Keys' | 'Bottles & Containers' | 'Books & Stationery' | 'Other';
  date: string;
  location: string;
  description: string;
  photoType: 'wallet' | 'bottle' | 'calculator' | 'id_card' | 'keys' | 'headphones' | 'generic';
  privateDetail?: string;
  status: ReportStatus;
  reporterName: string;
  reporterContact?: string;
  timeAgo: string;
  isUserReport: boolean;
  matchScore?: number;
  matchedReportId?: string;
}

export interface MatchSignal {
  label: string;
  status: 'SAME' | 'NEARBY' | 'HIGH' | 'EXACT';
  detail: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'match' | 'verified' | 'returned' | 'info';
  actionView?: string;
}

export type ViewTab =
  | 'landing'
  | 'dashboard'
  | 'search'
  | 'report-lost'
  | 'report-found'
  | 'smart-match'
  | 'verify-owner'
  | 'return-desk'
  | 'my-reports';
