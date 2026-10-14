import { ReportItem, AppNotification } from '../types';

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-lost-wallet',
    type: 'lost',
    title: 'Black Leather Wallet',
    category: 'Accessories',
    date: '16 Sep 2026',
    location: 'Library Gate',
    description: 'Black leather wallet with multiple card slots and student bus pass.',
    photoType: 'wallet',
    privateDetail: 'Blue Ganesh sticker inside the transparent card pocket',
    status: 'potential_match',
    reporterName: 'Karan (You)',
    reporterContact: 'karan@campus.edu',
    timeAgo: '4 hours ago',
    isUserReport: true,
    matchScore: 87,
    matchedReportId: 'rep-found-wallet'
  },
  {
    id: 'rep-found-wallet',
    type: 'found',
    title: 'Black leather wallet',
    category: 'Accessories',
    date: '16 Sep 2026',
    location: 'Library',
    description: 'Black leather wallet found near the library entrance security desk.',
    photoType: 'wallet',
    status: 'potential_match',
    reporterName: 'Library Staff (Desk #2)',
    reporterContact: 'lib-desk@campus.edu',
    timeAgo: '2 hours ago',
    isUserReport: false,
    matchScore: 87,
    matchedReportId: 'rep-lost-wallet'
  },
  {
    id: 'rep-lost-bottle',
    type: 'lost',
    title: 'Blue Water Bottle',
    category: 'Bottles & Containers',
    date: '12 Sep 2026',
    location: 'Canteen',
    description: 'Matte blue stainless steel 750ml bottle with university crest sticker on the cap.',
    photoType: 'bottle',
    privateDetail: 'Dent on the bottom rim and initials KB carved subtly',
    status: 'searching',
    reporterName: 'Karan (You)',
    reporterContact: 'karan@campus.edu',
    timeAgo: '4 days ago',
    isUserReport: true
  },
  {
    id: 'rep-found-calc',
    type: 'found',
    title: 'Casio Scientific Calculator',
    category: 'Electronics',
    date: '15 Sep 2026',
    location: 'Science Hall 102',
    description: 'Casio fx-991EX ClassWiz in sliding dark grey cover with stickers.',
    photoType: 'calculator',
    status: 'searching',
    reporterName: 'Ananya S.',
    reporterContact: 'ananya.s@campus.edu',
    timeAgo: 'Yesterday',
    isUserReport: false
  },
  {
    id: 'rep-found-id',
    type: 'found',
    title: 'Campus Student ID Card',
    category: 'Cards & IDs',
    date: '14 Sep 2026',
    location: 'Admin Block',
    description: 'Undergraduate student smart card found on the ground floor foyer.',
    photoType: 'id_card',
    status: 'returned',
    reporterName: 'Security Office',
    reporterContact: 'security@campus.edu',
    timeAgo: '2 days ago',
    isUserReport: false
  },
  {
    id: 'rep-lost-keys',
    type: 'lost',
    title: 'Dorm Room 304 Keys',
    category: 'Keys',
    date: '15 Sep 2026',
    location: 'Sports Complex',
    description: 'Set of two Yale brass keys with a red braided lanyard.',
    photoType: 'keys',
    privateDetail: 'Small blue guitar pick attached to the key ring',
    status: 'searching',
    reporterName: 'Vikram Mehta',
    reporterContact: 'vikram.m@campus.edu',
    timeAgo: '1 day ago',
    isUserReport: false
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Potential Match',
    message: 'We found an 87% match for your Black Leather Wallet lost at Library Gate.',
    time: '2 hours ago',
    read: false,
    type: 'match',
    actionView: 'smart-match'
  },
  {
    id: 'notif-2',
    title: 'Verification Desk Ready',
    message: 'Library Security Desk #2 is ready for ownership verification.',
    time: '1 hour ago',
    read: false,
    type: 'info',
    actionView: 'verify-owner'
  },
  {
    id: 'notif-3',
    title: 'Report Published',
    message: 'Your report for Blue Water Bottle has been published to the campus registry.',
    time: '4 days ago',
    read: true,
    type: 'info',
    actionView: 'my-reports'
  }
];
